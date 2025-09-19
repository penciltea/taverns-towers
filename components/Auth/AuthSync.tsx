"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/store/authStore";
import { capitalizeFirstLetter } from "@/lib/util/stringFormats";
import { userTier } from "@/constants/user.options";

export default function AuthSync() {
  const { data: session, status } = useSession();
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const setHasHydrated = useAuthStore((state) => state.setHasHydrated);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated" && session?.user) {
      const username = session.user.username || session.user.name || "Unknown";
      const tierString =
        session.user.tier || session.user.patreon?.tier || userTier[0];

      const tier = capitalizeFirstLetter(tierString);

      setUser({
        id: session.user.id,
        username,
        email: session.user.email,
        tier,
        theme: session.user.theme || "light",
        patreon: session.user.patreon
      });
    } else if (status === "unauthenticated" && session === null) {
      clearUser();
    }

    setHasHydrated();
  }, [status, session, setUser, clearUser, setHasHydrated]);

  return null;
}
