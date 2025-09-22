import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/db/mongoClient";
import { loginUser } from "@/lib/actions/user.actions";
import PatreonProvider from "next-auth/providers/patreon";
import { userTier } from "@/constants/user.options";
import { toTitleCase } from "../util/stringFormats";
import { PatreonIdentityResponse, PatreonMember, PatreonTier } from "@/interfaces/patreon.interface";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise!, {
    collections: {
      Users: "user" // use the "user" collection in the DB instead of defaulted "users"
    }
  }),

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

      if (account?.provider === "patreon") {
        const accessToken = account.access_token;

        try {
          const res = await fetch(
            "https://www.patreon.com/api/oauth2/v2/identity" +
              "?include=memberships,memberships.currently_entitled_tiers" +
              "&fields[member]=patron_status,pledge_relationship_start,last_charge_date,last_charge_status" +
              "&fields[tier]=title,amount_cents",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );

          const data: PatreonIdentityResponse  = await res.json();
          // console.dir(data, { depth: null });

          // Find membership for this campaign
          const membership = data.included?.find(
            (i): i is PatreonMember =>
              i.type === "member" && i.attributes?.patron_status === "active_patron"
          );

          let tier = toTitleCase(userTier[0]); // default for non-paying members

          if (membership) {
            const tierIds = membership.relationships?.currently_entitled_tiers?.data || [];
            if (tierIds.length > 0) {
              const tierId = tierIds[0].id;
              const tierObj = data.included?.find(
                (i): i is PatreonTier => i.type === "tier" && i.id === tierId
              );

              if (tierObj?.attributes?.title) {
                tier = tierObj.attributes.title;
              }
            }
          }

          token.patreon = {
            ...(token.patreon ?? {}),
            accessToken,
            refreshToken: account.refresh_token,
            tier,
          };
        } catch (err) {
          console.error("Error fetching Patreon tier:", err);
          token.patreon = {
            ...(token.patreon ?? {}),
            accessToken,
            refreshToken: account.refresh_token,
            tier: toTitleCase(userTier[0]),
          };
        }
      }

      // Refresh Patreon token if expired
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
            tier: token.patreon.tier,
            accessToken: token.patreon.accessToken,
            refreshToken: token.patreon.refreshToken,
          };
        }
      }

      return session;
    },
  },
};
