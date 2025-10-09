'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { UserInterface } from "@/interfaces/user.interface";
import { UI_THEMES } from "@/constants/ui.options";
import { userTier } from "@/constants/user.options";

export async function auth() {
  return getServerSession(authOptions);
}

export async function requireUser(): Promise<UserInterface> {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const { id, username, name, email, tier, theme, patreon } = session.user;

  if (!id || !email) throw new Error("Incomplete user session data");

  // Use Patreon name as fallback for username
  const resolvedUsername = username || name || "Traveler";

  // Resolve tier from native tier or Patreon tier
  const resolvedTier = tier ?? patreon?.tier ?? userTier[0];

  return {
    id,
    username: resolvedUsername,
    email,
    tier: resolvedTier,
    theme: theme ?? UI_THEMES[0],
    patreon
  };
}
