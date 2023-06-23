import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ user, token }: any) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    

    session({ session, token }) {
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
});



export { handler as GET, handler as POST };
