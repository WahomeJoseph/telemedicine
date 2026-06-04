import { Router, Request, Response } from 'express';
import { authenticate, requireRole } from '../middleware/auth.middleware.js';
import { User } from '../models/user.model.js';
import { Appointment } from '../models/appointment.model.js';
import { UserRole, SubscriptionStatus, AppointmentStatus } from '../../../shared/src/types.js';

export const adminRouter = Router();
adminRouter.use(authenticate, requireRole(UserRole.ADMIN));

// GET /api/admin/metrics — get key business metrics for dashboard
adminRouter.get('/metrics', async (_req: Request, res: Response) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      premiumUsers,
      dauUsers,
      mauUsers,
      bookingsToday,
      bookingsThisMonth,
      completedAppts,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ 'subscription.status': SubscriptionStatus.ACTIVE }),
      User.countDocuments({ lastLoginAt: { $gte: startOfToday } }),
      User.countDocuments({ lastLoginAt: { $gte: thirtyDaysAgo } }),
      Appointment.countDocuments({ createdAt: { $gte: startOfToday } }),
      Appointment.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Appointment.countDocuments({ status: AppointmentStatus.COMPLETED }),
    ]);

    // Revenue estimates (TODO: pull from Stripe in production)
    const MRR_PER_PREMIUM = 49;
    const mrr = premiumUsers * MRR_PER_PREMIUM;

    // Conversion rate: premiumUsers / totalUsers
    const conversionRate = totalUsers > 0
      ? parseFloat(((premiumUsers / totalUsers) * 100).toFixed(2))
      : 0;

    const arpu = totalUsers > 0
      ? parseFloat((mrr / totalUsers).toFixed(2))
      : 0;

    res.json({
      success: true,
      data: {
        dau: dauUsers,
        mau: mauUsers,
        bookingsToday,
        bookingsThisMonth,
        conversionRate,
        mrr,
        arr: mrr * 12,
        arpu,
        totalUsers,
        premiumUsers,
        completedConsults: completedAppts,
        // avgBookingLeadTimeHours, clinicianUtilizationPct, avgConsultRating
        // TODO: aggregate from appointment data in production
        avgBookingLeadTimeHours: 4.2,
        clinicianUtilizationPct: 68,
        avgConsultRating: 4.7,
      },
    });
  } catch (err) {
    console.error('[Admin:metrics]', err);
    res.status(500).json({ success: false, error: 'Failed to compute metrics' });
  }
});
