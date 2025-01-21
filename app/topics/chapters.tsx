// Chapters.tsx
"use client";
import React from "react";
import Link from "next/link";
import { useAppContext } from "@/components/providers/Providers";

function Chapters() {
  const context = useAppContext();
  const { chapters, filteredChapters } = context;
  if (!chapters || chapters.length === 0) {
    return <p>No subjects available.</p>;
  }

  // Determine the number of chapters to display based on the limit
  const displayedChapters = filteredChapters;

  if (filteredChapters.length === 0) {
    return <p>No chapters available.</p>;
  }

  return (
    <section className="w-full flex flex-col gap-6 justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedChapters.length > 0 ? (
          displayedChapters.map((chap) => (
            <div
              key={chap.id}
              className="border flex flex-col gap-4 border-[#350203] shadow rounded-md p-4 max-w-sm w-full mx-auto"
            >
              <div className="flex gap-4 text-xs">
                <span className="text-black bg-[#f8d6b6] p-2 rounded-2xl">
                  {chap.form?.name ?? "Class Not Assigned"}
                </span>
                <span className="text-black bg-[#f8d6b6] p-2 rounded-2xl">
                  {chap.subject?.title ?? "Subject Not Assigned"}
                </span>
              </div>
              <h2 className="text-lg font-bold text-black">{chap.title}</h2>
              <p className="text-gray-600 text-sm">{chap.description}</p>
              <div className="">
                <Link
                  href={`/topics/${chap.slug}`}
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
    </section>
  );
}

export default Chapters;
