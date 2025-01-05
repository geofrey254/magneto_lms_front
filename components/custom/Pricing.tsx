"use client";

import { Subscription } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function Pricing() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/subscription_plan/`,
          {
            cache: "force-cache",
            next: { revalidate: 1 },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch subscriptions");
        }

        const data = await res.json();
        setSubscriptions(data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscription = async (subscription: Subscription) => {
    try {
      // Step 1: Fetch the token from /api/check
      const response = await fetch("/api/check", {
        method: "GET",
      });

      const { csrf } = await response.json();

      const csrfToken = csrf?.value;
      console.log("CSRF:", csrfToken);

      console.log("User:", session?.user.email);
      // Step 2: Use the token in the request to the backend
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH}/submit/${subscription.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`, // Include the token here
            "X-CSRFToken": csrfToken,

            // Include the CSRF token here
          },
          credentials: "include",
          body: JSON.stringify({
            amount: subscription.amount,
            email: session?.user.email, // Use the fetched user's email
          }),
        }
      );

      console.log("Token sent:", session?.accessToken); // Check if the token is correctly passed

      const data = await res.json();
      console.log("Payment initialization response:", data);

      if (data.status) {
        window.location.href = data.data.authorization_url;
      } else {
        console.error("Payment initialization failed:", data.message);
        alert("Payment initialization failed. Please try again.");
      }
    } catch (error) {
      console.error("Error handling subscription:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (subscriptions.length === 0) {
    return <p>No subscription plans available at the moment.</p>;
  }

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#350203] opacity-60"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base/7 font-semibold text-[#350203]">Pricing</h2>
        <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Choose the right plan for your learning journey
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-lg/8">
        Unlock access to premium educational content with flexible plans
        tailored to your needs.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 md:gap-x-8 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
        {subscriptions.map((sub) => (
          <div
            className="rounded-3xl rounded-t-3xl bg-white/60 ring-1 ring-gray-900/10 sm:mx-8 sm:p-10 lg:mx-0"
            key={sub.id}
          >
            <h3 className="text-base/7 font-semibold text-[#350203a9] capitalize">
              {sub.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-4xl font-semibold tracking-tight text-gray-900">
                Kes{sub.amount}
              </span>
              <span className="text-base text-gray-500">/day</span>
            </p>
            <p className="mt-6 text-base text-gray-600">{sub.description} </p>
            <button
              aria-describedby="tier-daily"
              className="mt-8 block rounded-2xl px-3.5 py-2.5 text-center text-sm font-semibold text-[#350203] ring-1 ring-inset ring-indigo-200 hover:ring-[#350203] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#350203] sm:mt-10"
              onClick={() => handleSubscription(sub)}
            >
              Get started today
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pricing;
