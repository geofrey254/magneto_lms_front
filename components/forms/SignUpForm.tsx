"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import PendingSubmitButton from "../custom/PendingSubmitButton";
// import GoogleSignInButton from "../custom/Googlebtn";
// import GoogleSignInError from "../custom/GoogleSignInError";
import { useAuth } from "../providers/AuthProvider";
import GoogleSignInButton from "../buttons/Googlebtn";

type FormErrorsT = {
  identifier?: string[];
  password?: string[];
  generalError?: string;
};

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errors, setErrors] = useState<FormErrorsT>({});
  const { handleChange, handleSignUp, formErrors, serverError } = useAuth();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); // Clear any previous errors
    try {
      await handleSignUp(e);
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ generalError: error.message });
      }
    }
  };

  return (
    <div className="w-full md:py-24 bg-white md:bg-transparent md:px-12 xl:px-24">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create an account
        </h1>
        <form
          className="space-y-4 md:space-y-2 xl:space-y-6"
          onSubmit={handleFormSubmit}
        >
          <div className="mb-3">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formErrors.username && (
              <p className="text-red-700">{formErrors.username}</p>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formErrors.email && (
              <p className="text-red-700">{formErrors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-3 relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password *
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pt-8 pr-2"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
            {formErrors.password && (
              <p className="text-red-700">{formErrors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-3 relative">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Re-enter Password *
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 pt-8 pr-2"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
            {formErrors.confirmPassword && (
              <p className="text-red-700">{formErrors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-[#350203] hover:bg-[#350203a9] focus:ring-4 focus:outline-none focus:bg-[#35020330] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Create an account
          </button>

          {serverError && <p className="text-red-700">{serverError}</p>}

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <GoogleSignInButton />
          {/* <GoogleSignInError /> */}

          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Already have an account?&nbsp;
            <a
              href="/signin"
              className="font-medium text-[#261b72] hover:underline"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
