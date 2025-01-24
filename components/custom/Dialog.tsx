"use client";

import React, { useState, useRef, useEffect, FC } from "react";
import Image from "next/image";
import { FaCertificate } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { sendPrompt } from "@/@/utils/api";
import { BiSend } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ImSpinner8 } from "react-icons/im";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import { Message } from "@/types/types";

interface DialogProps {
  onClose: () => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const Dialog: FC<DialogProps> = ({
  onClose,
  messages,
  setMessages,
  isLoading,
  setIsLoading,
  error,
  setError,
}) => {
  const { data: session } = useSession();
  const [input, setInput] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return;

    setError(null);
    const userMessage: Message = { id: uuidv4(), sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      setIsLoading(true);
      const botResponse = await sendPrompt(input);
      const botMessage: Message = {
        id: uuidv4(),
        sender: "Magneto",
        text: botResponse,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to send message. Please try again.");
      setMessages((prev) => prev.filter((msg) => msg !== userMessage));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-2 md:bottom-4 right-0 md:right-4 z-50 w-full max-w-md font-Montserrat tracking-wide"
    >
      <div className="relative bg-white rounded-xl shadow-2xl flex flex-col border-2 border-[#350203]/20 h-[800px] md:h-[550px] mx-2">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#350203] to-[#5a1a1a] rounded-t-xl p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">
            Magneto Learning Assistant
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-[#f8d6b6] transition-colors"
          >
            <IoIosCloseCircleOutline size={24} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#fcf4ec] to-[#f8d6b6]/20">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${
                msg.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div className="shrink-0">
                {msg.sender === "Magneto" ? (
                  <FaCertificate className="w-8 h-8 p-1.5 text-white bg-gradient-to-tr from-[#350203] to-[#5a1a1a] rounded-full" />
                ) : session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={`${session.user.name}'s profile`}
                    width={35}
                    height={35}
                    className="rounded-full border-2 border-[#f8d6b6]"
                  />
                ) : (
                  <PiStudentFill size={20} className="text-[#350203]" />
                )}
              </div>

              <div
                className={`max-w-[75%] rounded-xl p-3 ${
                  msg.sender === "user"
                    ? "bg-[#350203] text-sm leading-relaxed text-white"
                    : "bg-white text-sm leading-relaxed border border-[#350203]/20"
                }`}
              >
                <Markdown
                  className="prose-sm md:prose-base"
                  remarkPlugins={[remarkGfm]}
                >
                  {msg.text}
                </Markdown>
              </div>
            </motion.div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-[#350203]/10">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleEnter}
              placeholder="Ask Magneto anything..."
              className="w-full pr-12 pl-4 py-3 rounded-full border border-[#350203]/30 focus:outline-none focus:ring-2 focus:ring-[#350203]/50"
              disabled={isLoading}
            />

            <button
              onClick={handleSend}
              disabled={isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#350203] text-white rounded-full hover:bg-[#5a1a1a] transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <ImSpinner8 className="w-5 h-5 animate-spin" />
              ) : (
                <BiSend className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default Dialog;
