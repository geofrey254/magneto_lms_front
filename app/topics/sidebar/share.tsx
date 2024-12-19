"use client";
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";
import CopyLink from "@/components/buttons/CopyLink";

function Share() {
  const courseUrl = "https://magneto.com"; // Replace with dynamic URL logic

  const shareText =
    "Check out this amazing course on Magneto! Magneto is your trusted partner in education, offering high-quality, engaging content tailored to the Kenyan high school curriculum. Every student deserves access to tools that make learning simple, interactive, and effective."; // Customized share text

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">
        Share this with your friends:
      </h3>

      <div className="flex space-x-4 items-center">
        {/* Facebook Share */}
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            courseUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-[#f8d6b6] p-2 rounded-2xl space-x-2"
        >
          <FaFacebookF />
        </Link>

        {/* Twitter Share */}
        <Link
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            courseUrl
          )}&text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-[#f8d6b6] p-2 rounded-2xl  space-x-2"
        >
          <FaTwitter />
        </Link>

        {/* WhatsApp Share */}
        <Link
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
            `${shareText} ${courseUrl}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-[#f8d6b6] p-2 rounded-2xl  space-x-2"
        >
          <FaWhatsapp />
        </Link>

        <CopyLink />
      </div>
    </div>
  );
}

export default Share;
