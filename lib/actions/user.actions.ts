"use server"

import connectToDatabase from "@/lib/db/connect";
import bcrypt from "bcryptjs";
import { User, UserModel } from "../models/user.model";
import { LoginFailure, LoginPayload, LoginSuccess, RegisterPayload, UpdateUserPayload, UserInterface } from "@/interfaces/user.interface";
import { UI_THEMES } from "@/constants/ui.options";
import mongoose, { Types } from "mongoose";
import { requireUser } from "@/lib/auth/authHelpers";
import Site from "@/lib/models/site.model";
import NpcModel from "@/lib/models/npc.model";
import SettlementModel from "@/lib/models/settlement.model";
import { serializeNpc, serializeSettlement, serializeSite } from "@/lib/util/serializers";
import { tierLimits, userTier } from "@/constants/user.options";
import Account from "../models/account.model";
import { getCampaignPermissions } from "./campaign.actions";
import { canCreate, canEdit } from "../auth/authPermissions";


// Serialize for client compatibility
function serializeUser(user: mongoose.Document<UserModel> | UserModel): UserInterface {
  const obj = 'toObject' in user ? user.toObject() : user;

  return {
    id: obj._id.toString(),
    email: obj.email,
    username: obj.username,
    avatar: obj.avatar,
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

    if (!data.idempotencyKey) {
      throw new Error("Missing idempotency key for registration");
    }

    // Check for existing user with this key
    const existingByKey = await User.findOne({ idempotencyKey: data.idempotencyKey });
    if (existingByKey) {
      // User already registered with this key — return success to prevent duplicate
      return { success: true };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Look for placeholder user by email or username
    const placeholderUser = await User.findOne({
      $or: [{ email: data.email }, { username: data.username }],
      placeholder: true,
    });

    if (placeholderUser) {
      // Convert placeholder into real user
      placeholderUser.username = data.username.toLowerCase();
      placeholderUser.email = data.email.toLowerCase();
      placeholderUser.passwordHash = hashedPassword;
      placeholderUser.placeholder = false;
      placeholderUser.idempotencyKey = data.idempotencyKey;
      placeholderUser.updatedAt = new Date();

      await placeholderUser.save();
      return { success: true };
    }

    // Check for duplicate user (non-placeholder)
    const existingUser = await User.findOne({
      $or: [{ email: data.email }, { username: data.username }],
    });

    if (existingUser) {
      return {
        success: false,
        error: "A user with that email or username already exists.",
      };
    }

    // Create new user
    await User.create({
      username: data.username.toLowerCase(),
      email: data.email.toLowerCase(),
      passwordHash: hashedPassword,
      theme: UI_THEMES[0], // default theme
      tier: userTier[0],
      createdAt: new Date(),
      updatedAt: new Date(),
      idempotencyKey: data.idempotencyKey,
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

    if (!user.passwordHash) {
      return { success: false, error: "This account does not have a password set." };
    }

    // Verify password using bcrypt
    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
        return { success: false, error: "Invalid username/email or password." };
    }

    // Return fields to the client
    return {
        success: true,
        user: serializeUser(user)
    };
}

export async function getUser() {
  const user = await requireUser(); // ensures authenticated user
  await connectToDatabase();

  const dbUser = await User.findById(user.id).lean<UserModel>();
  if (!dbUser) return { success: false, error: "Could not find user." };

  // Fetch linked Patreon account, if any
  const patreonAccount = await Account.findOne({
    userId: dbUser._id,
    provider: "patreon",
  }).lean();

  return {
    id: dbUser._id.toString(),
    username: dbUser.username,
    email: dbUser.email,
    avatar: dbUser.avatar,
    tier: dbUser.tier,
    theme: dbUser.theme,
    patreon: patreonAccount
      ? {
          tier: "Patron",
          accessToken: patreonAccount.accessToken,
          refreshToken: patreonAccount.refreshToken,
          providerAccountId: patreonAccount.providerAccountId,
        }
      : undefined,
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

export async function updateUser(
  data: UpdateUserPayload
): Promise<{ success: true; user: UserInterface } | { success: false; error?: string }> {
  try {
    const user = await requireUser(); // ensures the user is authenticated
    await connectToDatabase();

    const updateData: Partial<Pick<UserModel, "username" | "email" | "passwordHash" | "avatar">> = {};

    if (data.username) {
      // Check for duplicate username
      const existing = await User.findOne({ username: data.username.toLowerCase(), _id: { $ne: user.id } });
      if (existing) {
        return { success: false, error: "Username is already taken." };
      }
      updateData.username = data.username.toLowerCase();
    }

    if (data.email) {
      // Check for duplicate username
      const existing = await User.findOne({ email: data.email.toLowerCase(), _id: { $ne: user.id } });
      if (existing) {
        return { success: false, error: "Email address is already in use." };
      }
      updateData.email = data.email.toLowerCase();
    }

    if (data.password) {
      // Hash the new password
      updateData.passwordHash = await bcrypt.hash(data.password, 12);
    }

    if (data.avatar) {
      updateData.avatar = data.avatar;
    }

    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    ).lean<UserModel>();

    if (!updatedUser) {
      return { success: false, error: "User not found." };
    }

    const patreonAccount = await Account.findOne({
      userId: updatedUser._id,
      provider: "patreon",
    }).lean();

    return {
      success: true,
      user: {
        id: updatedUser._id.toString(),
        username: updatedUser.username,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        tier: updatedUser.tier,
        theme: updatedUser.theme,
        passwordHash: updatedUser.passwordHash,
        patreon: patreonAccount
          ? {
              tier: "Patron",
              accessToken: patreonAccount.accessToken,
              refreshToken: patreonAccount.refreshToken,
              providerAccountId: patreonAccount.providerAccountId,
            }
          : undefined,
      },
    };
  } catch (err) {
    console.error("Error updating user:", err);
    return { success: false, error: "Failed to update user." };
  }
}

export async function refreshUserSession(userId: string) {
  await connectToDatabase();

  const user = await User.findById(userId).lean();
  if (!user) return null;

  const patreonAccount = await Account.findOne({
    userId: user._id,
    provider: "patreon",
  }).lean();

  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    tier: user.tier,
    theme: user.theme,
    avatar: user.avatar,
    patreon: patreonAccount
      ? {
          tier: "Patron",
          accessToken: patreonAccount.accessToken,
          refreshToken: patreonAccount.refreshToken,
          providerAccountId: patreonAccount.providerAccountId,
        }
      : undefined,
  };
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

// For checking user's favorites
export async function getFavorites() {
  const user = await requireUser();
  await connectToDatabase();

  const [npcs, settlements, sites] = await Promise.all([
    NpcModel.find({ userId: user.id, favorite: true }).lean(),
    SettlementModel.find({ userId: user.id, favorite: true }).lean(),
    Site.find({ userId: user.id, favorite: true }).lean(),
  ]);

  const tagged = [
    ...npcs.map((n) => ({ ...serializeNpc(n), type: "npc" })),
    ...settlements.map((s) => ({ ...serializeSettlement(s), type: "settlement" })),
    ...sites.map((s) => ({ ...serializeSite(s), type: "site" })),
  ];

  // Sort by updatedAt descending
  return tagged
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
}


// For checking to see if user can create more content based on their tier
export async function canCreateContent(userId: string, contentType: "settlement" | "site" | "npc", campaignId?: string | undefined): Promise<boolean> {
  await connectToDatabase();
  const user = await User.findById(userId).lean();
  
  if (!user) return false;

  const limits = tierLimits.find((t) => t.tier === user.tier);
  if (!limits) return false; // should not happen

  const hasUnlimitedTier =
    limits.settlementLimit === -1 &&
    limits.siteLimit === -1 &&
    limits.npcLimit === -1;

  if(campaignId){
    const campaignPermissions = await getCampaignPermissions(campaignId ?? "");
    console.log("permissions: ", campaignPermissions); 

    if( canCreate(campaignPermissions ?? undefined) ){
      return true;
    }

    if ( canEdit(userId, { userId }, campaignPermissions ?? undefined) ){
      return true;
    }
    
    return false;
  }

  if (hasUnlimitedTier) {
    return true;
  } else {
    let currentCount = 0;
    let limit = 0;
    switch (contentType) {
      case "settlement":
        currentCount = await SettlementModel.countDocuments({ userId: userId });
        limit = limits.settlementLimit;
        break;
      case "site":
        currentCount = await Site.countDocuments({ userId: userId });
        limit = limits.siteLimit;
        break;
      case "npc":
        currentCount = await NpcModel.countDocuments({ userId: userId });
        limit = limits.npcLimit;
        break;
      default:
        return false;
    }
    return currentCount <= limit;
  }
}

// For linking Patreon accounts to native/RealmFoundry accounts
export async function linkPatreonAccount(userId: string, patreonId: string, accessToken: string, refreshToken: string) {
  await connectToDatabase();

  const existing = await Account.findOne({ provider: "patreon", providerAccountId: patreonId });
  if (existing) {
    throw new Error("Patreon account already linked to another user.");
  }

  await Account.create({
    userId: new mongoose.Types.ObjectId(userId),
    provider: "patreon",
    providerAccountId: patreonId,
    accessToken,
    refreshToken,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

// For unlinking patreon accounts
export async function unlinkPatreonAccount(
  userId: string,
  patreonAccountId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await connectToDatabase();

    const result = await Account.findOneAndDelete({
      userId: new Types.ObjectId(userId),
      provider: "patreon",
      providerAccountId: patreonAccountId,
    });

    if (!result) {
      return { success: false, error: "No linked Patreon account found for this user." };
    }

    return { success: true };
  } catch (err) {
    console.error("Error unlinking Patreon account:", err);
    return { success: false, error: "Failed to unlink Patreon account." };
  }
}

export async function resolveUserId(identifier: string) {
  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }]
  }).select("_id");
  
  return user?._id.toString() ?? null;
}