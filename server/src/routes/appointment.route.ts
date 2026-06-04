import { Router, Request, Response } from 'express';
import { Appointment } from '../models/appointment.model.js';
import { Service } from '../models/service.model.js';
import { authenticate, requireRole } from '../middleware/auth.middleware.js';
import { validate, BookAppointmentSchema, UpdateAppointmentSchema } from '../middleware/validate.js';
import { UserRole, AppointmentStatus } from '../../../shared/src/types.js';
import mongoose from 'mongoose';

export const appointmentRouter = Router();
appointmentRouter.use(authenticate);

// POST /api/appointments — book new appointment (patient only)
appointmentRouter.post('/', validate(BookAppointmentSchema), async (req: Request, res: Response) => {
  try {
    const { serviceId, preferredStart, patientNotes } = req.body;
    const patientId = req.user!.userId;

    const service = await Service.findById(serviceId);
    if (!service) { res.status(404).json({ success: false, error: 'Service not found' }); return; }

    const startAt = new Date(preferredStart);
    const endAt = new Date(startAt.getTime() + service.durationMin * 60 * 1000);

    const appt = await Appointment.create({
      patientId: new mongoose.Types.ObjectId(patientId),
      serviceId: new mongoose.Types.ObjectId(serviceId),
      startAt,
      endAt,
      patientNotes,
      status: AppointmentStatus.REQUESTED,
    });

    // Populate service info in response
    await appt.populate('serviceId', 'title category price durationMin');

    res.status(201).json({
      success: true,
      data: {
        appointmentId: appt._id,
        status: appt.status,
        startAt: appt.startAt,
        endAt: appt.endAt,
        service: appt.serviceId,
      },
    });
  } catch (err) {
    console.error('[Appt:book]', err);
    res.status(500).json({ success: false, error: 'Booking failed' });
  }
});

// GET /api/appointments — list appointments for patient, or all if admin
appointmentRouter.get(
  '/',
  requireRole(UserRole.ADMIN, UserRole.PATIENT, UserRole.CLINICIAN),
  async (req: Request, res: Response) => {
    try {
      const { role, userId } = req.user!;
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.min(50, parseInt(req.query.limit as string) || 10);
      const skip = (page - 1) * limit;

      let filter: Record<string, unknown> = {};

      if (role === UserRole.PATIENT) {
        filter.patientId = new mongoose.Types.ObjectId(userId);
      } else if (role === UserRole.CLINICIAN) {
        filter.providerId = new mongoose.Types.ObjectId(userId); // assumes providerId exists
      } else if (role === UserRole.ADMIN) {
        // admin sees all → no filter
      } else {
        return res.status(403).json({ success: false, error: 'Access denied' });
      }

      if (req.query.status) filter.status = req.query.status;

      // Only ADMIN can filter by arbitrary patientId
      if (req.query.patientId) {
        if (role !== UserRole.ADMIN) {
          return res.status(403).json({ success: false, error: 'Only admin can filter by patientId' });
        }
        filter.patientId = new mongoose.Types.ObjectId(req.query.patientId as string);
      }

      const [appointments, total] = await Promise.all([
        Appointment.find(filter)
          .sort({ startAt: -1 })
          .skip(skip)
          .limit(limit)
          .populate('serviceId', 'title category price')
          .populate('providerId', 'name credentials'),
        Appointment.countDocuments(filter),
      ]);

      res.json({
        success: true,
        data: {
          items: appointments,
          total,
          page,
          limit,
          hasMore: skip + appointments.length < total,
        },
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Failed to fetch appointments' });
    }
  }
);

// PATCH /api/appointments/:id — cancel, reschedule, or complete an appointment
appointmentRouter.patch('/:id', validate(UpdateAppointmentSchema), async (req: Request, res: Response) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) { res.status(404).json({ success: false, error: 'Not found' }); return; }

    const { role, userId } = req.user!;
    const isOwner = appt.patientId.toString() === userId;
    const isClinician = role === UserRole.CLINICIAN;
    const isAdmin = role === UserRole.ADMIN;

    if (!isOwner && !isClinician && !isAdmin) {
      res.status(403).json({ success: false, error: 'Access denied' }); return;
    }

    // Patients can only cancel
    if (isOwner && !isClinician && !isAdmin) {
      if (req.body.status && req.body.status !== 'cancelled') {
        res.status(403).json({ success: false, error: 'Patients may only cancel' }); return;
      }
    }

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('serviceId', 'title category price');

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Update failed' });
  }
});

// GET /api/appointments/:id — get appointment details (patient can only access their own)
appointmentRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const appt = await Appointment.findById(req.params.id)
      .populate('serviceId', 'title category price durationMin')
      .populate('providerId', 'name credentials avatarUrl');

    if (!appt) {
      return res.status(404).json({ success: false, error: 'Not found' });
    }

    const { role, userId } = req.user!;
    const isOwner = appt.patientId.toString() === userId;
    const isClinician = appt.providerId?.toString() === userId;
    const isAdmin = role === UserRole.ADMIN;

    // 🔒 Strict access control
    if (!isOwner && !isClinician && !isAdmin) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    res.json({ success: true, data: appt });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch appointment' });
  }
});
