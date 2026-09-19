import { z } from 'zod';

export const step1Schema = z.object({
    accountType: z.enum(['personal', 'business'], { message: 'Please select an account type' }),
});

// Phone validation with country-specific regex
const phoneValidation = z.object({
    countryCode: z.string(),
    phone: z.string()
}).refine((data) => {
    // US: +1 with 10 digits
    if (data.countryCode === '+1') {
        return /^\d{10}$/.test(data.phone);
    }
    // India: +91 with 10 digits
    if (data.countryCode === '+91') {
        return /^\d{10}$/.test(data.phone);
    }
    return false;
}, {
    message: 'Please enter a valid 10-digit mobile number',
    path: ['phone']
});

export const step2Schema = phoneValidation;

export const step3Schema = z.object({
    otp: z.string().length(4, 'Please enter a 4-digit code'),
});

export const step4Schema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
});

export const step5Schema = z.object({
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one symbol'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
});

export type FormData = {
    accountType: 'personal' | 'business' | null;
    countryCode: string;
    phone: string;
    otp: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
};
