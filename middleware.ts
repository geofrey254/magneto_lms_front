import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware to protect routes
export function middleware(req: NextRequest) {
  // Check if the user has a valid access token in the cookies
  const cookie = req.cookies.get("jwt-access-token");
  // If no token is found, redirect to the login page
  if (!cookie) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // If token exists, allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/topics/:slug"],
};
