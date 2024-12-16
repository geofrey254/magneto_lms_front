"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PendingSubmitButton from "../custom/PendingSubmitButton";
import GoogleSignInButton from "../custom/Googlebtn";
import GoogleSignInError from "../custom/GoogleSignInError";
import { useAuth } from "../Providers";

// Zod schema for validation
const SignUpSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const { setAuthenticated, setToken } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<SignUpFormData>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const isPasswordSimilarToEmail = (password: string, email: string) => {
    return password.includes(email.split("@")[0]);
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Create form data
    const formData: SignUpFormData = {
      username: event.currentTarget.username.value,
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
      confirmPassword: event.currentTarget.confirmPassword.value,
    };

    // Validate form data with Zod
    const validation = SignUpSchema.safeParse(formData);
    if (!validation.success) {
      // Set validation errors if any
      const errors = validation.error.flatten().fieldErrors;
      const transformedErrors: Partial<SignUpFormData> = Object.fromEntries(
        Object.entries(errors).map(([key, value]) => [key, value?.join(", ")])
      );
      setFormErrors(transformedErrors);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/registration/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password1: formData.password,
            password2: formData.confirmPassword,
          }),
        }
      );

      if (response.ok) {
        // Handle success
        const responseData = await response.json();
        const token = responseData.access;
        document.cookie = `token=${token}; path=/; max-age=1800; secure; samesite=strict`;
        setAuthenticated(true);
        setToken(token);
        router.push("/");
      } else {
        const errorData = await response.json();
        console.log("Error response:", errorData); // Log the error for more insights
        setServerError(
          errorData.message || "Cannot sign up, please try again."
        );
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setServerError("An unexpected error occurred. Please try again.");
    }

    if (isPasswordSimilarToEmail(formData.password, formData.email)) {
      setServerError("The password is too similar to the email address.");
      return; // Prevent form submission
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow dark:border sm:max-w-md p-8 md:p-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create an account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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

          <PendingSubmitButton />

          {serverError && <p className="text-red-700">{serverError}</p>}

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <GoogleSignInButton />
          <GoogleSignInError />

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
