import { Request, Response } from 'express';
import { User } from '../models/user.model.js';
import { UserRole } from '../../../shared/src/types.js';

// Fetch a user by ID (admin can fetch any user, patients can only fetch themselves)

export async function getUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const requesterId = req.user!.userId;
    const requesterRole = req.user!.role;

    // Patients can only view their own profile
    if (requesterRole === UserRole.PATIENT && id !== requesterId) {
      res.status(403).json({ success: false, error: 'Access denied' });
      return;
    }

    const user = await User.findById(id).select('-__v');
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    res.json({ success: true, data: user });
  } catch (err) {
    console.error('[User:getUser]', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve user' });
  }
}

// Update user profile (admin can update any user, patients can only update themselves)
export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const requesterId = req.user!.userId;
    const requesterRole = req.user!.role;

    if (requesterRole === UserRole.PATIENT && id !== requesterId) {
      res.status(403).json({ success: false, error: 'Access denied' });
      return;
    }

    const allowedFields = ['name', 'phone', 'dob', 'address'];
    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    const updated = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!updated) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error('[User:updateUser]', err);
    res.status(500).json({ success: false, error: 'Failed to update user' });
  }
}

// Fetch all users (admin only, with pagination and optional role filter)

export async function listUsers(req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, parseInt(req.query.limit as string) || 20);
    const skip = (page - 1) * limit;
    const role = req.query.role as UserRole | undefined;

    const filter: Record<string, unknown> = {};
    if (role && Object.values(UserRole).includes(role)) filter.role = role;

    const [users, total] = await Promise.all([
      User.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }).select('-__v'),
      User.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        items: users,
        total,
        page,
        limit,
        hasMore: skip + users.length < total,
      },
    });
  } catch (err) {
    console.error('[User:listUsers]', err);
    res.status(500).json({ success: false, error: 'Failed to list users' });
  }
}
