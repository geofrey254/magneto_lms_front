import { signOut } from "next-auth/react";

function SignOut() {
  return (
    <button
      className="bg-white flex justify-center items-center gap-4 border border-zinc-300 hover:bg-[#3502033b] hover:text-[#350203] px-4 md:px-8 py-2 rounded-2xl w-full text-zinc-700"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}

export default SignOut;
