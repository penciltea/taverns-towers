import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import PatreonProvider from "next-auth/providers/patreon";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/db/mongoClient";
import { loginUser } from "@/lib/actions/user.actions";
import { userTier } from "@/constants/user.options";
import { toTitleCase } from "@/lib/util/stringFormats";
import { PatreonIdentityResponse, PatreonMember, PatreonTier } from "@/interfaces/patreon.interface";
import { Adapter } from "next-auth/adapters";


const adapter: Adapter = MongoDBAdapter(clientPromise!) as Adapter;

export const authOptions: AuthOptions = {
  adapter,

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

        // Typecast to NextAuth User type
        return {
          id: result.user.id,
          email: result.user.email ?? null,  // <--- use null instead of undefined
          name: result.user.username,        // optional 'name' field
          tier: result.user.tier,
          theme: result.user.theme,
          provider: "credentials",
        } as unknown as User;
      }
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

  session: { strategy: "jwt" },
  pages: { signIn: "/login" },

  callbacks: {
    async signIn({ account }) {
      if (!account) return false;

      // Extract linking userId from the callback URL
      const callbackUrl = (account.callbackUrl ?? "") as string;
      const url = new URL(callbackUrl || "http://localhost");
      const linkingUserId = url.searchParams.get("userId");

      if (account.provider === "patreon" && linkingUserId) {
        const nativeUser = await adapter.getUser!(linkingUserId);
        if (!nativeUser) return false;

        await adapter.linkAccount({
          userId: nativeUser.id,
          type: "oauth",
          provider: account.provider,
          providerAccountId: account.providerAccountId!,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          token_type: account.token_type,
          scope: account.scope,
          expires_at: account.expires_at,
        });

        return true;
      }

      // Otherwise, allow normal Patreon login
      return true;
    },


    // JWT callback: add user info and handle Patreon tokens
    async jwt({ token, user, account }) {
      // When user first logs in
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.tier = user.tier;
        token.theme = user.theme;
        token.provider = user.provider;
      }

      // Patreon OAuth handling
      if (account?.provider === "patreon" && user) {
        const accessToken = account.access_token;

        try {
          const res = await fetch(
            "https://www.patreon.com/api/oauth2/v2/identity" +
              "?include=memberships,memberships.currently_entitled_tiers" +
              "&fields[member]=patron_status,pledge_relationship_start,last_charge_date,last_charge_status" +
              "&fields[tier]=title,amount_cents",
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );

          const data: PatreonIdentityResponse = await res.json();

          const membership = data.included?.find(
            (i): i is PatreonMember =>
              i.type === "member" && i.attributes?.patron_status === "active_patron"
          );

          let tier = toTitleCase(userTier[0]); // default
          if (membership) {
            const tierIds = membership.relationships?.currently_entitled_tiers?.data ?? [];
            if (tierIds.length > 0) {
              const tierObj = data.included?.find(
                (i): i is PatreonTier => i.type === "tier" && i.id === tierIds[0].id
              );
              if (tierObj?.attributes?.title) tier = tierObj.attributes.title;
            }
          }

          // Attach Patreon info to JWT (server-side only)
          token.patreon = {
            accessToken,
            refreshToken: account.refresh_token,
            tier,
            providerAccountId: account.providerAccountId,
          };
        } catch (err) {
          console.error("Error fetching Patreon tier:", err);
          token.patreon = {
            accessToken,
            refreshToken: account.refresh_token,
            tier: toTitleCase(userTier[0]),
          };
        }
      }

      // Refresh Patreon token if expired
      if (token.patreon?.refreshToken && token.expires && Date.now() > token.expires) {
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

          token.patreon.accessToken = refreshedTokens.access_token;
          token.patreon.refreshToken = refreshedTokens.refresh_token ?? token.patreon.refreshToken;
          token.expires = Date.now() + refreshedTokens.expires_in * 1000;
        } catch (error) {
          console.error("Error refreshing Patreon token:", error);
          token.error = "RefreshAccessTokenError";
        }
      }

      return token;
    },
    

    // Session callback: expose only safe fields to client
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username ?? session.user.username;
        session.user.tier = token.tier ?? session.user.tier;
        session.user.theme = token.theme ?? session.user.theme;
        session.user.provider = token.provider ?? session.user.provider;

        // Expose Patreon tier only (no tokens)
        if (token.patreon) {
          session.user.patreon = {
            tier: token.patreon.tier,
            providerAccountId: token.patreon.providerAccountId,
          };
        }

        // Optional email (some OAuth users may not have one)
        session.user.email = token.email ?? session.user.email;
      }

      return session;
    },
  },
};
