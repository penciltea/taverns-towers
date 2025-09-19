import NextAuth from "next-auth";
import { UI_THEME } from "@/types/ui";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username?: string; // optional for Patreon
      name?: string;     // Patreon full name
      tier?: string;     // optional if not set yet
      theme?: UI_THEME;  // optional
      patreon?: {
        tier?: string;
        accessToken?: string;
      };
    };
  }

  interface User {
    id: string;
    email: string;
    username?: string;
    name?: string;
    tier?: string;
    theme?: string;
    patreon?: {
      tier?: string;
      accessToken?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    username?: string;
    name?: string;
    tier?: string;
    theme?: string;
    patreon?: {
      tier?: string;
      accessToken?: string;
    };
  }
}
