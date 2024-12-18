"use client";

import React from "react";
import { useAppContext } from "@/components/providers/Providers";
import Link from "next/link";

function Related({ subjectSlug }: { subjectSlug: string }) {
  const { chapters } = useAppContext();

  // Show a loading message if chapters are not loaded yet
  if (!chapters) {
    return <div className="text-white">Loading related chapters...</div>;
  }

  // Filter chapters by the subject's slug
  const relatedChapters = chapters.filter(
    (chapter) => chapter.subject?.slug === subjectSlug
  );

  return (
    <div className="bg-[#350203] p-4 rounded-2xl">
      <h3 className="text-lg font-semibold mb-2 text-white">Related Topics</h3>
      <div className="flex flex-col gap-4">
        {relatedChapters.length > 0 ? (
          // If related chapters exist, render the list
          relatedChapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/topics/${chapter.slug}`}
              className="bg-white rounded-2xl border border-[#f8d6b6] p-4 mb-4 shadow-inner shadow-black"
            >
              <h2 className="text-sm font-bold text-gray-800 flex justify-between items-center">
                {chapter.title}
                <span className="text-white bg-gray-800 px-2 py-1 text-xs rounded-full">
                  {chapter.subject?.title ?? "No Subject"}
                </span>
              </h2>
            </Link>
          ))
        ) : (
          // If no related chapters found, show a fallback message
          <div className="text-white">No related chapters found</div>
        )}
      </div>
    </div>
  );
}

export default Related;
