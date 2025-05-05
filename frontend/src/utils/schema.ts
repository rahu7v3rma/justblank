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
    isEmailVerified: z.boolean({ message: 'Email verification is required' }),
    sendVerificationEmail: z.boolean({
      message: 'Send verification email is required',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const SuperuserEditUserSchema = z
  .object({
    _id: z.string().min(1, {
      message: 'User ID is required',
    }),
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    isEmailVerified: z.boolean().optional(),
    role: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (!value) return true;
          return ['admin', 'seller', 'customer'].includes(value);
        },
        {
          message: 'Invalid role',
        }
      ),
    sendVerificationEmail: z
      .boolean({
        message: 'Send verification email is required',
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.password || !data.confirmPassword) return true;
      return data.password === data.confirmPassword;
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  );
