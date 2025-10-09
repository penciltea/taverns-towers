import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/db/connect";
import { User } from "@/lib/models/user.model";

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const { token, password } = (await req.json()) as {
      token: string;
      password: string;
    };

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and new password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    user.passwordHash = await bcrypt.hash(password, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("Reset password error:", err);
    const message = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
