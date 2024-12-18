import React from "react";
import Link from "next/link";
import { Chapter } from "@/types/types";
import { FaCertificate } from "react-icons/fa6";

// latestchapters
import Latest from "../sidebar/latest";
import Related from "../sidebar/related";

// Fetch all chapter slugs for static paths generation
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chapters`, {
    next: { revalidate: 1 },
    cache: "force-cache",
  });
  const data = await res.json();

  return data.map((lesson: Chapter) => ({
    slug: lesson.slug, // Ensure your API returns a slug
  }));
}

// Lesson Page Component
async function TopicPage({ params }: Chapter) {
  const { slug } = await params; // Get slug from URL params

  // Fetch the chapter data for the given slug
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/content?slug=${slug}`,
    {
      next: { revalidate: 1 },
    }
  );
  const data = await res.json();
  const lesson = data.length > 0 ? data[0] : null;

  // Handle case when lesson is not found
  if (!lesson) {
    return <div>Chapter not found</div>;
  }

  return (
    <section className="mx-auto bg-[#fcf4ec] w-full max-w-screen-xl flex flex-col justify-center items-center py-16 overflow-hidden">
      <div className="bg-[#350203] w-full max-w-screen-xl py-8 px-4 sm:px-6 md:py-12 md:px-20 grid grid-cols-1 md:grid-cols-6 justify-between items-center">
        <div className="text-content col-span-5">
          <nav className="w-full text-sm mb-4 text-white rounded-xl font-light">
            <Link href="/" className="">
              Home
            </Link>
            <span className="mx-2">/{"/"}</span>
            <Link href="/topics" className="font-light">
              Topics
            </Link>
            <span className="mx-2">/{"/"}</span>
            <Link href="/" className="text-[#f8d6b6] font-medium">
              {slug}
            </Link>
          </nav>
          <h3 className="text-white text-xl md:text-3xl font-semibold uppercase">
            {slug}
          </h3>
        </div>
        <div className="image-content col-span-1 hidden md:flex items-center">
          <FaCertificate
            className="text-[#f8d6b6] cert max-w-xs md:max-w-full"
            size={100}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 py-4 px-4 sm:px-6 md:py-24 md:px-8">
        <div className="bg-white md:col-span-8 rounded-xl border-2 border-[#350203] p-6 overflow-hidden">
          {/* Lesson Overview */}
          <div className="w-full">
            <h2 className="text-[#350203] text-xl font-bold mb-2">
              Lesson Overview
            </h2>
            {lesson.description && (
              <p className="text-[#350203] text-lg">{lesson.description}</p>
            )}
          </div>
          {/* Lesson Content */}
          <div className="text-[#350203] prose prose-img:w-full prose-p:text-[#350203] prose-headings:text-[#350203] prose-strong:text-[#350203]">
            <div dangerouslySetInnerHTML={{ __html: lesson.lesson_content }} />
          </div>
        </div>
        <div className="md:col-span-4 px-2 flex flex-col gap-6">
          <div>
            <Related subjectSlug={lesson.subject?.slug} />
          </div>
          <div>
            <Latest />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopicPage;
