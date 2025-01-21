import type { Metadata } from "next";
import "./globals.css";

// Pages
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

// providers
import { AppWrapper } from "@/components/providers/Providers";
import { Providers } from "@/components/providers/SessionProvider";
// types

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

    const data = await res.json();
    const subjects = data.results; // Access the `results` key

    if (!Array.isArray(subjects)) {
      console.error("Chapters response is not an array:", subjects);
      return [];
    }

    return subjects.reverse(); // Reverse the array if needed
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return [];
  }
}

// fetch chapters
async function fetchTopics(page: number, pageSize: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chapters/?page=${page}&page_size=${pageSize}`,
      {
        cache: "force-cache",
        next: { revalidate: 1 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch chapters");
    }

    const data = await res.json();
    const chapters = data.results; // Access the `results` key

    if (!Array.isArray(chapters)) {
      console.error("Chapters response is not an array:", chapters);
      return { chapters: [], totalPages: 1 };
    }

    // Calculate the total pages based on the count of chapters and pageSize
    const totalPages = Math.ceil(data.count / pageSize);

    return { chapters, totalPages }; // Return both the chapters and total pages
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return { chapters: [], totalPages: 1 };
  }
}

async function fetchSubscriptions() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subscription_plan/`,
      {
        cache: "force-cache",
        next: { revalidate: 1 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch subscriptions");
    }

    const data = await res.json();
    const subscriptions = data.results;
    return subscriptions;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return [];
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const page = 1; // Default to the first page (You can dynamically adjust this in a more complex setup)
  const pageSize = 6; // Default to 6 chapters per page (You can dynamically adjust this in a more complex setup)

  const subjects = await fetchSubjects();
  const { chapters, totalPages } = await fetchTopics(page, pageSize);
  const subscriptions = await fetchSubscriptions();
  return (
    <html lang="en">
      <body className="font-Poppins font-medium">
        <Providers>
          <Navbar />
          <AppWrapper
            subjects={subjects}
            chapters={chapters}
            subscriptions={subscriptions}
            totalPages={totalPages}
          >
            {children}
          </AppWrapper>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
