import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Middleware Token:", token);

  if (token?.error === "RefreshAccessTokenError") {
    console.log("Refresh failed, signing out...");

    // Clear session cookies
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.delete("next-auth.session-token");
    // response.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });

    return response;
  }

  console.log("Token found, continuing request...");
  return NextResponse.next();
}

export const config = {
  matcher: ["/billing", "/subscription/success"],
};
