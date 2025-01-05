"use client"; // Ensures this code runs in the client environment

// import GoogleSignInButton from "../custom/Googlebtn";
import { FaCertificate } from "react-icons/fa6";

// providers
import GoogleSignInButton from "../buttons/Googlebtn";

export function SigninForm() {
  return (
    <section className="p-0">
      <div className="flex flex-col items-center justify-center mx-auto md:h-fit lg:py-24">
        <div className="p-8">
          {" "}
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
        </div>
        <div className="w-full max-w-md bg-white rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
            <h4 className="font-bold text-4xl md:text-3xl text-[#350203] flex justify-center gap-2">
              Magneto{" "}
              <FaCertificate className="text-[#350203] cert" size={20} />
            </h4>

            <GoogleSignInButton />
          </div>
        </div>
      </div>
    </section>
  );
}
