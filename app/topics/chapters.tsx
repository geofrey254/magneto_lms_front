// Chapters.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChaptersProps } from "@/types/types";
import { useAppContext } from "@/components/providers/Providers";

function Chapters({ limit }: ChaptersProps) {
  const context = useAppContext();
  const { chapters } = context;
  const [searchTerm, setSearchTerm] = useState("");
  if (!chapters || chapters.length === 0) {
    return <p>No subjects available.</p>;
  }

  // Filter chapters based on the search term
  const filteredChapters = chapters.filter((chap) => {
    return (
      chap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (chap.description &&
        chap.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (chap.subject?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false) ||
      (chap.class?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false)
    );
  });

  // Determine the number of chapters to display based on the limit
  const displayedChapters = limit
    ? filteredChapters.slice(0, limit)
    : filteredChapters;

  return (
    <section className="w-full py-12 flex flex-col gap-6 justify-center items-center">
      <div className="flex px-4 py-3 rounded-md border-2 border-[#350203] overflow-hidden max-w-md mx-auto font-[sans-serif]">
        <input
          type="text"
          placeholder="Search chapters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none bg-transparent text-gray-600 text-sm"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192.904 192.904"
          width="16px"
          className="fill-gray-600"
        >
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
        </svg>
      </div>
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
