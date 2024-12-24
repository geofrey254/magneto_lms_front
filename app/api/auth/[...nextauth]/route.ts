import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.access_token as string;
      session.idToken = token.idToken as string;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
        token.idqToken = account.idToken;
      }

      return token;
    },
  },
});

export { authHandler as GET, authHandler as POST };
