import type { Metadata } from "next";
import "./globals.css";

// Pages
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

// providers
import { AppWrapper } from "@/components/providers/Providers";
import { AuthProvider } from "@/components/providers/AuthProvider";

// types
import { Subject, Chapter } from "@/types/types";

export const metadata: Metadata = {
  title: "Magneto - Unlock Learning, One Day at a Time",
  description:
    "Magneto is an innovative learning platform for high school students in Kenya, providing easy access to quality educational materials at an affordable daily cost. Discover video lessons, notes, and quizzes tailored to your curriculum. Pay only for the days you use and enhance your learning experience with Magneto today!",
};

// fetch subjects
async function fetchSubjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subjects/`, {
      cache: "force-cache",
      next: { revalidate: 1 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch subjects");
    }

    const subjects: Subject[] = await res.json();
    console.log("Success Subs");
    return subjects;
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return [];
  }
}

// fetch chapters
async function fetchTopics() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chapters/`, {
      cache: "force-cache",
      next: { revalidate: 1 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch subjects");
    }

    const chapters: Chapter[] = await res.json();
    console.log("Success Chaps");

    return chapters.reverse();
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return [];
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const subjects = await fetchSubjects();
  const chapters = await fetchTopics();
  return (
    <html lang="en">
      <AuthProvider>
        <body className="font-Poppins font-medium">
          <Navbar />
          <AppWrapper subjects={subjects} chapters={chapters}>
            {children}
          </AppWrapper>
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
