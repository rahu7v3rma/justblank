"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.SignUpSchema = void 0;
const validator_1 = require("validator");
const zod_1 = require("zod");
exports.SignUpSchema = zod_1.z
    .object({
    name: zod_1.z.string({ message: "Name is required" }).min(1, {
        message: "Name is required",
    }),
    email: zod_1.z.string({ message: "Email is required" }).email({
        message: "Invalid email",
    }),
    password: zod_1.z
        .string({ message: "Password is required" })
        .refine(validator_1.isStrongPassword, {
        message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
    }),
    confirmPassword: zod_1.z.string({ message: "Confirm password is required" }),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string({ message: "Email is required" }).email({
        message: "Invalid email",
    }),
    password: zod_1.z.string({ message: "Password is required" }).min(1, {
        message: "Password is required",
    }),
});
