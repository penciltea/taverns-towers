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

    if (status === "unauthenticated" || !session?.user) {
      clearUser();
      setHasHydrated();
      return;
    }

    async function fetchLatestUser() {
      try {
        const { getUser } = await import("@/lib/actions/user.actions");
        const dbUser = await getUser();
        const sessionUser = session!.user;
        if (!sessionUser) return;

        // Merge DB and session data
        const mergedUser = {
          id: dbUser?.id || sessionUser.id,
          username: dbUser?.username || sessionUser.username || "Traveler",
          email: dbUser?.email || sessionUser.email || undefined,
          avatar: dbUser?.avatar || "",
          tier: capitalizeFirstLetter(
            dbUser?.tier || sessionUser.tier || sessionUser.patreon?.tier || userTier[0]
          ),
          theme: dbUser?.theme || sessionUser.theme || "dark",
          patreon: sessionUser.patreon || undefined,
          emailVerified: dbUser?.emailVerified || sessionUser.emailVerified || false
        };

        setUser(mergedUser);
      } catch (err) {
        console.error("Failed to fetch latest user:", err);
        clearUser();
      } finally {
        setHasHydrated();
      }
    }

    fetchLatestUser();
  }, [status, session, setUser, clearUser, setHasHydrated]);

  return null;
}
