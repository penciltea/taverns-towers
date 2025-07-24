import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      tier: string;
    };
  }

  interface User {
    id: string;
    email: string;
    username: string;
    tier: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    username: string;
    tier: string;
  }
}