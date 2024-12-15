import React from "react";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMailUnread } from "react-icons/io";

function page() {
  return (
    <section
      className="contact bg-[#f3e8de] w-full max-w-full px-4 pt-20 pb-6 md:p-16 md:pt-24 xl:px-24 2xl:p-24 "
      id="cont"
    >
      <div className="container grid grid-cols-2 md:grid-cols-2 md:gap-36 xl:gap-24 mx-auto items-center">
        <div className="left ">
          <div className="mb-12 text-left md:text-left">
            <div className="flex gap-4 items-center">
              <h4 className="text-[#350203] mb-1 md:mb-1 font-semibold">
                CONTACT US
              </h4>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold">
              We{"'"}re Here to Help You Succeed
            </h2>
            <p className="mt-4">
              At Magneto, we are committed to helping high school students excel
              in their studies with quality educational content. Whether you
              {"'"}re looking for study materials, personalized assistance, or
              have any questions about our offerings, we{"'"}re here for you.
              Reach out to us for support or inquiries—we{"'"}re excited to
              assist you on your learning journey.
            </p>
          </div>
          <hr className="border-[#350203]" />
          <div className="grid gap-6 md:flex md:gap-12 items-center mt-12">
            <div className="link_1 flex items-center gap-6 bg-white p-4 md:p-4 xl:p-4 rounded-xl">
              <FaPhoneAlt
                size={50}
                className="bg-[#350203] text-white p-2 rounded-xl shadow-2xl shadow-[#350203]"
              />
              <div className="">
                <h6 className="md:text-sm">Call Us On:</h6>
                <Link href="#" className="font-bold text-nowrap text-md">
                  +254742 954513
                </Link>
              </div>
            </div>
            <div className="link_2 flex items-center gap-6 bg-white p-4 md:p-4 xl:p-4 rounded-xl">
              <IoIosMailUnread
                size={50}
                className="bg-[#350203] text-white p-2 rounded-xl shadow-2xl shadow-[#350203]"
              />
              <div className="">
                <h6 className="md:text-sm">Send Us an Email:</h6>
                <Link href="#" className="font-bold text-md">
                  support@Magneto.com
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="right ">
          <h4 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Get In Touch With Us
          </h4>
          <form action="" className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                className="h-12 rounded-2xl p-8"
                placeholder="Your Name"
              />
              <input
                type="email"
                className="h-12 rounded-2xl p-8"
                placeholder="Your Email"
              />
              <input
                type="text"
                className="h-12 rounded-2xl p-8"
                placeholder="Subject"
              />
              <input
                type="tel"
                className="h-12 rounded-2xl p-8"
                placeholder="Your Phone Number"
              />
            </div>
            <textarea
              className="block w-full rounded-2xl h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 md:h-48"
              name="message"
              placeholder="How can we assist you?"
            ></textarea>
            <button className="mt-8 bg-[#350203] w-full p-2 rounded-3xl text-white font-bold">
              Submit Your Inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default page;
