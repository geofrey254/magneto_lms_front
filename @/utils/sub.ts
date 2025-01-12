// utils/checkSubscription.ts
export const checkSubscription = async (
  accessToken: string,
  userEmail: string
) => {
  try {
    // Step 1: Fetch the token from /api/check
    const response = await fetch("/api/check", {
      method: "GET",
    });

    const token = await response.json();
    const csrfToken = token.csrfToken;

    // Step 2: Ensure the user is authenticated and has a session
    if (accessToken && userEmail) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/subscription/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-CSRFToken": csrfToken || "",
            "X-User-Email": userEmail,
          },
          credentials: "include",
        }
      );

      if (res.ok) {
        const data = await res.json();
        // Return the subscription verified status
        return data.subscriptions[0]?.verified || false;
      } else {
        console.error("Failed to fetch subscription data");
        return false;
      }
    }
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return false;
  }

  return false;
};
