"use client"

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/store/authStore";

export default function AuthSync() {
  const { data: session, status } = useSession();
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated" && session?.user) {
      setUser({
        id: session.user.id,
        username: session.user.username,
        email: session.user.email,
        tier: session.user.tier,
      });
    } else if (status === "unauthenticated" && session === null) {
      clearUser();
    }
  }, [status, session]);

  return null;
}
