"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Subscription } from "@/types/types";
import { FaCertificate, FaCircle } from "react-icons/fa6";
import Link from "next/link";

// providers
import { useAppContext } from "@/components/providers/Providers";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineWavingHand } from "react-icons/md";

function Billing() {
  const context = useAppContext();
  const { subjects } = context;

  const { data: session } = useSession();

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const fetchSubscription = async () => {
      // Step 1: Fetch the token from /api/check
      const response = await fetch("/api/check", {
        method: "GET",
      });

      const token = await response.json();
      const csrfToken = token.csrfToken;

      // Ensure the user is authenticated and has a session
      if (session?.user) {
        try {
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

          if (res.ok) {
            const data = await res.json();
            console.log("TRYING:", data.subscriptions[0].verified);
            setSubscription(data.subscriptions[0]);
          } else {
            console.error("Failed to fetch subscription data");
            setSubscription(null);
          }
        } catch (error) {
          console.error("Error fetching subscription:", error);
          setSubscription(null);
        } finally {
          setLoading(false);
        }
      }
    };

    if (session?.user) {
      fetchSubscription();
    } else {
      setLoading(false);
    }
  }, [session]);

  // Handle loading state and no subscription found
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!subscription) {
    return <div>No subscription data found.</div>;
  }

  const formattedStartDate = formatDate(subscription.start_date);
  const formattedEndDate = formatDate(subscription.end_date);

  const displayedChapters = subjects?.slice(0, 5);
  const sortedChapters = displayedChapters?.sort((a, b) => {
    const titleA = a.title?.toLowerCase() || "";
    const titleB = b.title?.toLowerCase() || "";
    return titleA.localeCompare(titleB);
  });

  return (
    <div className="container bg-white/65 border border-[#350203] rounded-2xl p-4 grid grid-cols-12 shadow-2xl">
      <div className="col-span-4 flex flex-col gap-8">
        {" "}
        <div className="bg-white border border-[#350203] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold">
              Hello <span>{session?.user.name}!</span>
            </h3>
            <p className="text-sm">It{"'"}s good to see you!</p>
          </div>
          <div>
            <MdOutlineWavingHand size={30} className="" />
          </div>
        </div>
        {/* row 2 */}
        <div className="flex gap-4">
          <div className="flex gap-4 items-center mb-4 border border-[#350203] bg-white w-1/2 p-2 rounded-2xl">
            <h3 className="font-semibold text-sm">Status</h3>
            <span className="ml-2 text-xs text-gray-500 flex items-center">
              {/* Display a green dot if active, red if inactive */}
              <FaCircle
                className={`mr-2 ${
                  subscription.verified
                    ? "text-green-500 animate-pulse"
                    : "text-red-500"
                }`}
              />
              {subscription.verified ? "Active" : "Inactive"}
            </span>
          </div>
          {/* magento ai */}
          <Link
            href="/magneto/tutor"
            className="flex gap-4 justify-center items-center mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-1/2 p-2 rounded-2xl"
          >
            <h3 className="font-semibold text-sm text-white">Try Magneto Ai</h3>
            <span>
              <FaCertificate
                size={15}
                className="text-white animate-pulse cert"
              />
            </span>
          </Link>
        </div>
        {/* row 3 */}
        <div className="bg-white border border-[#350203] rounded-2xl p-2">
          <div className="px-4 py-3 flex justify-between">
            <h3 className="text-base0 font-bold text-[#350203]">Subjects</h3>
            <Link
              href="/subjects"
              className="text-sm flex items-center gap-1 hover:gap-2"
            >
              View All
              <span>
                <IoIosArrowForward size={15} />
              </span>
            </Link>
          </div>
          <hr className="mb-4 ml-4 w-1/4 border-2" />
          {sortedChapters?.map((sub) => (
            <div
              key={sub.id}
              className="shadow border-2 border-[#350203] rounded-2xl mb-2 p-4 max-w-sm w-full mx-auto"
            >
              <div className="flex items-center justify-between space-x-4">
                <div className="flex gap-6 rounded-full bg-[#f8d6b6] p-2 h-10 w-10">
                  <Image
                    src={sub.image || "path/to/default/image.svg"}
                    alt={sub.title || "Image for " + sub.title}
                    className="rounded-md"
                    width={100}
                    height={100}
                  />
                  <div className="flex py-1">
                    <h2 className="font-bold text-sm">
                      {sub.title || "Unnamed Subject"}
                    </h2>
                  </div>
                </div>

                <div className="">
                  <div className="rounded">
                    <Link
                      href={`/subjects/${sub.slug}`}
                      className="bg-[#350203] hover:bg-transparent hover:border-2 hover:border-[#350203] hover:text-[#350203] rounded-2xl px-4 py-1 text-xs text-[#f8d6b6] text-center"
                    >
                      Start
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-start-7 col-end-13">
        <div className="user_info bg-white border border-[#350203] rounded-2xl p-4 flex gap-6">
          <div>
            <Image
              src={session?.user.image || ""}
              alt="user photo"
              width={60}
              height={60}
              quality={100}
              className="rounded-2xl"
            />
          </div>
          <div className="tracking-wider flex flex-col gap-2">
            <h3 className="font-semibold text-sm">
              Name:
              <span className="font-normal ml-14 text-xs">
                {session?.user.name}
              </span>
            </h3>
            <h3 className="font-semibold text-sm">
              Email:
              <span className="font-normal ml-14 text-xs">
                {session?.user.email}
              </span>
            </h3>
          </div>
        </div>
        <div className="mt-12 mb-4">
          <h3 className="text-lg font-bold text-[#350203]">
            Subscription Info
          </h3>
        </div>
        <div className="sub_details px-8 py-12 rounded-2xl bg-white border border-[#350203]">
          <div>
            <div className="flex items-center mb-4 justify-between">
              <h3 className="font-semibold text-sm text-[#350203]">
                Current Plan
              </h3>
              <span className="ml-2 text-sm text-gray-500 capitalize">
                {subscription.plan}
              </span>
            </div>
            <div className="flex items-center mb-4 justify-between">
              <h3 className="font-semibold text-sm text-[#350203]">
                Start Date
              </h3>
              <span className="ml-2 text-sm text-gray-500">
                {formattedStartDate}
              </span>
            </div>
            <div className="flex items-center mb-4 justify-between">
              <h3 className="font-semibold text-sm text-[#350203]">End Date</h3>
              <span className="ml-2 text-sm text-gray-500">
                {formattedEndDate}
              </span>
            </div>
            <div className="flex items-center mb-4 justify-between">
              <h3 className="font-semibold text-sm text-[#350203]">Status</h3>
              <span className="ml-2 text-sm text-gray-500 flex items-center">
                {/* Display a green dot if active, red if inactive */}
                <FaCircle
                  className={`mr-2 ${
                    subscription.verified
                      ? "text-green-500 animate-pulse"
                      : "text-red-500"
                  }`}
                />
                {subscription.verified ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
