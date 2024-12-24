// next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Extend session with accessToken
    idToken?: string; // Extend session
  }

  interface JWT {
    access_token?: string; // Extend JWT with access_token
  }
}
