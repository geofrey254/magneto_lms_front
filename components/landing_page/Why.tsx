import React from "react";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { SiReadthedocs } from "react-icons/si";
import { PiCertificateFill } from "react-icons/pi";

function Why() {
  return (
    <section className="jumbotron bg-[#f9eeea] w-full px-4 py-8 xl:px-20 flex justify-center">
      <div className="container bg-[#350203] w-full p-8 rounded-xl gap-12 md:gap-5">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h3 className="text-[#f8d6b6] text-4xl md:text-4xl font-extrabold mb-4">
            How it Works!
          </h3>
          <p className="text-[#fce3cc] md:text-lg">
            At Magneto, we{"'"}ve made accessing quality education easy and
            affordable. Follow these simple steps to enhance your learning
            experience!
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-x-24 md:gap-y-12 md:space-y-0">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#f8d6b6]">
              <RiAccountPinCircleLine size={30} />
              <h4 className="text-base">Sign Up for Free</h4>
            </div>
            <p className="text-white/65 text-sm leading-7">
              Create an account to get started. It{"'"}s quick, easy, and free
              to sign up.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#f8d6b6]">
              <BsCashCoin size={30} />
              <h4 className="text-base">Pay a Small Daily Fee</h4>
            </div>
            <p className="text-white/65 text-sm leading-7">
              To access our premium learning content, pay a small daily fee of
              Kes 40 using your preferred payment method.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#f8d6b6]">
              <SiReadthedocs size={30} />
              <h4 className="text-base">Access High-Quality Content</h4>
            </div>
            <p className="text-white/65 text-sm leading-7">
              Browse through a wide range of subjects and materials including
              video lessons, notes, and quizzes {"-"} all designed to help you
              excel.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#f8d6b6]">
              <PiCertificateFill size={30} />
              <h4 className="text-base">Achieve Academic Success</h4>
            </div>
            <p className="text-white/65 text-sm leading-7">
              With Magneto{"'"}s wide range of learning resources, you{"'"}ll be
              fully equipped to excel in your studies and achieve your academic
              goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Why;
