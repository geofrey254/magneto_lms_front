"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Subscription } from "@/types/types";

export const useSubscription = () => {
  const { data: session } = useSession();
  const [isSubscribed, setSubscribed] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      setLoading(true);
      try {
        const csrfTokenResponse = await fetch("/api/check", { method: "GET" });
        const tokenData = await csrfTokenResponse.json();
        const csrfToken = tokenData.csrfToken;

        if (session?.user) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/subscription/`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "X-CSRFToken": csrfToken || "",
                "X-User-Email": session.user.email,
              },
              credentials: "include",
            }
          );

          const data = await res.json();
          if (res.ok) {
            setSubscribed(data.subscriptions[0]);
          } else {
            setSubscribed(null);
          }
        } else {
          setSubscribed(null);
        }
      } catch (error) {
        console.error("Error fetching subscription:", error);
        setSubscribed(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [session]);

  return { isSubscribed, loading };
};
