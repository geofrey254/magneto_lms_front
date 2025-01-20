// next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Extend session with accessToken
    idToken?: string;
    refreshToken?: string;
    error?: "RefreshAccessTokenError" | "InvalidTokenError" | string;

    // Extend session
    user: {
      id: string;
      email: string;
      name: string;
      accessToken: string;
      refreshToken: string;
      image: string;
      isSubscribed?: boolean;
    };
    name?: string;
    email?: string;
  }

  interface JWT {
    access_token?: string;
    error?: "RefreshAccessTokenError" | string;
    isSubscribed?: boolean;
  }
}

import { User } from "next-auth";
export interface AuthenticatedUser extends User {
  accessToken?: string;
  refreshToken?: string;
}
