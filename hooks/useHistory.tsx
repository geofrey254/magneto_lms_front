"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { PaymentHistory } from "@/types/types";

export const useHistory = () => {
  const { data: session } = useSession();
  const [payment, setPayment] = useState<PaymentHistory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      setLoading(true);
      try {
        // Fetch CSRF token
        const csrfTokenResponse = await fetch("/api/check", { method: "GET" });
        const tokenData = await csrfTokenResponse.json();
        const csrfToken = tokenData.csrfToken;

        if (session?.user) {
          // Fetch payment history
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/payment_history/`,
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
            // Check if results exist and set the first item
            if (data.results && data.results.length > 0) {
              setPayment(data.results);
              console.log("Payment data:", data);
            } else {
              setPayment(null);
              console.log("No payment history found.");
            }
          } else {
            setPayment(null);
            console.error("Failed to fetch payment history:", data);
          }
        } else {
          setPayment(null);
        }
      } catch (error) {
        console.error("Error fetching payment history:", error);
        setPayment(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [session]);

  return { payment, loading };
};
