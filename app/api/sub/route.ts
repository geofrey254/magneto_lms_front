import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized: Please log in." });
  }
  console.log("SUBSCC SESSION:", session);

  try {
    // Verify subscription status via Django API
    const userRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/subscription/`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`, // Assuming you have a token from next-auth
        },
        credentials: "include",
      }
    );

    if (!userRes.ok) {
      return res
        .status(userRes.status)
        .json({ error: "Failed to verify subscription status." });
    }

    const subs = await userRes.json();

    // Check if subscriptions exist and verify the first subscription
    if (!subs.data || !subs.data.subscriptions || !subs.data.subscriptions[0]) {
      return res.status(403).json({
        error: "Access Denied: No active subscription found.",
      });
    }

    const subscription = subs.data.subscriptions[0];

    // if (!subscription.verified) {
    //   return res.status(403).json({
    //     error: "Access Denied: Active subscription required.",
    //   });
    // }

    // Return subscription details or any other relevant data if verified
    res.status(200).json({ message: "Subscription verified", subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
}
