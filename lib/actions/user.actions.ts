"use server"

import connectToDatabase from "@/lib/db/connect";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { LoginFailure, LoginPayload, LoginSuccess, RegisterPayload, UserInterface } from "@/interfaces/user.interface";
import { UI_THEMES } from "@/constants/ui.options";

// Serialize for client compatibility
function serializeUser(user: any): UserInterface {
  const obj = user.toObject?.() ?? user;

  return {
    id: obj._id.toString(),
    email: obj.email,
    username: obj.username,
    tier: obj.tier,
    theme: obj.theme
  };
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
      username: data.username.toLowerCase(),
      email: data.email.toLowerCase(),
      password: hashedPassword,
      theme: UI_THEMES[0] // default theme
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


type LoginResult = LoginSuccess | LoginFailure;

export async function loginUser(data: LoginPayload): Promise<LoginResult>{
    await connectToDatabase();

    const lookup = data.credential.trim().toLowerCase();

    const user = await User.findOne({
        $or: [
        { username: lookup },
        { email: lookup }
        ]
    });

    if (!user) {
        return { success: false, error: "Invalid username/email or password." };
    }

    // Verify password using bcrypt
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
        return { success: false, error: "Invalid username/email or password." };
    }

    // Serialize user before returning
    const serializedUser = serializeUser(user);

    // Return fields to the cleint
    return {
        success: true,
        user: {
            id: serializedUser.id,
            email: serializedUser.email,
            username: serializedUser.username,
            tier: serializedUser.tier,
            theme: serializedUser.theme
        },
    };
}

export async function updateUserTheme(userId: string, theme: "light" | "dark"): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    await connectToDatabase();

    const user = await User.findByIdAndUpdate(
      userId,
      { theme },
      { new: true } // return updated doc
    );

    if (!user) {
      return { success: false, error: "User not found." };
    }

    return { success: true };
  } catch (err) {
    console.error("Error updating theme:", err);
    return { success: false, error: "Could not update theme preference." };
  }
}