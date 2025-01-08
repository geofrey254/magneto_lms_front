import { getSession } from "next-auth/react";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subscription/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch subscription" });
    }

    const data = await response.json();
    res.status(200).json(data.subscriptions?.[0] || {});
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}
