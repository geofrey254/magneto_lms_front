"use client";

import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { FaCertificate, FaCircle } from "react-icons/fa6";
import Link from "next/link";
import { useSubscription } from "@/hooks/useSubscription";
import { useHistory } from "@/hooks/useHistory";
import DashboardLoading from "@/components/custom/DashboardLoad";

// providers
import { useAppContext } from "@/components/providers/Providers";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineWavingHand } from "react-icons/md";

// shadcn
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PiStudentFill } from "react-icons/pi";

function Billing() {
  const context = useAppContext();
  const { subjects } = context;

  const { data: session } = useSession();

  const { isSubscribed, loading } = useSubscription();
  const { payment } = useHistory();

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

  const formatPayDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "2-digit",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // Handle loading state
  if (loading) {
    return <DashboardLoading />;
  }

  const formattedStartDate = isSubscribed
    ? formatDate(isSubscribed.start_date)
    : "N/A";
  const formattedEndDate = isSubscribed
    ? formatDate(isSubscribed.end_date)
    : "N/A";

  const displayedChapters = subjects?.slice(0, 5);
  const sortedChapters = displayedChapters?.sort((a, b) => {
    const titleA = a.title?.toLowerCase() || "";
    const titleB = b.title?.toLowerCase() || "";
    return titleA.localeCompare(titleB);
  });

  const payData = Array.isArray(payment) ? payment.slice(0, 5).reverse() : [];

  return (
    <div className="container bg-white/65 border border-[#350203] rounded-2xl p-4 grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4 md:gap-12 shadow-2xl">
      {/* Left Column */}
      <div className="md:col-span-4 lg:col-span-4 flex flex-col gap-4">
        {/* Greeting Card */}
        <div className="bg-white border border-[#350203] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-extrabold">
              Hello <span>{session?.user.name}!</span>
            </h3>
            <p className="text-xs md:text-sm">It{"'"}s good to see you!</p>
          </div>
          <div>
            <MdOutlineWavingHand size={24} className="md:w-8 md:h-8" />
          </div>
        </div>

        {/* Status and Magneto AI */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2 items-center p-2 border border-[#350203] bg-white rounded-2xl w-full md:w-1/2">
            <h3 className="font-semibold text-sm">Status</h3>
            <span className="ml-2 text-xs text-gray-500 flex items-center">
              <FaCircle
                className={`mr-2 ${
                  isSubscribed?.verified
                    ? "text-green-500 animate-pulse"
                    : "text-red-500"
                }`}
              />
              {isSubscribed?.verified ? "Active" : "Inactive"}
            </span>
          </div>
          <Link
            href="/magneto/tutor"
            className="flex gap-2 justify-center items-center p-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl w-full md:w-1/2"
          >
            <h3 className="font-semibold text-nowrap text-sm text-white">
              Try Magneto Ai
            </h3>
            <FaCertificate size={15} className="text-white animate-pulse" />
          </Link>
        </div>

        {/* Subjects Section */}
        <div className="bg-white border border-[#350203] rounded-2xl p-2">
          <div className="px-4 py-3 flex justify-between">
            <h3 className="text-base font-bold text-[#350203]">Subjects</h3>
            <Link
              href="/subjects"
              className="text-sm flex items-center gap-1 hover:gap-2"
            >
              View All
              <IoIosArrowForward size={15} />
            </Link>
          </div>
          <hr className="mb-4 ml-4 w-1/4 border-2" />
          {sortedChapters?.map((sub) => (
            <div
              key={sub.id}
              className="shadow border-2 border-[#350203] rounded-2xl mb-2 p-4 w-full"
            >
              <div className="flex items-center justify-between space-x-4">
                <div className="flex gap-4 items-center">
                  <div className="rounded-full bg-[#f8d6b6] p-2 h-10 w-10">
                    <Image
                      src={sub.image || "path/to/default/image.svg"}
                      alt={sub.title || "Image for " + sub.title}
                      className="rounded-md"
                      width={40}
                      height={40}
                    />
                  </div>
                  <h2 className="font-bold text-sm">
                    {sub.title || "Unnamed Subject"}
                  </h2>
                </div>
                <Link
                  href={`/subjects/${sub.slug}`}
                  className="bg-[#350203] hover:bg-transparent hover:border-2 hover:border-[#350203] hover:text-[#350203] rounded-2xl px-4 py-1 text-xs text-[#f8d6b6] text-center"
                >
                  Start
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div className="md:col-start-7 md:col-end-13 lg:col-start-5 lg:col-end-13">
        {/* User Info */}
        <div className="bg-white border border-[#350203] rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt="Profile"
              width={48}
              height={48}
              className="rounded-full border-2 border-[#350203]"
            />
          ) : (
            <div className="p-2 border-2 border-[#350203] rounded-full">
              <PiStudentFill size={32} className="text-[#350203]" />
            </div>
          )}
          <div className="tracking-wider flex flex-col gap-2">
            <h3 className="font-semibold text-sm">
              Name:{" "}
              <span className="font-normal ml-2">{session?.user.name}</span>
            </h3>
            <h3 className="font-semibold text-sm">
              Email:{" "}
              <span className="font-normal ml-2">{session?.user.email}</span>
            </h3>
          </div>
        </div>

        {/* Subscription Info */}
        {isSubscribed && (
          <>
            <div className="mt-8 mb-4">
              <h3 className="text-lg font-bold text-[#350203]">
                Subscription Info
              </h3>
            </div>
            <div className="bg-white border border-[#350203] rounded-2xl p-4">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-sm text-[#350203]">
                    Current Plan
                  </h3>
                  <span className="text-sm text-gray-500 capitalize">
                    {isSubscribed.plan}
                  </span>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-semibold text-sm text-[#350203]">
                    Start Date
                  </h3>
                  <span className="text-sm text-gray-500">
                    {formattedStartDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-semibold text-sm text-[#350203]">
                    End Date
                  </h3>
                  <span className="text-sm text-gray-500">
                    {formattedEndDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-semibold text-sm text-[#350203]">
                    Status
                  </h3>
                  <span className="text-sm text-gray-500 flex items-center">
                    <FaCircle
                      className={`mr-2 ${
                        isSubscribed.verified
                          ? "text-green-500 animate-pulse"
                          : "text-red-500"
                      }`}
                    />
                    {isSubscribed.verified ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Payment History */}
        {payData && payData.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Reference Code</TableHead>
                        <TableHead className="text-right">
                          Amount Paid
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payData.map((item) => (
                        <TableRow key={item.reference_code}>
                          <TableCell>
                            {formatPayDate(item.payment_date)}
                          </TableCell>
                          <TableCell>{item.reference_code}</TableCell>
                          <TableCell
                            className={`text-right ${
                              item.amount_paid < 50
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            Ksh.{Math.abs(item.amount_paid).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default Billing;
