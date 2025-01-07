import { signOut } from "next-auth/react";
import { RiLogoutCircleRLine } from "react-icons/ri";

function SignOut() {
  return (
    <button
      className="text-[#350203] flex gap-3 justify-center items-center"
      onClick={() => signOut()}
    >
      <span>
        <RiLogoutCircleRLine size={20} />
      </span>
      Sign Out
    </button>
  );
}

export default SignOut;
