'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { UserInterface } from "@/interfaces/user.interface";
import { UI_THEMES } from "@/constants/ui.options";

export async function auth() {
  return getServerSession(authOptions);
}

export async function requireUser(): Promise<UserInterface> {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const { id, username, email, tier, theme } = session.user;

  if (!id || !username || !email) {
    throw new Error("Incomplete user session data");
  }

  return {
    id,
    username,
    email,
    tier: tier ?? "traveler", // fallback just in case
    theme: theme ?? UI_THEMES[0] // fallback just in case
  };
}