"use client";
import React from "react";
import { useAppContext } from "@/components/providers/Providers";
import Link from "next/link";
import { FaHandPointRight } from "react-icons/fa";

function Latest() {
  const latest = useAppContext();
  const { latestChapters } = latest;

  return (
    <div className="bg-[#350203] py-4 px-6 rounded-2xl">
      <h3 className="text-lg font-normal mb-8 text-white">Latest Topics</h3>
      <div className="flex flex-col gap-2">
        {latestChapters.map((chap) => (
          <Link
            href={`/topics/${chap.slug}`}
            key={chap.id}
            className="mb-4 flex items-center gap-4 text-white"
          >
            <div>
              <FaHandPointRight size={15} className="text-[#f8d6b6]" />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white flex justify-between items-center">
                {chap.title}
              </h2>
              <span className="text-white border border-white  p-1 text-xs rounded-full">
                {chap.subject?.title ?? "No Subject"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Latest;
