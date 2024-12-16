"use client"; // Ensures this code runs in the client environment

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import GoogleSignInButton from "../custom/Googlebtn";
import Link from "next/link";
import { FaCertificate } from "react-icons/fa6";
const initialState = {
  identifier: "",
  password: "",
};

type FormErrorsT = {
  identifier?: string[];
  password?: string[];
  generalError?: string;
};

export function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState<FormErrorsT>({});
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get("callbackUrl") ||
    "/" ||
    `${process.env.NEXT_PUBLIC_WEB_URL}`;
  const router = useRouter();

  // const { setAuthenticated } = useAuth(); // Access auth context to update authentication state

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.identifier,
            password: data.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ generalError: errorData.detail || "Login failed" });
        setLoading(false);
        return;
      }

      const responseData = await response.json();
      const token = responseData.access;

      // Store the token in cookies
      document.cookie = `token=${token}; path=/; max-age=1800; secure; samesite=strict`;

      // Update the authentication state
      // setAuthenticated(true); // Trigger a recheck and update state

      router.push(callbackUrl); // Redirect to callback URL after successful login
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setErrors({ generalError: "An unexpected error occurred" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="p-0">
      <div className="flex flex-col items-center justify-center mx-auto md:h-fit lg:py-24">
        <Link
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <h4 className="font-bold text-4xl md:text-5xl text-[#350203] flex">
            Magneto <FaCertificate className="text-[#350203] cert" size={20} />
          </h4>
        </Link>
        <div className="w-full max-w-md bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              onSubmit={handleSubmit}
              method="post"
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="identifier"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email or username
                </label>
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  required
                  value={data.identifier}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@mail.com"
                />
                {errors?.identifier && (
                  <div className="text-red-700" aria-live="polite">
                    {errors.identifier[0]}
                  </div>
                )}
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={data.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors?.password && (
                  <div className="text-red-700" aria-live="polite">
                    {errors.password[0]}
                  </div>
                )}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex justify-center items-center pt-7 pr-2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
              {errors?.generalError && (
                <div className="text-red-700" aria-live="polite">
                  {errors.generalError}
                </div>
              )}
              <div className="flex items-center justify-self-end">
                <a
                  href="/password/requestreset"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                disabled={loading}
                aria-disabled={loading}
                className="w-full text-white bg-[#350203] hover:bg-[#350203a9] focus:ring-4 focus:outline-none focus:bg-[#35020330] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-2 text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              {/* <GoogleSignInButton /> */}
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Don’t have an account yet?&nbsp;&nbsp;
                <a
                  href="/signup"
                  className="font-medium text-[#72341b] hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
