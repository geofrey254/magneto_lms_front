"use client";
import React, { useState } from "react";
import { MdOutlineMenuBook, MdOutlineSupportAgent } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaCertificate, FaMoneyCheck, FaSchool } from "react-icons/fa6";
import { TbBooks, TbListTree } from "react-icons/tb";
import Link from "next/link";
import Image from "next/image";
import { LiaSchoolSolid } from "react-icons/lia";
import { GiTalk } from "react-icons/gi";
import { useSession } from "next-auth/react";
import SignOut from "../buttons/SignOut";
import { useRouter } from "next/navigation";

import { PiStudentFill } from "react-icons/pi";
import { MdPayment } from "react-icons/md";

// imports

// shadcn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed bg-[#fbf5f3] z-50 h-[4vh] w-full flex justify-center items-center py-8 px-4 md:px-12 border-b border-[#350203]">
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
              <Link href="/topics">Topics</Link>
            </li>
            <li>
              <Link href="/subscription">Pricing</Link>
            </li>
            <li>
              <Link href="/about_us">About Us</Link>
            </li>
            <li>
              <Link href="/contact_us">Contact Us</Link>
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
            {status == "authenticated" ? (
              <ul className="flex mt-6 px-4 justify-between">
                <li>
                  <Link
                    href="/dashboard"
                    onClick={handleNav}
                    className="text-[#f8d6b6] border-2 border-[#f8d6b6] px-8 py-2 rounded-2xl"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <SignOut />
                </li>
              </ul>
            ) : (
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
            )}
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
            <li className="flex gap-4 justify-start items-center">
              <div className="bg-[#f8d6b6] rounded-full p-2">
                <TbListTree size={15} className="text-[#350203]" />
              </div>
              <Link href="/topics" onClick={handleNav}>
                Topics
              </Link>
            </li>
            <li className="flex gap-4 items-center">
              <div className="bg-[#f8d6b6] rounded-full p-2">
                <FaMoneyCheck size={15} className="text-[#350203]" />
              </div>
              <Link href="/subjects" onClick={handleNav}>
                Pricing
              </Link>
            </li>
            <li className="flex gap-4 justify-start items-center">
              <div className="bg-[#f8d6b6] rounded-full p-2">
                <LiaSchoolSolid size={15} className="text-[#350203]" />
              </div>
              <Link href="/about_us" onClick={handleNav}>
                About Us
              </Link>
            </li>
            <li className="flex gap-4 items-center">
              <div className="bg-[#f8d6b6] rounded-full p-2">
                <GiTalk size={15} className="text-[#350203]" />
              </div>
              <Link href="/contact_us" onClick={handleNav}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Right side of the Navbar */}
        <div className="flex">
          <div className="hidden md:flex gap-6 justify-center items-center font-semibold text-sm">
            {status == "authenticated" ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {session?.user.image ? (
                      <button>
                        <Image
                          src={session.user.image}
                          alt={`${session.user.name}'s profile`}
                          width={35}
                          height={35}
                          className="rounded-full border-2 border-[#350203]"
                        />
                      </button>
                    ) : (
                      <button className="border-2 border-[#350203] p-2 rounded-full">
                        <PiStudentFill size={20} className=" text-[#350203]" />
                      </button>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 rounded-2xl bg-blur">
                    <DropdownMenuLabel className="">
                      {session?.user.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-[#350203]" />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => {
                          router.push("/magneto/tutor");
                        }}
                        className="cursor-pointer"
                      >
                        Magneto AI
                        <DropdownMenuShortcut>
                          <FaCertificate size={15} className="cert" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          router.push("/billing");
                        }}
                        className="cursor-pointer"
                      >
                        Subscription
                        <DropdownMenuShortcut>
                          <MdPayment size={16} />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer">
                        Support
                        <DropdownMenuShortcut>
                          <MdOutlineSupportAgent size={15} />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-[#350203]" />
                    <DropdownMenuItem>
                      <SignOut />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
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
            )}
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
