import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/db/mongoClient";
import { loginUser } from "@/lib/actions/user.actions";
import PatreonProvider from "next-auth/providers/patreon";

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
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.tier = user.tier;
        token.theme = user.theme;
      }

      if (account && account.provider === "patreon") {
        token.patreon = {
          ...(token.patreon ?? {}),
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
        };
        token.expires = account.expires_at ? account.expires_at * 1000 : undefined;
      }

      // Refresh Patreon access token if expired
      if (token.expires && Date.now() > token.expires && token.patreon?.refreshToken) {
        try {
          const url = "https://www.patreon.com/api/oauth2/token";
          const params = new URLSearchParams();
          params.append("grant_type", "refresh_token");
          params.append("refresh_token", token.patreon.refreshToken);
          params.append("client_id", process.env.PATREON_CLIENT_ID!);
          params.append("client_secret", process.env.PATREON_CLIENT_SECRET!);

          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params,
          });

          const refreshedTokens = await response.json();

          token.patreon = {
            ...(token.patreon ?? {}),
            accessToken: refreshedTokens.access_token,
            refreshToken: refreshedTokens.refresh_token ?? token.patreon.refreshToken,
          };

          token.expires = Date.now() + refreshedTokens.expires_in * 1000;
        } catch (error) {
          console.error("Error refreshing Patreon access token:", error);
          token.error = "RefreshAccessTokenError";
        }
      }

      return token;
    },

    // Session callback: expose JWT fields safely in session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username ?? session.user.username;
        session.user.tier = token.tier ?? session.user.tier;
        session.user.theme = token.theme ?? session.user.theme;

        if (token.patreon) {
          session.user.patreon = {
            ...(session.user.patreon ?? {}),
            accessToken: token.patreon.accessToken,
            refreshToken: token.patreon.refreshToken,
          };
        }
      }

      return session;
    },
  },
};
