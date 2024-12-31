// next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Extend session with accessToken
    idToken?: string; // Extend session
    user: {
      id: string;
      email: string;
      name: string;
      accessToken: string;
    };
  }

  interface JWT {
    access_token?: string; // Extend JWT with access_token
  }
}

import { User } from "next-auth";
export interface AuthenticatedUser extends User {
  accessToken?: string;
  refreshToken?: string;
}
