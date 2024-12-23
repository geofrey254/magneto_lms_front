// middleware.ts or _middleware.ts in the root or /pages directory (Next.js)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware to protect routes
export function middleware(req: NextRequest) {
  // Check if the user has a valid access token in the cookies
  const token = req.cookies.get("access_token");

  // If no token is found, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // If token exists, allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/topics/:slug"],
};
