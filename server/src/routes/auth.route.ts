import { Router } from 'express';
import { register, login, refresh, logout, logoutAll } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { authenticate } from '../middleware/auth.middleware.js';
import {
  RegisterSchema,
  LoginSchema,
  RefreshSchema,
} from '../middleware/validate.js';

export const authRouter = Router();

/**
 * POST /api/auth/register
 * Body: { name, email, password, phone? }
 * Returns: { token, refreshToken, user }
 */
authRouter.post('/register', validate(RegisterSchema), register);

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Returns: { token, refreshToken, user }
 */
authRouter.post('/login', validate(LoginSchema), login);

/**
 * POST /api/auth/refresh
 * Body: { refreshToken }
 * Returns: { token, refreshToken }
 */
authRouter.post('/refresh', validate(RefreshSchema), refresh);

/**
 * POST /api/auth/logout   [protected]
 * Body: { refreshToken }
 * Revokes the specific refresh token (current session)
 */
authRouter.post('/logout', authenticate, logout);

/**
 * POST /api/auth/logout-all   [protected]
 * Revokes all refresh tokens for the user (all sessions)
 */
authRouter.post('/logout-all', authenticate, logoutAll);

/**
 * GET /api/auth/me   [protected]
 * Returns the current authenticated user from token payload
 */
authRouter.get('/me', authenticate, (req, res) => {
  res.json({ success: true, data: req.user });
});
