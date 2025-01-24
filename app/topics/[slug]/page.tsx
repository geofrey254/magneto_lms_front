"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Lesson } from "@/types/types";
import { FaCertificate, FaRobot } from "react-icons/fa6";
import Latest from "../sidebar/latest";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import useSWR from "swr";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import Dialog from "@/components/custom/Dialog";
import { Message } from "@/types/types";

import SubscriptionPrompt from "@/components/custom/SubscriptionPrompt";
import { useSubscription } from "@/hooks/useSubscription";

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

const fetcher = async (url: string) => {
  const res = await fetch(url, { method: "GET", credentials: "include" });
  const content = await res.json();
  const data = content.results;
  console.log("Fetched data:", data); // Log the fetched data
  return data[0];
};

const TopicPage: React.FC<TopicPageProps> = ({ params }) => {
  const { slug } = use(params); // Unwrap `params` Promise

  // Fetch subscription details (Optional: Refactor this into SWR as well)
  const { isSubscribed, loading } = useSubscription();
  // const [showAIDialog, setShowAIDialog] = useState(false);

  // ai assistant states
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);

  const [aiMessages, setAiMessages] = useState<Message[]>([]);
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiError, setAIError] = useState<string | null>(null);

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
      <div className="w-full min-h-screen bg-gradient-to-b from-[#f8d6b6] to-[#350203]/10 flex justify-center items-center p-4">
        <SubscriptionPrompt />
      </div>
    );
  }

  // Lesson not found
  if (error || !lesson) {
    return (
      <div className="w-full min-h-screen bg-[#fcf4ec] flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl font-bold text-[#350203]">Lesson Not Found</h2>
        <Link
          href="/topics"
          className="px-6 py-3 bg-[#350203] text-white rounded-lg hover:bg-[#4a1717] transition-colors"
        >
          Browse Topics
        </Link>
      </div>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(lesson.lesson_content);
  // Render page
  return (
    <section className="relative isolate mx-auto bg-[#fcf4ec] w-full min-h-screen flex flex-col justify-center items-center py-8 md:py-16 overflow-hidden">
      {/* Floating AI Button */}
      <motion.button
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-xl 
                   bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700
                   transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Open AI Assistant"
        onClick={() => setIsAIDialogOpen(!isAIDialogOpen)} // Add click handler
      >
        <FaRobot className="text-white text-2xl" />
      </motion.button>

      {/* Dialog Component */}
      {isAIDialogOpen && (
        <Dialog
          onClose={() => setIsAIDialogOpen(false)}
          messages={aiMessages}
          setMessages={setAiMessages}
          isLoading={isAILoading}
          setIsLoading={setIsAILoading}
          error={aiError}
          setError={setAIError}
        />
      )}
      {/* Animated Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-tr from-[#ff80b5]/10 to-[#350203]/10"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.header
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#350203] rounded-2xl shadow-2xl mb-6 md:mb-12 p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <nav className="flex items-center space-x-2 text-sm text-white/90 mb-4">
                <Link
                  href="/"
                  className="hover:text-[#f8d6b6] transition-colors"
                >
                  Home
                </Link>
                <span className="text-[#f8d6b6]">/</span>
                <Link
                  href="/topics"
                  className="hover:text-[#f8d6b6] transition-colors"
                >
                  Topics
                </Link>
                <span className="text-[#f8d6b6]">/</span>
                <span className="text-[#f8d6b6] font-medium truncate">
                  {lesson.title}
                </span>
              </nav>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {lesson.title}
              </h1>
            </div>
            <div className="w-24 h-24 rounded-full bg-[#f8d6b6]/10 hidden md:flex items-center justify-center border-4 border-[#f8d6b6]/30">
              <FaCertificate className="text-4xl text-[#f8d6b6] animate-pulse" />
            </div>
          </div>
        </motion.header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          {/* Lesson Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 h-[calc(120vh-200px)] overflow-y-auto pr-4 rounded-2xl scrollbar-hover"
          >
            <div className="bg-white rounded-2xl p-6 md:p-8">
              <div
                className="prose prose-lg max-w-none 
                prose-headings:text-[#350203] prose-headings:font-semibold
                prose-p:text-[#350203]/90 prose-p:leading-relaxed
                prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-[#350203]
                prose-blockquote:border-l-4 prose-blockquote:border-[#350203] prose-blockquote:pl-4
                prose-code:bg-[#350203]/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-a:text-[#350203] prose-a:underline hover:prose-a:text-[#350203]/80
                prose-img:rounded-xl prose-img:shadow-md prose-img:mt-4 prose-img:mb-6"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {sanitizedContent}
                </ReactMarkdown>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-8 sticky top-8 h-fit self-start"
          >
            {/* Course Progress */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-[#350203] mb-4">
                Other Topics
              </h3>
              <div className="space-y-3">
                <Latest />
              </div>
            </div>
          </motion.aside>
        </div>
      </main>
    </section>
  );
};

export default TopicPage;
