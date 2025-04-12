import { isStrongPassword } from 'validator';
import { z } from 'zod';

export const SuperuserAddUserSchema = z
  .object({
    name: z.string().min(1, {
      message: 'Name is required',
    }),
    email: z.string().email({
      message: 'Invalid email',
    }),
    password: z.string().refine(isStrongPassword, {
      message:
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character',
    }),
    confirmPassword: z.string().min(1, {
      message: 'Confirm password is required',
    }),
    role: z.string().min(1, {
      message: 'Role is required',
    }),
    isEmailVerified: z.boolean({ message: 'Email verification is required' }),
    emailVerificationCode: z.string().min(1, {
      message: 'Email verification code is required',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
