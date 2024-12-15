"use client";
import React from "react";
import Link from "next/link";
import { useViewMoreContext } from "../providers/ViewMore";
import { useAppContext } from "../providers/Providers";

// icons
import { HiMiniArrowLongRight } from "react-icons/hi2";

function More() {
  const { limits } = useViewMoreContext();
  const { filteredChapters } = useAppContext();

  // Show the button only if filtered chapters exceed the limit
  if (!limits || filteredChapters.length < limits) return null;

  return (
    <div>
      <Link
        href="/topics"
        className="sm:ms-4 font-medium -mt-7 text-[#350203] text-sm rounded-2xl flex justify-center items-center gap-4"
      >
        Explore All Topics <HiMiniArrowLongRight size={30} />
      </Link>
    </div>
  );
}

export default More;
