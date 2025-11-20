"use server";

import crypto from "crypto";
import { connectToDatabase } from "@/lib/db/connect";
import { User } from "@/lib/models/user.model";
import { sendVerificationEmail } from "@/lib/util/emails/sendVerification";
import { ActionResult } from "@/interfaces/server-action.interface";
import { safeServerAction } from "./safeServerAction.actions";
import { AppError } from "../errors/app-error";

/**
 * Generates a verification token and emails it via Resend.
 * This is called after registration, or can be reused for "resend verification".
 */
export async function generateAndSendVerificationEmail(userId: string): Promise<ActionResult<{
  success: boolean;
  error?: string;
}>> {
  return safeServerAction(async () => {
    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) throw new AppError("Cannot find user", 400);

    if(!user.email) throw new AppError("Cannot find email", 400);

    // Generate a secure token and expiry
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

    user.verificationToken = token;
    user.verificationTokenExpires = expiry;
    user.emailVerified = false;
    await user.save();

    // Build verification URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://realmfoundry.app";
    const verifyUrl = `${baseUrl}/verify-email?token=${token}`;

    // Send the verification email
    await sendVerificationEmail(user.email, verifyUrl);

    return { success: true };
  })
}