"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineMenuBook, MdOutlineSupportAgent } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaCertificate } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
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
import { signOut } from "next-auth/react";

function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      console.log("Token refresh failed. Logging out...");
      signOut({ callbackUrl: "/signin" });
    }
  }, [session]);

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

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-[#fbf5f3] transition-transform duration-300 ease-in-out shadow-2xl ${
            menuOpen ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="p-6 flex flex-col gap-6 overflow-y-auto">
            {status === "authenticated" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-[#350203]"
                    />
                  ) : (
                    <div className="p-2 border-2 border-[#350203] rounded-full">
                      <PiStudentFill size={32} className="text-[#350203]" />
                    </div>
                  )}
                  <div className="text-lg font-bold truncate">
                    {session.user?.name}
                  </div>
                </div>
                <hr className="border-[#350203]" />
                <div className="flex flex-col gap-3">
                  <Link
                    href="/magneto/tutor"
                    onClick={handleNav}
                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-[#f8d6b6] transition-colors"
                  >
                    <FaCertificate className="text-[#350203]" size={18} />
                    Magneto AI
                  </Link>
                  <Link
                    href="/billing"
                    onClick={handleNav}
                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-[#f8d6b6] transition-colors"
                  >
                    <MdPayment className="text-[#350203]" size={18} />
                    Subscription
                  </Link>
                  <Link
                    href="/support"
                    onClick={handleNav}
                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-[#f8d6b6] transition-colors"
                  >
                    <MdOutlineSupportAgent
                      className="text-[#350203]"
                      size={18}
                    />
                    Support
                  </Link>
                </div>
              </div>
            )}

            <ul className="flex flex-col gap-2 text-[#350203] font-semibold">
              {[
                { href: "/", label: "Home" },
                { href: "/subjects", label: "Subjects" },
                { href: "/topics", label: "Topics" },
                { href: "/subscription", label: "Pricing" },
                { href: "/about_us", label: "About Us" },
                { href: "/contact_us", label: "Contact Us" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleNav}
                    className="block p-3 rounded-lg hover:bg-[#f8d6b6] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {status === "authenticated" ? (
              <div className="mt-4">
                <hr className="border-[#350203] mb-4" />
                <SignOut />
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  href="/signup"
                  onClick={handleNav}
                  className="bg-[#f8d6b6] hover:bg-[#facba0] text-center py-3 rounded-lg text-[#350203] font-semibold"
                >
                  Join Now
                </Link>
                <Link
                  href="/signin"
                  onClick={handleNav}
                  className="text-center py-3 rounded-lg text-[#350203] font-semibold border-2 border-[#350203] hover:bg-[#f8d6b6] transition-colors"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right side of the Navbar */}
        <div className="flex">
          <div className="hidden md:flex gap-6 justify-center items-center font-semibold text-sm">
            {status == "authenticated" ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    className="focus:outline-none focus:ring-transparent"
                  >
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
