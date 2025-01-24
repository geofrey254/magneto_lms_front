"use client";
import React from "react";
import { useAppContext } from "@/components/providers/Providers";
import Link from "next/link";
import { FaHandPointRight } from "react-icons/fa";

function Latest() {
  const latest = useAppContext();
  const { latestChapters } = latest;

  return (
    <div className="flex flex-col gap-2">
      {latestChapters.map((chap) => (
        <Link
          href={`/topics/${chap.slug}`}
          key={chap.id}
          className="mb-4 flex items-center gap-4 text-white hover:bg-[#f8d6b6]/10 p-2 rounded-lg transition-colors"
        >
          <div>
            <FaHandPointRight
              size={15}
              className="text-[#f8d6b6] flex-shrink-0"
            />
          </div>
          <div className="flex justify-between items-center gap-2 w-full">
            <h2 className="text-sm font-bold text-[#350203] flex-1 truncate">
              {chap.title}
            </h2>
            <span className="text-[#350203] border border-[#350203] px-2 py-1 text-xs rounded-full whitespace-nowrap flex-shrink-0">
              {chap.subject?.title ?? "No Subject"}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Latest;
