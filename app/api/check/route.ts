import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";

const SECRET = process.env.NEXTAUTH_SECRET;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: SECRET });
  const cookieStore = await cookies();
  console.log("Cookies:", token?.access_token);

  const access_token =
    token?.access_token || cookieStore.get("jwt-access-token");

  const refresh_token = cookieStore.get("jwt-refresh-token");
  const crsf_token = cookieStore.get("csrftoken");

  if (token && access_token) {
    // Access token exists, the user is authenticated
    if (crsf_token) {
      return NextResponse.json({
        authenticated: true,
        sess: token,
        csrf: crsf_token,
      });
    }
  } else if (refresh_token) {
    // Refresh token exists, but we need to verify it
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh_token }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.access_token && token) {
          const res = NextResponse.json({
            authenticated: true,
            sess: token,
          });

          // Set HttpOnly cookies for both access token and refresh token
          res.cookies.set("jwt-access-token", token.access_token as string, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60,
          }); // 1 hour
          res.cookies.set("jwt-refresh-token", token.refresh_token as string, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
          }); // 1 week

          return res;
        }
      }
    } catch (error) {
      console.error("Failed to refresh token", error);
    }
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
