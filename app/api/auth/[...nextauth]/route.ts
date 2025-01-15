import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface User {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
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
  pages: {
    signIn: "/signin",
    signOut: "/",
  },
  callbacks: {
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

          if (data?.access && data?.refresh) {
            const decodedAccessToken = JSON.parse(
              Buffer.from(data.access.split(".")[1], "base64").toString("utf-8")
            );
            // Attach the access token to the user object for further use
            user.accessToken = data.access;
            user.refreshToken = data.refresh;
            user.accessTokenExpires = decodedAccessToken.exp * 1000;

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

    async jwt({ token, account, user }) {
      if (account) {
        // Set Google tokens from the account object (if available)
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token || user?.refreshToken;
        token.idqToken = account.idToken;
        token.provider = account.provider;
        token.accessTokenExpires = account.expires_at
          ? account.expires_at * 1000
          : undefined;
      }

      if (user && user.accessToken) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.accessTokenExpires = user.accessTokenExpires;
      }

      const tokenExpiresAt = token.accessTokenExpires as number;

      if (Date.now() < (tokenExpiresAt as number)) return token;

      // Access token has expired, refresh it
      try {
        console.log("Sending refresh token:", token.refreshToken);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: token.refreshToken }),
          }
        );
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to refresh token:", {
            status: response.status,
            statusText: response.statusText,
            error: errorText,
          });
          throw new Error("Failed to refresh token");
        }
        const data = await response.json();
        console.log("Session DATA:==", data);

        return {
          ...token,
          accessToken: data.access,
          accessTokenExpires:
            JSON.parse(
              Buffer.from(data.access.split(".")[1], "base64").toString("utf-8")
            ).exp * 1000,
          refreshToken: data.refresh || token.refreshToken,
        };
      } catch (error) {
        console.error("Error refreshing token:", error);
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string; // Expose the token to the client
      session.refreshToken = token.refreshToken as string;
      session.error = token.error as string | undefined;

      return session;
    },
  },
});

export { authHandler as GET, authHandler as POST };
