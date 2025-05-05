import { ObjectId } from "mongoose";
import { isStrongPassword } from "validator";
import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string({ message: "Name is required" }).min(1, {
      message: "Name is required",
    }),
    email: z.string({ message: "Email is required" }).email({
      message: "Invalid email",
    }),
    password: z
      .string({ message: "Password is required" })
      .refine(isStrongPassword, {
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
      }),
    confirmPassword: z.string({ message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string({ message: "Email is required" }).email({
    message: "Invalid email",
  }),
  password: z.string({ message: "Password is required" }).min(1, {
    message: "Password is required",
  }),
});

export const GenerateKeywordsRequestSchema = z.object({
  keyword: z.string({ message: "Keyword is required" }).min(1, {
    message: "Keyword is required",
  }),
  countryCriteriaId: z.string({ message: "Criteria ID is required" }).min(1, {
    message: "Criteria ID is required",
  }),
});

export const VerifyEmailSchema = z.object({
  email: z.string({ message: "Email is required" }).email({
    message: "Invalid email",
  }),
  verificationCode: z
    .string({ message: "Verification code is required" })
    .min(1, {
      message: "Verification code is required",
    }),
});

export const GetUsersSchema = z.object({
  role: z.string({ message: "Role is required" }).min(1, {
    message: "Role is required",
  }),
});

export const SuperuserUserResponseSchema = z.object({
  user: z.object({
    _id: z.custom<ObjectId>(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
    isEmailVerified: z.boolean(),
  }),
});

export const SuperuserUsersResponseSchema = z.object({
  users: z.array(
    z.object({
      _id: z.custom<ObjectId>(),
      name: z.string(),
      email: z.string(),
      role: z.string(),
      isEmailVerified: z.boolean(),
    })
  ),
});

export const SuperuserCreateUserSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    email: z.string().email({
      message: "Invalid email",
    }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
    confirmPassword: z.string({ message: "Confirm password is required" }),
    isEmailVerified: z.boolean({ message: "Email verified is required" }),
    role: z
      .string({ message: "Role is required" })
      .min(1, {
        message: "Role is required",
      })
      .refine((value) => ["admin", "seller", "customer"].includes(value), {
        message: "Invalid role",
      }),
    sendVerificationEmail: z.boolean({
      message: "Send verification email is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const SuperuserEditUserSchema = z
  .object({
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
          return ["admin", "seller", "customer"].includes(value);
        },
        {
          message: "Invalid role",
        }
      ),
    sendVerificationEmail: z
      .boolean({
        message: "Send verification email is required",
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.password || !data.confirmPassword) return true;
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const SuperuserEditUserParamsSchema = z.object({
  _id: z.string().min(1, {
    message: "User ID is required",
  }),
});

export const EmptyResponseSchema = z.object({});