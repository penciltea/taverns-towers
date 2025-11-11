import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(2, "Username is too short"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  avatar: z
    .any()
    .refine(
      (val) =>
        val === undefined ||
        typeof val === "string" ||
        (typeof FileList !== "undefined" && val instanceof FileList),
      {
        message: "Avatar must be a URL or FileList",
      }
    )
    .optional(),
  idempotencyKey: z.string().optional()
});

export type UserSchema = z.infer<typeof userSchema>;


// Update Profile schema
export const userUpdateSchema = z.object({
  username: z.string().min(2, "Username is too short"),
  email: z.string().email("Invalid email address"),
  password: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
      .optional()
  ),
  avatar: z.any().optional(),
});

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;


// Login schema

export const loginSchema = z.object({
  credential: z.string().min(1, "Please enter your username or email"),
  password: z.string().min(1, "Please enter your password"),
});

export type LoginSchema = z.infer<typeof loginSchema>;


// Verification schema

export const resendVerificationSchema = z.object({
  credential: z.string().min(1, "Please enter your username or email")
});

export type ResendVerificationSchema = z.infer<typeof resendVerificationSchema>;

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