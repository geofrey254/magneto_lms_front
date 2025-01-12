import React from "react";
import Link from "next/link";
import { Chapter } from "@/types/types";
import { FaCertificate } from "react-icons/fa6";

// latestchapters
import Latest from "../sidebar/latest";
import Share from "../sidebar/share";
import AIAgentSidebar from "../sidebar/AIAgentSidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

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
    <section className="relative isolate mx-auto bg-[#fcf4ec] w-full max-w-screen-xl flex flex-col justify-center items-center py-16 overflow-hidden">
      <div
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="mx-auto aspect-[1155/678] w-full h-screen bg-gradient-to-tr from-[#ff80b5] to-[#350203] opacity-60"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
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
            {/* <div dangerouslySetInnerHTML={{ __html: lesson.lesson_content }} /> */}
            <ReactMarkdown
              className="markdown-content flex flex-col gap-2"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ ...props }) => (
                  <h1 className="text-2xl font-bold mb-2" {...props} />
                ),
                h2: ({ ...props }) => (
                  <h2 className="text-xl font-semibold mb-2" {...props} />
                ),
                h3: ({ ...props }) => (
                  <h3 className="text-lg font-medium mb-1" {...props} />
                ),
                p: ({ ...props }) => (
                  <p
                    className="text-base md:text-sm leading-relaxed mb-2 tracking-wider"
                    {...props}
                  />
                ),
                ul: ({ ...props }) => (
                  <ul
                    className="list-disc list-inside mt-4 mb-2 ml-4"
                    {...props}
                  />
                ),
                ol: ({ ...props }) => (
                  <ol
                    className="list-decimal list-inside mb-2 ml-4"
                    {...props}
                  />
                ),
                li: ({ ...props }) => (
                  <li className="mb-1 text-base md:text-sm " {...props} />
                ),
                blockquote: ({ ...props }) => (
                  <blockquote
                    className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-2"
                    {...props}
                  />
                ),
                code: ({ inline, ...props }) =>
                  inline ? (
                    <code
                      className="bg-gray-100 text-red-600 px-1 py-0.5 rounded"
                      {...props}
                    />
                  ) : (
                    <pre className="bg-gray-800 text-white p-2 rounded mb-2 text-pretty text-sm md:text-base">
                      <code {...props} />
                    </pre>
                  ),
                strong: ({ ...props }) => (
                  <strong className="font-bold" {...props} />
                ),
                em: ({ ...props }) => <em className="italic " {...props} />,
              }}
            >
              {lesson.lesson_content}
            </ReactMarkdown>
          </div>
        </div>
        <div className="md:col-span-4 py-8 md:py-0 md:px-2 flex flex-col gap-6">
          <div>
            <AIAgentSidebar />
          </div>
          <div>
            <Latest />
          </div>
          <div>
            <Share />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopicPage;
