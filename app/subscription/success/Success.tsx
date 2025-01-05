"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { getCsrfToken } from "next-auth/react";

function Success() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (reference) {
          const csrfToken = await getCsrfToken();
          console.log("CSRF:", csrfToken);

          const paymentResponse = await fetch(
            `${process.env.NEXT_PUBLIC_AUTH}/confirm_payment/?reference=${reference}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          const data = await paymentResponse.json();
          if (data.status === true) {
            // Update user's subscription status in the app
            console.log("Payment verified successfully");
          } else {
            alert("Payment verification failed.");
          }
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        alert("An error occurred. Please try again.");
      }
    };

    verifyPayment();
  }, [reference]);

  return (
    <section className="w-full h-[90vh] top-0 left-0 flex items-center justify-center">
      <div className="p-4 text-center bg-white rounded-xl shadow sm:p-24">
        <div className="w-20 h-20 rounded-full bg-[#f8d6b6] dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-8">
          <FaCheck size={40} className="text-[#350203] animate-pulse" />
        </div>
        <p className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Payment Successful
        </p>
        <Link
          href="/topics"
          className="bg-[#350203] rounded-2xl text-white px-6 py-2.5 font-semibold"
        >
          Continue
        </Link>
      </div>
    </section>
  );
}

export default Success;
