"use client";

import { FcGoogle } from "react-icons/fc";

const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:8000/user/dj-rest-auth/google/callback/&prompt=consent&response_type=code&client_id=401225312513-7l6mmaaees3vb9brjcfbtqac01bob1tv.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=offline`;

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
