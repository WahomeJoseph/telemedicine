import { Router, Request, Response } from 'express';
import { Service } from '../models/service.model.js';
import { authenticate, requireRole } from '../middleware/auth.middleware.js';
import { UserRole } from '../../../shared/src/types.js';

export const serviceRouter = Router();

// GET /api/services — fetch all active services, sorted by category and title
serviceRouter.get('/', async (_req: Request, res: Response) => {
  const services = await Service.find({ isActive: true }).sort({ category: 1, title: 1 });
  res.json({ success: true, data: services });
});

// GET /api/services/:id — fetch service by ID (active or not)
serviceRouter.get('/:id', async (req: Request, res: Response) => {
  const service = await Service.findById(req.params.id);
  if (!service) { res.status(404).json({ success: false, error: 'Not found' }); return; }
  res.json({ success: true, data: service });
});

// POST /api/services — create new service (admin only)
serviceRouter.post('/', authenticate, requireRole(UserRole.ADMIN), async (req: Request, res: Response) => {
  const service = await Service.create(req.body);
  res.status(201).json({ success: true, data: service });
});

// PATCH /api/services/:id — update service by ID (admin only)
serviceRouter.patch('/:id', authenticate, requireRole(UserRole.ADMIN), async (req: Request, res: Response) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!service) { res.status(404).json({ success: false, error: 'Not found' }); return; }
  res.json({ success: true, data: service });
});
