import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Middleware for handling authentication and CSRF token
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();

  // Retrieve tokens and CSRF token from cookies
  const accessToken = cookieStore.get("jwt-access-token");
  const refreshToken = cookieStore.get("jwt-refresh-token");
  const csrfToken = cookieStore.get("csrftoken");

  console.log("CSRF Token:", csrfToken?.value);

  // If access token exists, user is authenticated
  if (accessToken) {
    return NextResponse.next();
  }

  // If refresh token exists, attempt to refresh access token
  if (refreshToken) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refreshToken.value }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const res = NextResponse.next();

        // Set updated tokens in cookies
        res.cookies.set("jwt-access-token", data.access_token, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60, // 1 hour
        });

        res.cookies.set("jwt-refresh-token", data.refresh_token, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        return res;
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
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
