import { Router } from 'express';
import { getUser, updateUser, listUsers } from '../controllers/user.controller.js';
import { authenticate, requireRole } from '../middleware/auth.middleware.js';
import { validate, UpdateProfileSchema } from '../middleware/validate.js';
import { UserRole } from '../../../shared/src/types.js';

export const userRouter = Router();

// All user routes require authentication
userRouter.use(authenticate);

/** GET /api/users — admin only, paginated list */
userRouter.get('/', requireRole(UserRole.ADMIN), listUsers);

/** GET /api/users/:id — own profile or admin */
userRouter.get('/:id', getUser);

/** PATCH /api/users/:id — own profile or admin */
userRouter.patch('/:id', validate(UpdateProfileSchema), updateUser);
