"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/store/authStore";
import { capitalizeFirstLetter } from "@/lib/util/stringFormats";
import { userTier } from "@/constants/user.options";
import { getUser } from "@/lib/actions/user.actions";

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
        const latestUser = await getUser();
        if (!latestUser) {
          clearUser();
          return;
        }

        const username = latestUser.username || "Traveler";
        const avatar = latestUser.avatar || "";
        const tierString = latestUser.tier || latestUser.patreon?.tier || userTier[0];
        const tier = capitalizeFirstLetter(tierString);

        setUser({
          id: latestUser.id,
          username,
          email: latestUser.email,
          avatar,
          tier,
          theme: latestUser.theme || "dark",
          patreon: latestUser.patreon,
        });
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
