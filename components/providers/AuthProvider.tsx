"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { z } from "zod";

// Schema for validation using Zod
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

interface AuthContextType {
  data: { identifier: string; password: string };
  setData: React.Dispatch<
    React.SetStateAction<{ identifier: string; password: string }>
  >;
  formErrors: Partial<SignUpFormData>;
  serverError: string | null;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => Promise<void>;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState = {
  identifier: "",
  password: "",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(initialState);
  const [serverError, setServerError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<SignUpFormData>>({});
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/check");
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      } catch (error) {
        console.error("Failed to check authentication", error);
      }
    };

    checkAuth();
  }, []);

  // Helper function to check if password is similar to the email
  const isPasswordSimilarToEmail = (password: string, email: string) =>
    password.includes(email.split("@")[0]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle login submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) throw new Error("API URL is not configured");

      const response = await fetch(`${apiUrl}/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: data.identifier,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      console.log("Logged in successfully");
      setIsAuthenticated(true);
      await router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      setServerError("Login failed. Please check your credentials.");
    }
  };

  // Handle sign-up submission
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: SignUpFormData = {
      username: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      confirmPassword: e.currentTarget.confirmPassword.value,
    };

    // Validate form data
    const validation = SignUpSchema.safeParse(formData);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      const transformedErrors: Partial<SignUpFormData> = Object.fromEntries(
        Object.entries(errors).map(([key, value]) => [key, value?.join(", ")])
      );
      setFormErrors(transformedErrors);
      return;
    }

    // Check if password is too similar to email
    if (isPasswordSimilarToEmail(formData.password, formData.email)) {
      setServerError("The password is too similar to the email address.");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) throw new Error("API URL is not configured");

      const response = await fetch(`${apiUrl}/auth/registration/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password1: formData.password,
          password2: formData.confirmPassword,
        }),
      });

      if (response.ok) {
        console.log("User registered successfully");
        router.push("/signin");
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setServerError(
          errorData.message || "Cannot sign up, please try again."
        );
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setServerError("An unexpected error occurred. Please try again.");
    }
  };

  // token
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to log out");
      }

      console.log("Logged out successfully");
      setIsAuthenticated(false);
      await router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      setServerError("Logout failed. Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        data,
        setData,
        formErrors,
        serverError,
        handleSubmit,
        handleChange,
        handleSignUp,
        handleLogout,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
