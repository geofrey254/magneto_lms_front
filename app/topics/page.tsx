import React from "react";
import Chapters from "./chapters";
import Image from "next/image";
import Link from "next/link";
import { FaCertificate } from "react-icons/fa6";
import Search from "@/components/custom/Search";
import { ViewMoreWrapper } from "@/components/providers/ViewMore";

function page() {
  return (
    <section className="mx-auto w-full pt-16">
      <div>
        <div className="bg-[#350203] courses w-full max-w-full py-8 px-4 md:py-12 md:px-20 grid grid-cols-6 justify-between items-center">
          <div className="text-content col-start-1 col-end-3">
            <nav className="w-full max-w-4xl text-base mb-4 text-white rounded-xl font-light">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">/{"/"}</span>
              <Link href="/Lessons" className="text-[#f8d6b6] font-medium">
                Topics
              </Link>
            </nav>
            <div>
              <h3 className="text-white text-3xl md:text-5xl text-nowrap font-light">
                All Topics
              </h3>
            </div>
          </div>
          <div className="image-content col-end-9 col-span-2 flex items-center gap-0 md:gap-12">
            <div>
              <FaCertificate
                className="text-[#f8d6b6] cert w-6/12 md:w-full"
                size={80}
              />
            </div>
            <div>
              <Image
                src="/img/user.jpg"
                width={350}
                height={350}
                alt="Learning illustration"
                className="w-14 h-14 md:w-40 md:h-40 object-cover border-2 border-[#f8d6b6] rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-12 p-8 md:p-0">
          <Search />
        </div>
        <div className="py-2 px-4 md:py-8">
          <ViewMoreWrapper limits={9}>
            <Chapters />
          </ViewMoreWrapper>
        </div>
      </div>
    </section>
  );
}

export default page;
