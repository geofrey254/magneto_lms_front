"use client";

import Chapters from "@/app/topics/chapters";
import React from "react";
import { FaCertificate } from "react-icons/fa6";
import More from "../buttons/More";

function Lessons() {
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
        <Chapters />
      </div>
      <div className="mt-12">
        <More />
      </div>
    </section>
  );
}

export default Lessons;
