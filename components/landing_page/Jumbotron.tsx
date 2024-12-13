import React from "react";
import Link from "next/link";

function Jumbotron() {
  return (
    <section className="bg-[#350203] w-full dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl md:text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-[#f8d6b6] md:text-5xl lg:text-6xl dark:text-white">
          Empowering Students Across Kenya
        </h1>
        <p className="mb-8  font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          At Magneto, we believe every student deserves access to affordable,
          high-quality educational resources. Our platform is designed to
          provide students with the tools they need to succeed, from exam
          preparation to personalized learning paths.
        </p>
        <div className="flex flex-col justify-center md:items-center space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <Link
            href="#"
            className="py-3 px-5 sm:ms-4 text-sm font-medium text-[#350203] bg-[#f8d6b6] border rounded-2xl w-1/3 md:w-auto text-center"
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Jumbotron;
