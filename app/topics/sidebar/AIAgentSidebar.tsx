"use client";
import React, { useState, FC } from "react";

// Utility function to handle API calls
import Dialog from "@/components/custom/Dialog";

const Page: FC = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <div className="flex">
      <button
        className="px-6 py-3 text-white font-semibold text-lg rounded-full bg-gradient-to-r from-[#f8d6b6] via-pink-500 to-red-500 shadow-lg transform hover:scale-105 hover:shadow-2xl focus:outline-none transition-transform duration-300 ease-in-out"
        onClick={() => setShowDialog(true)}
      >
        Ask Magneto AI
      </button>

      {showDialog && <Dialog onClose={() => setShowDialog(false)} />}
    </div>
  );
};
export default Page;
