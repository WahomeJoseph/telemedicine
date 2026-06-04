import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string()
        .email('Please enter a valid email address')
        .min(5, 'Email is too short')
        .max(255, 'Email is too long'),
    password: z.string()
        .min(1, 'Password is required'),
    rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name is too long')
        .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, apostrophes, and hyphens'),
    email: z.string()
        .email('Please enter a valid email address')
        .min(5, 'Email is too short')
        .max(255, 'Email is too long'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
        .regex(/[a-z]/, 'Password must include at least one lowercase letter')
        .regex(/\d/, 'Password must include at least one number')
        .regex(/[^a-zA-Z\d]/, 'Password must include at least one special character'),
    confirmPassword: z.string(),
    acceptedTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
