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