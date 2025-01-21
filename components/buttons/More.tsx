"use client";
import React from "react";
import Link from "next/link";

// icons
import { HiMiniArrowLongRight } from "react-icons/hi2";

function More() {
  return (
    <div>
      <Link
        href="/topics"
        className="sm:ms-4 font-medium -mt-7 text-[#350203] text-sm rounded-2xl flex justify-center items-center gap-4"
      >
        Explore All <HiMiniArrowLongRight size={30} />
      </Link>
    </div>
  );
}

export default More;
