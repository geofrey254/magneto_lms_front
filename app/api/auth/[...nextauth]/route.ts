import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface User {
    accessToken?: string;
  }
}

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
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.access_token = account.access_token;
        token.idqToken = account.idToken;
        token.provider = account.provider;

        if (user) {
          token.accessToken = user.accessToken; // Store access token
          token.email = user.email; // Store email
          token.name = user.name;
          token.image = user.image;
        }
      }

      return token;
    },

    async signIn({ user, account }) {
      const isAllowedToSignIn = true;

      if (!isAllowedToSignIn) {
        console.warn("Sign-in not allowed for this user");
        return "/signin"; // Redirect or indicate disallowed sign-in
      }

      if (account?.provider) {
        const { access_token: accessToken, id_token: idToken } = account;

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_AUTH}/magneto/google/login/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                access_token: accessToken,
                id_token: idToken,
              }),
            }
          );

          if (!response.ok) {
            console.error(
              "Failed to sign in:",
              response.status,
              response.statusText
            );
            return false;
          }

          const data = await response.json();
          console.log("Backend response data:", data);

          if (data?.access) {
            // Attach the access token to the user object for further use
            user.accessToken = data.access;
            return true;
          }

          console.error("Access token missing in response");
          return false;
        } catch (error) {
          console.error("Error during sign-in process:", error);
          return false;
        }
      }

      console.warn("Account provider is missing");
      return false;
    },
  },
});

export { authHandler as GET, authHandler as POST };
