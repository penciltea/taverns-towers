import NextAuth from "next-auth";
import { UI_THEME } from "@/types/ui";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      tier: string;
      theme: UI_THEME;
    };
  }

  interface User {
    id: string;
    email: string;
    username: string;
    tier: string;
    theme: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    username: string;
    tier: string;
    theme: string;
  }
}