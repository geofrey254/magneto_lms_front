import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("jwt-access-token");
  const refresh_token = cookieStore.get("jwt-refresh-token");

  if (access_token) {
    // Access token exists, the user is authenticated
    return NextResponse.json({ authenticated: true });
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
