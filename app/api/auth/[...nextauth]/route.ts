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
    async signIn({ user, account }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        if (account?.provider) {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_AUTH}/magneto/save_user/`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ user }),
              }
            );

            if (!res.ok) {
              const errorText = await res.text(); // Handle non-JSON responses
              console.error("Failed to save user:", errorText);
              return false;
            }
          } catch (error) {
            console.error("Error during user save:", error);
            return false;
          }
        }
        return true;
      } else {
        console.warn("Sign-in not allowed for this user");
        return "/signin";
      }
    },
  },
});

export { authHandler as GET, authHandler as POST };
