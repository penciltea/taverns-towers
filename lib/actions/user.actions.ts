"use server"

import connectToDatabase from "@/lib/db/connect";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export async function registerUser(data: RegisterPayload): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    await connectToDatabase();

    // Check for duplicate user
    const existingUser = await User.findOne({
      $or: [{ email: data.email }, { username: data.username }],
    });

    if (existingUser) {
      return {
        success: false,
        error: "A user with that email or username already exists.",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Create user
    await User.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });

    return { success: true };
  } catch (err) {
    console.error("Registration error:", err);
    return {
      success: false,
      error: "An unexpected error occurred during registration.",
    };
  }
}

export async function loginUser(data: any){
    await connectToDatabase();
}