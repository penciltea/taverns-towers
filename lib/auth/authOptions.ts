import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/db/mongoClient";
import { loginUser } from "@/lib/actions/user.actions";

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

        // Call your existing loginUser server action
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
    })

    // ToDo: Add Patreon
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.tier = user.tier;
        token.theme = user.theme;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.tier = token.tier as string;
        session.user.theme = token.theme as string;
      }
      return session;
    },
  }
};
