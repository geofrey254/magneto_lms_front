import React from "react";
import { FaCertificate } from "react-icons/fa6"; // Importing FontAwesome icon for certificate symbol
import Link from "next/link";

import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-[#f9eeea] flex justify-center items-center">
      <div className="container p-8 flex flex-col md:items-center">
        <div className="mb-8">
          <h4 className="font-bold text-4xl md:text-3xl text-[#350203] flex">
            Magneto <FaCertificate className="text-[#350203] cert" size={20} />
          </h4>
          <div className="border-2 border-[#350203] w-1/6 md:w-1/4"></div>
        </div>
        <div className="container text-[#350203] grid grid-cols-1 md:grid-cols-4 mx-auto gap-8  text-sm xl:justify-center">
          {/* About Section */}
          <div>
            <h3 className="font-bold mb-3 md:text-lg">About</h3>
            <p className="text-[#350203ad] mb-2 text-sm">
              Our platform offers high-quality educational content for students,
              including subjects, classes, and exams to help you excel.
            </p>
            <Link href="/about" className="text-[#350203] underline ">
              Learn more about us
            </Link>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="font-bold mb-3 md:text-lg">Resources</h3>
            <ul>
              <li className="mb-2">
                <Link
                  href="/blog"
                  className="text-[#350203ad] hover:text-white"
                >
                  Blog
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/faq" className="text-[#350203ad] hover:text-white">
                  FAQs
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/contact"
                  className="text-[#350203ad] hover:text-white"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-[#350203ad] hover:text-white"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Subjects & Exams Section */}
          <div>
            <h3 className="font-bold mb-3 md:text-lg">Subjects & Exams</h3>
            <ul>
              <li className="mb-2">
                <Link
                  href="/subjects"
                  className="text-[#350203ad] hover:text-white"
                >
                  All Subjects
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/exams"
                  className="text-[#350203ad] hover:text-white"
                >
                  Upcoming Exams
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/guidelines"
                  className="text-[#350203ad] hover:text-white"
                >
                  Exam Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links*/}
          <div>
            <h3 className="font-bold mb-3 md:text-lg">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <Link
                  href="/subjects"
                  className="text-[#350203ad] hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/exams"
                  className="text-[#350203ad] hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/guidelines"
                  className="text-[#350203ad] hover:text-white"
                >
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Legal and Social Links */}
        <div className="container mx-auto mt-10 text-center border-t border-gray-700 pt-6">
          <p className="text-[#350203ad] text-xs">
            &copy; {new Date().getFullYear()} Magneto. All rights reserved.
          </p>
          <ul className="flex justify-center space-x-6 mt-4">
            <li>
              <Link
                href="https://facebook.com"
                className="text-[#350203ad]"
                aria-label="Facebook"
              >
                <RiInstagramFill />
              </Link>
            </li>
            <li>
              <Link
                href="https://twitter.com"
                className="text-[#350203ad] "
                aria-label="Twitter"
              >
                <FaFacebook />
              </Link>
            </li>
            <li>
              <Link
                href="https://twitter.com"
                className="text-[#350203ad] "
                aria-label="Twitter"
              >
                <FaXTwitter />
              </Link>
            </li>
            <li>
              <Link
                href="https://twitter.com"
                className="text-[#350203ad] "
                aria-label="Twitter"
              >
                <FaYoutube />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
