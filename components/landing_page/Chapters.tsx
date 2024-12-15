import Chapters from "@/app/topics/chapters";
import React from "react";
import { FaCertificate } from "react-icons/fa6";

function Lessons() {
  return (
    <section className="bg-[#f9eeea] jumbotron w-full px-4 py-4 md:py-12 2xl:py-8 flex justify-center items-center">
      <div className="flex flex-col gap-6 justify-center md:items-center mt-8">
        <h4 className="flex gap-4">
          <FaCertificate className="cert text-[#350203]" size={20} />
          Large Collection of Chapters
        </h4>
        <h4 className={`font-bold text-center text-4xl`}>Go to Chapters</h4>
        <div className="">
          <Chapters limit={6} />
        </div>
      </div>
    </section>
  );
}

export default Lessons;
