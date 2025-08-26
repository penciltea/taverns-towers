"use client"

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/store/authStore";
import { capitalizeFirstLetter } from "@/lib/util/stringFormats";

export default function AuthSync() {
  const { data: session, status } = useSession();
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const setHasHydrated = useAuthStore((state) => state.setHasHydrated);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated" && session?.user) {
      setUser({
        id: session.user.id,
        username: session.user.username,
        email: session.user.email,
        tier: capitalizeFirstLetter(session.user.tier),
        theme: session.user.theme
      });
    } else if (status === "unauthenticated" && session === null) {
      clearUser();
    }

    setHasHydrated();
  }, [status, session]);

  return null;
}
