import { isStrongPassword } from "validator";
import { z } from "zod";

export const SignUpSchema = z
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
