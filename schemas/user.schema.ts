import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(2, "Username is too short"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
});

export type UserSchema = z.infer<typeof userSchema>;


// Login schema

export const loginSchema = z.object({
  credential: z.string().min(1, "Please enter your username or email"),
  password: z.string().min(1, "Please enter your password"),
});

export type LoginSchema = z.infer<typeof loginSchema>;


// Password schemas
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});


export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Invalid or missing reset token"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
});


export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;