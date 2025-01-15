"use client";

import { useAppContext } from "../providers/Providers";
// shadcn
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Subscription } from "@/types/types";
import { useSession } from "next-auth/react";

function Pricing() {
  const context = useAppContext();
  const { subscriptions } = context;
  const { data: session } = useSession();

  const [selectedPlan, setSelectedPlan] = useState<Subscription | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handlePlanSelect = (plan: Subscription) => {
    if (session?.user) {
      setSelectedPlan(plan);
      setIsConfirmationOpen(true);
    }
  };

  const handleSubscription = async (subscription: Subscription) => {
    try {
      // Step 1: Fetch the token from /api/check
      const response = await fetch("/api/check", {
        method: "GET",
      });

      const token = await response.json();
      const csrfToken = token.csrfToken;

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

      const data = await res.json();

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

  if (!subscriptions || subscriptions.length === 0) {
    return <p>No subjects available.</p>;
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
        <p className="mt-2 text-balance font-extrabold md:font-semibold tracking-tight text-gray-900 text-3xl md:text-6xl">
          Choose the right plan for your learning journey
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-lg/8">
        Unlock access to premium educational content with flexible plans
        tailored to your needs.
      </p>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Choose Your Plan
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptions.map((plan) => (
            <Card
              key={plan.id}
              className="rounded-3xl rounded-t-3xl bg-white/60 ring-1 ring-[#350203] sm:mx-8 p-4 md:flex md:flex-col lg:mx-0 md:h-[60vh]"
            >
              <CardHeader className="">
                <CardTitle className="text-xl font-semibold text-[#350203a9] capitalize tracking-wide mb-2">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-4xl font-bold">
                  <span className="text-sm">Kes.</span>
                  {plan.amount} /=
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="mt-6 text-sm xl:text-base text-gray-600">
                  {plan.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="rounded-2xl px-3.5 py-3 text-center text-sm font-semibold text-[#350203] hover:border hover:border-[#350203] mt-4"
                  onClick={() => {
                    if (!session?.user) {
                      window.location.href = "/signin";
                    } else {
                      handlePlanSelect(plan);
                    }
                  }}
                >
                  {session?.user ? "Select Plan" : "Log in to Subscribe"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
          <DialogContent className="bg-white border-2 border-[#350203]">
            <DialogHeader className="flex justify-center items-center">
              <DialogTitle className="text-xl">
                Confirm Your Selection
              </DialogTitle>
              <DialogDescription>
                You have selected the {selectedPlan?.name} plan. The amount is
                Kes.
                {selectedPlan?.amount}.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <Button
                onClick={() => setIsConfirmationOpen(false)}
                className="bg-red-400 rounded-xl text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSubscription(selectedPlan!)}
                className="rounded-xl border border-[#350203]"
              >
                Proceed to Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Pricing;
