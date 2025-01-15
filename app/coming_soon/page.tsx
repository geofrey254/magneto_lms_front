import Link from "next/link";
import React from "react";

function page() {
  return (
    <section className="w-full max-w-full px-4 pt-20 pb-6 xl:px-24 2xl:p-24 bg-[#350203] md:h-[90vh] flex justify-center items-center">
      <div className="container ">
        <div className="flex flex-col justify-center items-center gap-8 text-center">
          <div>
            <h3 className="text-white text-5xl font-bold">
              Something Exciting is on the Horizon!
            </h3>
          </div>
          <div className="text-center text-white/65 mb-12">
            <p>
              Get ready to unlock your potential with our revolutionary
              eLearning platform. We{"'"}re crafting an experience designed to
              make learning more accessible, interactive, and tailored just for
              you.
            </p>
            <p>
              Stay tuned as we put the final touches on this game-changing
              platform that will empower learners everywhere to achieve their
              goals. Your journey to success begins soon!
            </p>
          </div>
          <div>
            <Link href="/topics" className="bg-[#f8d6b6] p-4 rounded-2xl ">
              View Topics
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
