"use server"

import connectToDatabase from "@/lib/db/connect";
import bcrypt from "bcryptjs";
import { User, UserModel } from "../models/user.model";
import { LoginFailure, LoginPayload, LoginSuccess, RegisterPayload, UserInterface } from "@/interfaces/user.interface";
import { UI_THEMES } from "@/constants/ui.options";
import mongoose from "mongoose";
import { requireUser } from "@/lib/auth/authHelpers";
import Site from "@/lib/models/site.model";
import NpcModel from "@/lib/models/npc.model";
import SettlementModel from "@/lib/models/settlement.model";
import { serializeNpc, serializeSettlement, serializeSite } from "../util/serializers";

// Serialize for client compatibility
function serializeUser(user: mongoose.Document<UserModel> | UserModel): UserInterface {
  const obj = 'toObject' in user ? user.toObject() : user;

  return {
    id: obj._id.toString(),
    email: obj.email,
    username: obj.username,
    tier: obj.tier,
    theme: obj.theme,
    passwordHash: obj.passwordHash
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


// For use on the account dashboard "recent activity" section
export async function getRecentActivity(limit = 5) {
  const user = await requireUser();
  await connectToDatabase();

  const [npcs, settlements, sites] = await Promise.all([
    NpcModel.find({ userId: user.id }).sort({ updatedAt: -1 }).limit(limit).lean(),
    SettlementModel.find({ userId: user.id }).sort({ updatedAt: -1 }).limit(limit).lean(),
    Site.find({ userId: user.id }).sort({ updatedAt: -1 }).limit(limit).lean(),
  ]);

  const tagged = [
    ...npcs.map((n) => ({ ...serializeNpc(n), type: "npc" })),
    ...settlements.map((s) => ({ ...serializeSettlement(s), type: "settlement" })),
    ...sites.map((s) => ({ ...serializeSite(s), type: "site" })),
  ];

  // Sort by updatedAt descending
  return tagged
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit);
}