import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";

// Middleware for handling authentication and CSRF token
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Middleware Token:", token);

  if (token?.error === "RefreshAccessTokenError") {
    console.log("Refresh failed, signing out...");
    cookieStore.delete("next-auth.session-token");
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // If no valid tokens are present, return a 401 Unauthorized response
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

// CSRF Token Getter
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const csrfToken = cookieStore.get("csrftoken");
  const session_id = cookieStore.get("sessionid");

  if (csrfToken) {
    return NextResponse.json({ csrfToken: csrfToken.value, session_id });
  }

  return NextResponse.json({ error: "CSRF token not found" }, { status: 404 });
}
