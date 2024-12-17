"use client";
import SignUpForm from "./SignUpForm";
import Image from "next/image";

export default function SignUp() {
  return (
    <section className="w-full pt-16 md:pt-0">
      <div className="grid grid-cols-1 md:grid-cols-2 p-8 md:p-0">
        <div className="bg-sign hidden md:flex md:flex-col justify-center items-center gap-2 md:gap-0 p-4 md:p-0">
          <div>
            <Image
              src="/img/lap.png"
              alt="laptop screen"
              width={350}
              height={350}
              quality={100}
              className="w-10/12 md:w-[300px] xl:w-[400px]"
            />
          </div>
          <div className="md:mt-8 text-center">
            <h3 className="text-white font-light text-lg md:text-3xl xl:text-5xl">
              Welcome to <span className="font-semibold">Magneto</span>
            </h3>
            <p className="text-white font-normal text-xs md:text-sm xl:text-base mt-3">
              Learn Your Way, Every Day – Quality Education, Only When You Need
              It!
            </p>
          </div>
        </div>

        <SignUpForm />
      </div>
    </section>
  );
}
