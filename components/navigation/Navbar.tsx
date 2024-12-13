"use client";
import React, { useState } from "react";
import { MdOutlineMenuBook } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaCertificate, FaSchool } from "react-icons/fa6";
import { TbBooks } from "react-icons/tb";
import Link from "next/link";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(true);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="h-[4vh] w-full flex justify-center items-center py-8 px-4 md:px-12">
      <div className="container flex justify-between items-center">
        {/* Branding Section */}
        <div>
          <Link href="/">
            <h4 className="font-bold text-2xl text-[#350203] flex">
              Magneto <FaCertificate className="text-[#350203]" size={20} />
            </h4>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <ul className="flex gap-8 2xl:gap-12 items-center text-[#350203] font-bold text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/subjects">Subjects</Link>
            </li>
            <li>
              <Link href="/Lessons">Lessons</Link>
            </li>
            <li>
              <Link href="/subscription">Pricing</Link>
            </li>
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <div
          className={
            menuOpen
              ? "collapse fixed w-0 h-[100%] left-4 top-[2000px] transition-all duration-700 ease-in-out md:hidden"
              : "fixed mobile_nav w-[90%] left-4 top-16 h-[100%] z-10 transition-all duration-700 ease-linear rounded-3xl shadow-xl shadow-[#8a6445] md:hidden"
          }
        >
          <div className="flex flex-col gap-6 text-[#f8d6b6]">
            <ul className="flex mt-6 px-4 justify-between">
              <li>
                <Link
                  href="/signin"
                  onClick={handleNav}
                  className="text-[#f8d6b6] border-2 border-[#f8d6b6] px-8 py-2 rounded-2xl"
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  onClick={handleNav}
                  className="bg-[#f8d6b6] hover:bg-[#facba0] rounded-2xl px-4 py-2 text-[#350203]"
                >
                  Join Now
                </Link>
              </li>
            </ul>
            <hr />
          </div>

          {/* Mobile Navigation Links */}
          <ul className="flex flex-col text-lg gap-y-14 mt-8 p-4 text-[#f8d6b6] font-semibold">
            <li className="flex gap-4 justify-start items-center">
              <div className="bg-[#f8d6b6] rounded-full p-2">
                <FaSchool size={15} className="text-[#350203]" />
              </div>
              <Link href="/" onClick={handleNav}>
                Home
              </Link>
            </li>
            <li className="flex gap-4 items-center">
              <div className="bg-[#f8d6b6] rounded-full p-2">
                <TbBooks size={15} className="text-[#350203]" />
              </div>
              <Link href="/subjects" onClick={handleNav}>
                Subjects
              </Link>
            </li>
          </ul>
        </div>

        {/* Right side of the Navbar */}
        <div className="flex">
          <div className="hidden md:flex gap-6 justify-center items-center font-semibold text-sm">
            <>
              <Link
                href="/signup"
                className="bg-[#f8d6b6] hover:bg-[#facba0] rounded-2xl px-4 py-2 text-[#350203]"
              >
                Join Now
              </Link>
              <Link href="/signin" className="text-[#350203]">
                Log In
              </Link>
            </>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="mobile-menu md:hidden" onClick={handleNav}>
            <BiSolidFoodMenu
              size={30}
              className={
                menuOpen
                  ? "text-[#350203] cursor-pointer transition-all duration-700 ease-in-out"
                  : "hidden transition-all duration-700 ease-in-out"
              }
            />
            <MdOutlineMenuBook
              size={30}
              className={
                !menuOpen
                  ? "text-[#350203] cursor-pointer transition-all duration-700 ease-in-out"
                  : "hidden transition-all duration-700 ease-in-out"
              }
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
