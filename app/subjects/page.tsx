import React from "react";
import Subjects from "./subjects";

export default async function Page() {
  return (
    <section className="w-full max-w-full px-4 pt-20 pb-6 md:p-16 md:pt-24 xl:px-24 2xl:p-24 ">
      <div className="text-center mt-8 md:mt-0 mb-2 md:mb-12">
        <h3 className="text-[#350203] text-3xl md:text-2xl font-bold">
          Choose Your Subject
        </h3>
        <p className="text-[#350203c9]">
          Discover a variety of subjects designed to enhance your knowledge and
          skills. Whether you{"'"}re exploring Math, Science, or Literature,
          each subject is structured to guide you step by step. Select a subject
          to begin your learning journey!
        </p>
      </div>

      <Subjects />
    </section>
  );
}
