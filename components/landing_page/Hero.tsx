import React from "react";
import Link from "next/link";
import { SiBookstack } from "react-icons/si";
import Image from "next/image";
import learn1 from "@/public/img/img1.jpg";
import learn2 from "@/public/img/img2.jpg";

import { FaCertificate } from "react-icons/fa6";

function Hero() {
  return (
    <section className="hero w-full max-w-full px-4 py-8 md:p-12 2xl:p-8 flex justify-center items-center">
      <div className="container grid grid-cols-4 md:flex md:justify-between items-center">
        <div className="col-span-3 flex flex-col gap-6">
          <h2 className="text-6xl md:text-8xl font-bold text-[#350203]">
            Level Up
            <br className="hidden md:flex" /> with{" "}
            <span className="text-transparent magneto_txt flex ">
              Magneto{" "}
              <FaCertificate className="cert text-[#350203]" size={30} />
            </span>
          </h2>
          <p className="text-[#350203] font-semibold md:text-xl">
            Access quality high school learning materials
            <br className="hidden md:flex" /> at an affordable daily fee,
            tailored to the Kenyan curriculum.
            <br className="hidden md:flex" /> Study anytime, anywhere.
          </p>
          <div className="flex justify-between md:justify-start items-center mt-8 gap-6">
            <Link
              href="/"
              className="texty text-nowrap bg-[#f8d6b6] p-3 rounded-xl md:text-xl"
            >
              Start Learning Today
            </Link>
            <Link
              href="#subjects"
              className="texty text-nowrap p-3 flex gap-2 items-center border border-[#f8d6b6] rounded-xl md:text-xl"
            >
              <SiBookstack size={20} className="text-[#350203]" />
              Explore Subjects
            </Link>
          </div>
        </div>
        <div className="hidden md:flex md:gap-6">
          <div className="relative ">
            <Image
              src={learn2}
              width={280}
              alt="student learning"
              style={{
                objectFit: "cover", // cover, contain, none
              }}
              className="hero_image_2 mt-[200px] w-[250px] 2xl:w-[350px]"
            />
            <div className="absolute top-[500px] left-0 bg-[#f8d6b6] w-[150px] h-[150px] circle"></div>
          </div>
          <div className="relative">
            <Image
              src={learn1}
              width={280}
              alt="student learning"
              className="hero_image mb-[200px] w-[250px] 2xl:w-[350px]"
            />
            <div className="absolute top-[0px] left-[130px] 2xl:left-[150px] bg-[#f8d6b6] w-[150px] h-[150px] circle2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
