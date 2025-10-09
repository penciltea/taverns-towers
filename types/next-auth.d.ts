import NextAuth from "next-auth";
import { UI_THEME } from "@/types/ui";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string | null; // Patreon users may not have email
      username?: string; // optional for Patreon
      name?: string;     // Patreon full name
      tier?: string;     // optional if not set yet
      theme?: UI_THEME;  // optional
      provider?: string;
      patreon?: {
        tier?: string;
        accessToken?: string;
        refreshToken?: string;
        providerAccountId?: string;
      };
    };
  }

  interface User {
    id: string;
    email: string | null; // Patreon users may not have email
    username?: string;
    name?: string;
    tier?: string;
    theme?: string;
    provider?: string;
    patreon?: {
      tier?: string;
      accessToken?: string;
      refreshToken?: string;
      providerAccountId?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string | null; // Patreon users may not have an email
    username?: string;
    name?: string;
    tier?: string;
    theme?: string;
    provider?: string;

    /** Expiry timestamp in ms */
    expires?: number;

    /** Error message if token refresh failed */
    error?: string;

    patreon?: {
      tier?: string;
      accessToken?: string;
      refreshToken?: string;
      providerAccountId?: string;
    };
  }
}