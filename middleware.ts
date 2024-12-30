import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Middleware to protect routes
const SECRET = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: SECRET });
  // Check if the user has a valid access token in the cookies
  const cookie = req.cookies.get("jwt-access-token");
  // If no token is found, redirect to the login page
  if (!cookie && !token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // If token exists, allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/topics/:slug",
    "/subscription",
    "/subscription/success",
  ],
};
