import NextAuth from "next-auth";
import { UI_THEME } from "@/types/ui";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    email: string | null; // Patreon users may not have email
    username?: string;
    name?: string;
    tier?: string;
    theme?: string;
    provider?: string;
    emailVerified?: boolean;
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
    emailVerified?: boolean;
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