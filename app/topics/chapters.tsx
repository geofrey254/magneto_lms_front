// Chapters.tsx
"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useAppContext } from "@/components/providers/Providers";

// shadcn
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function Chapters() {
  const context = useAppContext();
  const {
    filteredChapters,
    currentPage,
    setCurrentPage,
    totalPages,
    setChapters,
    searchTerm,
  } = context;

  // Fetch chapters when the page changes
  useEffect(() => {
    async function fetchChapters() {
      try {
        const url = searchTerm
          ? `${process.env.NEXT_PUBLIC_API_URL}/chapters/?search=${searchTerm}`
          : `${process.env.NEXT_PUBLIC_API_URL}/chapters/?page=${currentPage}`;

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch chapters");
        }
        const data = await res.json();
        setChapters(data.results || data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    }
    fetchChapters();
  }, [currentPage, setChapters, searchTerm]);

  if (!filteredChapters || filteredChapters.length === 0) {
    return <p>No chapters available.</p>;
  }

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <section className="w-full flex flex-col gap-6 justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChapters.map((chap) => (
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
        ))}
      </div>

      {/* Pagination Controls (only show if not searching) */}
      {!searchTerm && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                {currentPage} <span className="mx-1">of</span> {totalPages}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
}

export default Chapters;
