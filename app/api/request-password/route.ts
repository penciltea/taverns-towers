import { NextResponse } from "next/server";
import crypto from "crypto";
import connectToDatabase from "@/lib/db/connect";
import { User } from "@/lib/models/user.model";
import { sendPasswordResetEmail } from "@/lib/util/email";

export async function POST(req: Request) {
  await connectToDatabase();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ ok: true });
  }

  // Generate token + expiry
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 15); // 15 min

  user.passwordResetToken = token;
  user.passwordResetExpires = expires;
  await user.save();

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  await sendPasswordResetEmail(user.email!, resetUrl);

  return NextResponse.json({ ok: true });
}