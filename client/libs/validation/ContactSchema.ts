import { z } from 'zod';

export const contactFormSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters')
        .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, apostrophes, and hyphens'),

    email: z.string()
        .email('Please enter a valid email address')
        .min(5, 'Email is too short')
        .max(255, 'Email is too long'),

    phone: z.string()
        .optional()
        .refine(
            (val) => !val || /^\+?[\d\s-]{10,}$/.test(val),
            'Please enter a valid phone number'
        ),

    department: z.string()
        .min(1, 'Please select a department'),

    message: z.string()
        .min(10, 'Message must be at least 10 characters')
        .max(1000, 'Message must be less than 1000 characters'),

    preferredContact: z.enum(['email', 'phone']),
});

export type ContactFormValidation = z.infer<typeof contactFormSchema>;
