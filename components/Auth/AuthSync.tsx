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
        const dbUser = await getUser(); // fetch from your DB
        const sessionUser = session?.user;
        if (!sessionUser) return;

        if (!dbUser) {
          // fallback to session data if DB fetch fails
          setUser({
            id: sessionUser.id,
            username: sessionUser.username || "Traveler",
            email: sessionUser.email,
            tier: capitalizeFirstLetter(sessionUser.tier || sessionUser.patreon?.tier || userTier[0]),
            theme: sessionUser.theme || "dark",
            patreon: sessionUser.patreon,
          });
          return;
        }

        // merge DB data with session data, preserving Patreon info
        const username = dbUser.username || sessionUser.username || "Traveler";
        const avatar = dbUser.avatar ||  "";
        const email = dbUser.email || sessionUser.email;
        const tierString = dbUser.tier || sessionUser.tier || sessionUser.patreon?.tier || userTier[0];

        setUser({
          id: dbUser.id,
          username,
          email,
          avatar,
          tier: capitalizeFirstLetter(tierString),
          theme: dbUser.theme || sessionUser.theme || "dark",
          patreon: sessionUser.patreon,
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