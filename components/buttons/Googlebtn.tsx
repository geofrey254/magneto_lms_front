"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignInButton() {
  const reachGoogle = () => {
    signIn("google", { callbackUrl: "http://localhost:3000/" }); // Use NextAuth to initiate Google login
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
