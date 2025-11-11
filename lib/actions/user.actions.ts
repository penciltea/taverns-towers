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
import { canCreate } from "../auth/authPermissions";
import { generateAndSendVerificationEmail } from "./verification.actions";


/**
 * Serializes a Mongoose user document for client compatibility.
 * Converts _id to string and selects only public fields.
 * @param user Mongoose User document or raw UserModel
 * @returns UserInterface object suitable for sending to the client
 */

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


/**
 * Registers a new user or converts a placeholder user into a real user.
 * Sends a verification email after successful creation/conversion.
 * Handles idempotency key, duplicates, and placeholder conversion.
 * @param data RegisterPayload containing username, email, password, and idempotencyKey
 * @returns success boolean and optional error message
 */

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

      // Send verification email to converted user
      await generateAndSendVerificationEmail(placeholderUser._id.toString());

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
    const newUser = await User.create({
      username: data.username.toLowerCase(),
      email: data.email.toLowerCase(),
      passwordHash: hashedPassword,
      theme: UI_THEMES[0], // default theme
      tier: userTier[0],
      createdAt: new Date(),
      updatedAt: new Date(),
      idempotencyKey: data.idempotencyKey,
    });

    await generateAndSendVerificationEmail(newUser._id.toString());

    return { success: true };
  } catch (err) {
    console.error("Registration error:", err);
    return {
      success: false,
      error: "An unexpected error occurred during registration.",
    };
  }
}

/**
 * Logs in a user by checking username/email and password.
 * Uses bcrypt for password comparison.
 * @param data LoginPayload containing credential (email or username) and password
 * @returns LoginSuccess with serialized user or LoginFailure with error message
 */

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

/**
 * Retrieves the currently authenticated user along with linked Patreon account (if any).
 * @returns user info including Patreon details or an error object
 */

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


/**
 * Updates a user's theme preference (light or dark).
 * @param userId ID of the user to update
 * @param theme "light" or "dark"
 * @returns success boolean and optional error message
 */

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


/**
 * Updates a user's account details such as username, email, password, and avatar.
 * Checks for duplicates and hashes password if provided.
 * @param data UpdateUserPayload containing optional username, email, password, and avatar
 * @returns success boolean and updated user data or error message
 */

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



/**
 * Refreshes a user's session data.
 * Useful after updating user info to ensure client sees latest data.
 * @param userId ID of the user
 * @returns serialized user object including Patreon account info, or null if not found
 */

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



/**
 * Fetches recent activity for the authenticated user.
 * Aggregates NPCs, Settlements, and Sites, sorts by updatedAt descending.
 * @param limit Maximum number of items to return (default 5)
 * @returns array of recent activity objects with type tags
 */

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





/**
 * Fetches all favorite NPCs, Settlements, and Sites for the authenticated user.
 * @returns array of favorite items, sorted by updatedAt descending
 */
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




/**
 * Checks if a user can create more content of a given type, based on their tier or campaign permissions.
 * @param userId ID of the user
 * @param contentType "settlement" | "site" | "npc"
 * @param campaignId Optional campaign ID to check campaign-specific permissions
 * @returns boolean indicating whether the user can create additional content
 */
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



/**
 * Links a Patreon account to a RealmFoundry user account.
 * Throws an error if the Patreon account is already linked elsewhere.
 * @param userId ID of the user
 * @param patreonId Patreon account ID
 * @param accessToken Patreon access token
 * @param refreshToken Patreon refresh token
 */

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


/**
 * Unlinks a Patreon account from a RealmFoundry user account.
 * @param userId ID of the user
 * @param patreonAccountId Patreon provider account ID
 * @returns success boolean and optional error message
 */

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


/**
 * Resolves a user ID from an email or username.
 * @param identifier email or username
 * @returns string user ID or null if not found
 */

export async function resolveUserId(identifier: string) {
  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }]
  }).select("_id");
  
  return user?._id.toString() ?? null;
}