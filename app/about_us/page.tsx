import React from "react";
import Image from "next/image";
import Link from "next/link";

function page() {
  return (
    <section className="overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] bg-white dark:bg-dark">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between -mx-4">
          <div className="w-full px-4 lg:w-6/12">
            <div className="flex items-center -mx-3 sm:-mx-4">
              <div className="w-10/12 px-3 sm:px-4 xl:w-1/2">
                <div className="py-3 sm:py-4">
                  <Image
                    src="https://images.unsplash.com/photo-1620829813947-ef4246827355?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3R1ZGVudHN8ZW58MHwxfDB8fHww"
                    alt=""
                    className="w-full rounded-2xl"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="py-3 sm:py-4">
                  <Image
                    src="https://images.pexels.com/photos/4144228/pexels-photo-4144228.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt=""
                    className="w-10/12 rounded-2xl"
                    width={300}
                    height={300}
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:px-4 xl:w-1/2">
                <div className="relative z-10 my-4">
                  <Image
                    src="https://i.ibb.co/9y7nYCD/image-3.jpg"
                    alt=""
                    className="w-10/12 rounded-2xl"
                    width={300}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
            <div className="mt-10 lg:mt-0">
              <span className="block mb-2 text-base font-semibold text-[#3502038c]">
                Why Choose Magneto
              </span>
              <h2 className="mb-5 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
                Empowering Students, One Lesson at a Time
              </h2>
              <p className="mb-5 text-base text-body-color dark:text-dark-6">
                Magneto is your trusted partner in education, offering
                high-quality, engaging content tailored to the Kenyan high
                school curriculum. We believe every student deserves access to
                tools that make learning simple, interactive, and effective.
              </p>
              <p className="mb-8 text-base text-body-color dark:text-dark-6">
                With Magneto, you get access to expertly crafted lessons,
                interactive quizzes, and progress tracking — all designed to
                help you excel academically and build confidence in your
                studies.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center py-3 text-base font-medium text-center text-black border border-transparent rounded-md px-7 bg-primary hover:bg-opacity-90"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
