"use server";

import crypto from "crypto";
import { connectToDatabase } from "@/lib/db/connect";
import { User } from "@/lib/models/user.model";
import { sendVerificationEmail } from "@/lib/util/emails/sendVerification";

/**
 * Generates a verification token and emails it via Resend.
 * This is called after registration, or can be reused for "resend verification".
 */
export async function generateAndSendVerificationEmail(userId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    if(!user.email){
        return { success: false, error: "Email not found" };
    }

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
  } catch (err) {
    console.error("Error generating verification email:", err);
    return { success: false, error: "Failed to generate verification email" };
  }
}