import { Request, Response } from 'express';
import { User } from '../models/user.model.js';
import { verifyRefreshToken, findMatchingRefreshToken } from '../services/jwt.service.js';
import { UserRole } from '../../../shared/src/types.js';
import { issueTokenPair } from '../services/jwt.service.js';

const MAX_REFRESH_TOKENS = 5;

// Register new user
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password, phone } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(409).json({ success: false, error: 'Email already in use' });
      return;
    }

    const user = new User({
      name,
      email,
      passwordHash: password,  
      role: UserRole.PATIENT,
      phone,
    });

    await user.save();

    const { accessToken, refreshToken, refreshTokenHashed } =
      await issueTokenPair({
        _id: user._id.toString(),
        email: user.email,
        role: user.role,
      });

    // Store hashed refresh token
    await User.findByIdAndUpdate(user._id, {
      $push: { refreshTokens: { $each: [refreshTokenHashed], $slice: -MAX_REFRESH_TOKENS } },
      lastLoginAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      data: {
        auth:{
          token: accessToken,
          refreshToken,
          type: "Bearer",
        },
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          subscription: user.subscription,
        },
      },
    });
  } catch (err) {
    console.error('[Auth:register]', err);
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
}

// Login existing user

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    const valid = await user.comparePassword(password);
    if (!valid) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    const { accessToken, refreshToken, refreshTokenHashed } =
      await issueTokenPair({
        _id: user._id.toString(),
        email: user.email,
        role: user.role,
      });

    // Rotate refresh tokens (keep last N)
    await User.findByIdAndUpdate(user._id, {
      $push: { refreshTokens: { $each: [refreshTokenHashed], $slice: -MAX_REFRESH_TOKENS } },
      lastLoginAt: new Date(),
    });

    res.json({
      success: true,
      message: 'Login successful!',
      data: {
        auth: {
          token: accessToken,
          refreshToken,
          type: "Bearer",
        },
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          subscription: user.subscription,
        },
      },
    });
  } catch (err) {
    console.error('[Auth:login]', err);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
}

// Refresh tokens

export async function refresh(req: Request, res: Response): Promise<void> {
  try {
    const { refreshToken: rawToken } = req.body;

    let payload: { userId: string };
    try {
      payload = verifyRefreshToken(rawToken);
    } catch {
      res.status(401).json({ success: false, error: 'Invalid or expired refresh token' });
      return;
    }

    // Load user with their stored hashed tokens
    const user = await User.findById(payload.userId).select('+refreshTokens');
    if (!user) {
      res.status(401).json({ success: false, error: 'User not found' });
      return;
    }

    const matchedHash = await findMatchingRefreshToken(rawToken, user.refreshTokens);
    if (!matchedHash) {
      // Token not in DB — possible token reuse attack; revoke all sessions
      await User.findByIdAndUpdate(user._id, { $set: { refreshTokens: [] } });
      res.status(401).json({ success: false, error: 'Refresh token revoked' });
      return;
    }

    // Issue new pair and rotate: remove old hash, add new one
    const { accessToken, refreshToken: newRaw, refreshTokenHashed: newHash } =
      await issueTokenPair({
        _id: user._id.toString(),
        email: user.email,
        role: user.role,
      });

    const updatedTokens = user.refreshTokens
      .filter((t) => t !== matchedHash)
      .concat(newHash)
      .slice(-MAX_REFRESH_TOKENS);

    await User.findByIdAndUpdate(user._id, {
      $set: { refreshTokens: updatedTokens },
    });

    res.json({
      success: true,
      data: { token: accessToken, refreshToken: newRaw },
    });
  } catch (err) {
    console.error('[Auth:refresh]', err);
    res.status(500).json({ success: false, error: 'Token refresh failed' });
  }
}

// Logout current session

export async function logout(req: Request, res: Response): Promise<void> {
  try {
    const { refreshToken: rawToken } = req.body;
    const userId = req.user?.userId;

    if (userId && rawToken) {
      const user = await User.findById(userId).select('+refreshTokens');
      if (user) {
        const matchedHash = await findMatchingRefreshToken(rawToken, user.refreshTokens);
        if (matchedHash) {
          await User.findByIdAndUpdate(userId, {
            $pull: { refreshTokens: matchedHash },
          });
        }
      }
    }

    res.json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    console.error('[Auth:logout]', err);
    res.status(500).json({ success: false, error: 'Logout failed' });
  }
}

// Logout all sessions

export async function logoutAll(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    await User.findByIdAndUpdate(userId, { $set: { refreshTokens: [] } });
    res.json({ success: true, message: 'All sessions terminated' });
  } catch (err) {
    console.error('[Auth:logoutAll]', err);
    res.status(500).json({ success: false, error: 'Failed to terminate sessions' });
  }
}
