"use client";
import React from "react";
import { useAppContext } from "@/components/providers/Providers";
import Link from "next/link";

function Latest() {
  const latest = useAppContext();
  const { latestChapters } = latest;

  return (
    <div className="bg-[#350203] p-4 rounded-2xl">
      <h3 className="text-lg font-semibold mb-2 text-white">Latest Topics</h3>
      <div className="flex flex-col gap-4">
        {latestChapters.map((chap) => (
          <Link
            href={`/topics/${chap.slug}`}
            key={chap.id}
            className="bg-white rounded-2xl border border-[#f8d6b6] p-4 mb-4 shadow-inner shadow-black"
          >
            <h2 className="text-sm font-bold text-gray-800 flex justify-between items-center">
              {chap.title}
              <span className="text-white bg-gray-800 px-2 py-1 text-xs rounded-full">
                {chap.subject?.title ?? "No Subject"}
              </span>
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Latest;
