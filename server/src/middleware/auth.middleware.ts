import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../services/jwt.service.js';
import { UserRole, JWTPayload } from '@shared/types.js';

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

// auth guard

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (err: unknown) {
    const message =
      err instanceof Error && err.name === 'TokenExpiredError'
        ? 'Token expired'
        : 'Invalid token';
    res.status(401).json({ success: false, error: message });
  }
}

// role guard

export function requireRole(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: `Access denied. Required role(s): ${roles.join(', ')}`,
      });
      return;
    }

    next();
  };
}

// optional auth

export function optionalAuth(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    try {
      req.user = verifyAccessToken(authHeader.split(' ')[1]);
    } catch {
      // silently ignore invalid/expired tokens for optional auth
    }
  }
  next();
}
