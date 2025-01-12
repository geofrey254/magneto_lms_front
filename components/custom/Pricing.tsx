"use client";

import Link from "next/link";
import { useAppContext } from "../providers/Providers";

function Pricing() {
  const context = useAppContext();
  const { subscriptions } = context;

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
      <div className="mx-auto mt-8 md:mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 md:gap-x-8 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
        {subscriptions.map((sub) => (
          <div
            className="rounded-3xl rounded-t-3xl bg-white/60 ring-1 ring-[#350203] sm:mx-8 p-8 md:p-10 lg:mx-0 md:h-[60vh]"
            key={sub.id}
          >
            <h3 className="text-base/7 font-semibold text-[#350203a9] capitalize">
              {sub.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-4xl font-semibold tracking-tight text-gray-900">
                Kes{sub.amount}
              </span>
              <span className="text-base text-gray-500"></span>
            </p>
            <p className="mt-6 text-base text-gray-600">{sub.description} </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-12">
        <Link
          href="/subscription/initiate"
          className="bg-[#350203] text-white p-4 rounded-2xl"
        >
          Initiate Payment
        </Link>
      </div>
    </div>
  );
}

export default Pricing;
