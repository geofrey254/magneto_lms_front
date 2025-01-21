"use client";

import React, { use } from "react";
import Link from "next/link";
import { Lesson } from "@/types/types";
import { FaCertificate } from "react-icons/fa6";
import Latest from "../sidebar/latest";
import Share from "../sidebar/share";
import AIAgentSidebar from "../sidebar/AIAgentSidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import useSWR from "swr";

import SubscriptionPrompt from "@/components/custom/SubscriptionPrompt";
import { useSubscription } from "@/hooks/useSubscription";

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

const fetcher = async (url: string) => {
  const res = await fetch(url, { method: "GET", credentials: "include" });
  const data = await res.json();
  console.log("Fetched data:", data); // Log the fetched data
  return data[0];
};

const TopicPage: React.FC<TopicPageProps> = ({ params }) => {
  const { slug } = use(params); // Unwrap `params` Promise

  // Fetch subscription details (Optional: Refactor this into SWR as well)
  const { isSubscribed, loading } = useSubscription();

  // SWR to fetch lesson data
  const {
    data: lesson,
    error,
    isLoading,
  } = useSWR<Lesson>(
    isSubscribed?.verified && slug
      ? `${process.env.NEXT_PUBLIC_API_URL}/content/?slug=${slug}`
      : null, // Conditional fetching
    fetcher
  );

  // Loading state
  if (loading || isLoading) {
    return (
      <div className="w-full bg-[#350203] h-screen flex justify-center items-center">
        <h4 className="font-bold text-7xl text-white flex">
          <FaCertificate className="text-white cert" size={100} />
        </h4>
      </div>
    );
  }

  // Subscription validation
  if (!isSubscribed?.verified) {
    return (
      <div className="w-full bg-[#f8d6b6] h-screen flex justify-center items-center">
        <SubscriptionPrompt />
      </div>
    );
  }

  // Lesson not found
  if (error || !lesson) {
    return <div>Lesson not found.</div>;
  }

  // Render page
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
            <Link href="/">Home</Link>
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
            <ReactMarkdown
              className="markdown-content flex flex-col gap-2"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
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
};

export default TopicPage;
