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

  if (token && access_token) {
    // Access token exists, the user is authenticated
    return NextResponse.json({
      authenticated: true,
      session: token,
    });
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
        if (data.access_token) {
          cookieStore.set("jwt-access-token", data.access_token);
          return NextResponse.json({ authenticated: true });
        }
      }
    } catch (error) {
      console.error("Failed to refresh token", error);
    }
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
