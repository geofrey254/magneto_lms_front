"use client";

import React from "react";
import { FaCertificate } from "react-icons/fa6";
import More from "../buttons/More";
import { useAppContext } from "../providers/Providers";
import Link from "next/link";

function Lessons() {
  const context = useAppContext();
  const { filteredChapters } = context;
  const sortedChapters = filteredChapters.slice(0, 3);
  const displayedChapters = sortedChapters.sort((a, b) => {
    const titleA = a.title?.toLowerCase() || "";
    const titleB = b.title?.toLowerCase() || "";
    return titleA.localeCompare(titleB);
  });

  if (filteredChapters.length === 0) {
    return <p>No chapters available.</p>;
  }

  return (
    <section className="bg-[#ffffff] jumbotron w-full px-4 py-8 md:py-8 2xl:py-8 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-6 justify-center md:items-center mt-8">
        <h4 className="flex gap-4">
          <FaCertificate className="cert text-[#350203]" size={20} />
          Large Collection of Topics
        </h4>
        <h4 className="font-bold text-center text-4xl">Topics Available</h4>
      </div>
      <div className="mt-8">
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
      </div>
      <div className="mt-12">
        <More />
      </div>
    </section>
  );
}

export default Lessons;
