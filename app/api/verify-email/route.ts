import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/connect";
import { User } from "@/lib/models/user.model";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return NextResponse.json({ success: false, error: "Missing token." }, { status: 400 });
    }

    // Find user by verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid or expired token." }, { status: 400 });
    }

    // Mark user as verified and remove token
    user.emailVerified = true;
    user.verificationToken = undefined;
    user.updatedAt = new Date();
    await user.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email verification error:", err);
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}