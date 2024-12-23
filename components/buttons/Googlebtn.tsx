"use client";

import { FcGoogle } from "react-icons/fc";

const googleLoginUrl = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL;

export default function GoogleSignInButton() {
  const reachGoogle = () => {
    window.location.replace(`${googleLoginUrl}`);
  };
  return (
    <button
      className="bg-white flex justify-center items-center gap-4 border border-zinc-300 hover:bg-[#3502033b] hover:text-[#350203] px-4 md:px-8 py-2 rounded-2xl w-full text-zinc-700"
      onClick={reachGoogle}
    >
      <span className="text-red-700 mr-2">
        <FcGoogle size={30} />
      </span>
      Sign in with Google
    </button>
  );
}
