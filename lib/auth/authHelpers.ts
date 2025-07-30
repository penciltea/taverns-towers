'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { UserInterface } from "@/interfaces/user.interface";

export async function auth() {
  return getServerSession(authOptions);
}

export async function requireUser(): Promise<UserInterface> {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const { id, username, email, tier } = session.user;

  if (!id || !username || !email) {
    throw new Error("Incomplete user session data");
  }

  return {
    id,
    username,
    email,
    tier: tier ?? "free", // fallback just in case
  };
}