"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/components/providers/Providers";
import { ChaptersProps } from "@/types/types";

function Subjects({ limit }: ChaptersProps) {
  const context = useAppContext();
  const { subjects } = context;

  if (!subjects || subjects.length === 0) {
    return <p>No subjects available.</p>;
  }

  const displayedChapters = limit ? subjects.slice(0, limit) : subjects;

  return (
    <section className="pt-12 flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {displayedChapters.map((sub) => (
          <div
            key={sub.id}
            className="border border-[#350203] shadow rounded-md p-4 max-w-sm w-full mx-auto"
          >
            <div className="flex space-x-4">
              <div className="rounded-full bg-[#f8d6b6] p-2 h-10 w-10">
                <Image
                  src={sub.image || "path/to/default/image.svg"}
                  alt={sub.title || "Image for " + sub.title}
                  className="rounded-md"
                  width={300}
                  height={300}
                />
              </div>
              <div className="flex-1 space-y-4 py-1">
                <h2 className="font-bold text-lg">
                  {sub.title || "Unnamed Subject"}
                </h2>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {sub.form && sub.form.length > 0 ? (
                      sub.form.map((cls) => (
                        <span
                          key={cls.id}
                          className="bg-[#35020362] text-[#350203] px-2 py-1 rounded text-xs"
                        >
                          {cls.name || "Unnamed Class"}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-600 text-xs">
                        No classes available.
                      </span>
                    )}
                  </div>

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
          </div>
        ))}
      </div>
      {limit && subjects.length > limit && (
        <Link
          href="/subjects"
          className="py-3 px-5 sm:ms-4 font-medium mt-12 text-[#350203] border-2 border-[#350203] hover:bg-[#350203] hover:text-[#f8d6b6] p-2 text-sm rounded-2xl"
        >
          View More
        </Link>
      )}
    </section>
  );
}

export default Subjects;