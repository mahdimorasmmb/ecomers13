import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/backend/models/user";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ user, token, trigger }: any) {
      if (user) {
        token.user = user;
      }

      if (trigger === "update") {
        console.log(trigger);
        const updateUser = await User.findById(token.user._id);

        console.log({ updateUser });

        token.user = updateUser;
      }

      return token;
    },

    async session({ session, token, trigger }) {
      const user = token.user as User;

      session.user = user;
      session.user.password = "";
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.API_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          cache: "no-cache",
        });

        if (res.status === 400) {
          return null;
        }

        const user = await res.json();

        return user.userWithPass._doc;
      },
      credentials: {
        // Specify the shape of the credentials object
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      name: "Credentials",
      type: "credentials",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
