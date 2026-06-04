import { z } from 'zod';

// Auth and user management

export const RegisterSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain uppercase, lowercase and a number'
    ),
  phone: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(1),
});

export const RefreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
});

export const ResetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z
    .string()
    .min(8)
    .max(128)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
});

// User profile

export const UpdateProfileSchema = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  phone: z.string().optional(),
  dob: z.string().optional(),
  address: z.string().max(300).optional(),
});

// Appointments

export const BookAppointmentSchema = z.object({
  serviceId: z.string().length(24, 'Invalid service ID'),
  preferredStart: z.string().datetime(),
  patientNotes: z.string().max(2000).optional(),
});

export const UpdateAppointmentSchema = z.object({
  status: z.enum(['cancelled', 'confirmed', 'completed']).optional(),
  clinicianNotes: z.string().max(5000).optional(),
  videoUrl: z.string().url().optional(),
});

// Chat

export const StartChatSchema = z.object({
  initialSymptomText: z.string().min(1).max(1000).trim(),
});

export const ChatMessageSchema = z.object({
  text: z.string().min(1).max(2000).trim(),
});

// Middleware validation

import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: result.error.flatten().fieldErrors,
      });
      return;
    }
    req.body = result.data;
    next();
  };
}
