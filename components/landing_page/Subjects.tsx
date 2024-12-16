import React from "react";
import { FaCertificate } from "react-icons/fa6";
import Subjects from "@/app/subjects/subjects";

function Categories() {
  return (
    <section
      id="subjects"
      className="bg-[#f9eeea] jumbotron w-full px-4 py-8 md:py-8 2xl:py-8 flex flex-col justify-center items-center"
    >
      <div className="flex flex-col gap-4 justify-center md:items-center mt-8">
        <h4 className="flex gap-4">
          <FaCertificate className="cert text-[#350203]" size={20} />
          Large Collection of Subjects
        </h4>
        <h4 className={`font-bold text-center text-4xl`}>Explore Subjects</h4>
      </div>
      <Subjects limit={4} />
    </section>
  );
}

export default Categories;
