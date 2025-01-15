"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Success() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await fetch("/api/check", {
          method: "GET",
        });

        const token = await response.json();
        const csrfToken = token.csrfToken;

        if (reference) {
          const paymentResponse = await fetch(
            `${process.env.NEXT_PUBLIC_AUTH}/confirm_payment/?reference=${reference}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken || "",
              },
              credentials: "include",
            }
          );
          const data = await paymentResponse.json();
          if (data.status === "success") {
            // Update user's subscription status in the app
            alert("Payment verified successfully");
          } else {
            alert("Payment verification failed.");
          }
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        alert("An error occurred. Please try again.");
      }

      setTimeout(() => {
        router.push("/");
      }, 1000);
    };

    verifyPayment();
  }, [reference, router]);

  return (
    <section className="w-full h-[90vh] top-0 left-0 flex items-center justify-center">
      <div className="p-4 text-center bg-white rounded-xl shadow sm:p-24">
        <div className="w-20 h-20 rounded-full bg-[#f8d6b6] dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-8">
          <FaCheck size={40} className="text-[#350203] animate-pulse" />
        </div>
        <p className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Payment Successful
        </p>
      </div>
    </section>
  );
}

export default Success;
