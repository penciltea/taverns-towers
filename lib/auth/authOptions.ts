import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/db/mongoClient";
import { loginUser } from "@/lib/actions/user.actions";
import PatreonProvider from "next-auth/providers/patreon";
import { JWT } from "next-auth/jwt";

interface MyJWT extends JWT {
  id: string;
  username?: string;
  tier?: string;
  theme?: string;
  accessToken?: string;
  refreshToken?: string;
  expires?: number;
  error?: string;
}


export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise!),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        credential: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.credential || !credentials?.password) return null;

        const result = await loginUser({
          credential: credentials.credential,
          password: credentials.password,
        });

        if (!result.success || !result.user) return null;

        return {
          id: result.user.id,
          email: result.user.email,
          username: result.user.username,
          tier: result.user.tier,
          theme: result.user.theme,
        };
      },
    }),

    PatreonProvider({
      clientId: process.env.PATREON_CLIENT_ID!,
      clientSecret: process.env.PATREON_CLIENT_SECRET!,
      authorization: {
        params: {
          response_type: "code",
          scope: "identity identity[email] identity.memberships",
          grant_type: "authorization_code",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    // JWT callback: handle credentials + Patreon tokens + refresh logic
    async jwt({ token, user, account }) {
      const t = token as MyJWT;

      if (user) {
        t.id = user.id;
        t.username = user.username;
        t.tier = user.tier;
        t.theme = user.theme;
      }

      if (account && account.provider === "patreon") {
        t.accessToken = account.access_token;
        t.refreshToken = account.refresh_token;
        t.expires = account.expires_at ? account.expires_at * 1000 : undefined;
      }

      // Refresh Patreon access token if expired
      if (t.expires && Date.now() > t.expires && t.refreshToken) {
        try {
          const url = "https://www.patreon.com/api/oauth2/token";
          const params = new URLSearchParams();
          params.append("grant_type", "refresh_token");
          params.append("refresh_token", t.refreshToken);
          params.append("client_id", process.env.PATREON_CLIENT_ID!);
          params.append("client_secret", process.env.PATREON_CLIENT_SECRET!);

          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params,
          });

          const refreshedTokens = await response.json();

          t.accessToken = refreshedTokens.access_token;
          t.refreshToken = refreshedTokens.refresh_token ?? t.refreshToken;
          t.expires = Date.now() + refreshedTokens.expires_in * 1000;
        } catch (error) {
          console.error("Error refreshing Patreon access token:", error);
          t.error = "RefreshAccessTokenError";
        }
      }

      return t;
    },

    // Session callback: expose JWT fields safely in session
    async session({ session, token }) {
      if (session.user) {
        const t = token as MyJWT;

        session.user.id = t.id;
        session.user.username = t.username ?? session.user.username;
        session.user.tier = t.tier ?? session.user.tier;
        session.user.theme = t.theme ?? session.user.theme;

        if (t.accessToken || t.refreshToken) {
          session.user.patreon = session.user.patreon ?? {};
          if (t.accessToken) session.user.patreon.accessToken = t.accessToken;
          if (t.refreshToken) session.user.patreon.refreshToken = t.refreshToken;
        }
      }

      return session;
    },
  },
};