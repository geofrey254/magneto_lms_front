// Chapters.tsx
"use client";
import React from "react";
import Link from "next/link";
import { ChaptersProps } from "@/types/types";
import { useAppContext } from "@/components/providers/Providers";

function Chapters({ limit }: ChaptersProps) {
  const context = useAppContext();
  const { chapters, filteredChapters } = context;
  if (!chapters || chapters.length === 0) {
    return <p>No subjects available.</p>;
  }

  // Determine the number of chapters to display based on the limit
  const displayedChapters = limit
    ? filteredChapters.slice(0, limit)
    : filteredChapters;

  return (
    <section className="w-full py-12 flex flex-col gap-6 justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedChapters.length > 0 ? (
          displayedChapters.map((chap) => (
            <div
              key={chap.id}
              className="border flex flex-col gap-4 border-[#350203] shadow rounded-md p-4 max-w-sm w-full mx-auto"
            >
              <div className="flex gap-4 text-xs">
                <span className="text-black bg-[#f8d6b6] p-2 rounded-2xl">
                  {chap.class?.name ?? "Class Not Assigned"}
                </span>
                <span className="text-black bg-[#f8d6b6] p-2 rounded-2xl">
                  {chap.subject?.name ?? "Subject Not Assigned"}
                </span>
              </div>
              <h2 className="text-lg font-bold text-black">{chap.title}</h2>
              <p className="text-gray-600 text-sm">{chap.description}</p>
              <div className="">
                <Link
                  href={`/Lessons/${chap.slug}`}
                  className="bg-[#350203] rounded-2xl px-4 py-1 text-xs text-[#f8d6b6] text-center"
                >
                  Start
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No chapters found based on your search criteria.</p>
        )}
      </div>

      {limit && filteredChapters.length > limit && (
        <Link href="/Lessons" className="mt-4 text-[#350203] font-bold">
          View More
        </Link>
      )}
    </section>
  );
}

export default Chapters;
