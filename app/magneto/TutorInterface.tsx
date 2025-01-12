"use client";
import React, { useState, useRef, useEffect, FC } from "react";
import { FaCertificate } from "react-icons/fa6";
import { BiSend } from "react-icons/bi";
import { sendPrompt } from "@/@/utils/api";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { useSession } from "next-auth/react";

// sidebar
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { PiStudentFill } from "react-icons/pi";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  sender: "user" | "magneto";
  text: string;
}

const TutorInterface: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true); // Set loading state to true while waiting for the response
    try {
      const botResponse = await sendPrompt(input);
      const botMessage: Message = { sender: "magneto", text: botResponse };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error communicating with API:", error);
      const errorMessage: Message = {
        sender: "magneto",
        text: "Sorry, something went wrong. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false); // Reset loading state once response is received
    }

    setInput(""); // Clear the input field
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section className="magneto_assistant fixed inset-0 mt-32 flex items-center justify-center z-10">
      <div className="bg-[#221d1a] w-full max-w-full flex">
        <AppSidebar />
        <SidebarInset>
          {/* Header Section */}
          <header className="flex h-12 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-white hover:text-white/65" />
            <div>
              <h2 className="text-lg font-light text-white">
                Magneto Learning Assistant
              </h2>
            </div>
          </header>
          {/* Main Chat Area */}
          <ScrollArea className="h-[70vh] w-full rounded-md ">
            <div className="flex flex-col space-y-4 p-3">
              {/* Chat Messages Container */}
              <div className="flex-1 overflow-y-auto px-24 pt-8 space-y-8">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* Magneto Icon for Assistant */}
                    {msg.sender === "magneto" && (
                      <FaCertificate
                        size={40}
                        className="bg-[#350203] rounded-full p-2 text-white"
                      />
                    )}
                    {/* Message Bubble */}
                    <div
                      className={`max-w-2xl px-4 py-2 ${
                        msg.sender === "user"
                          ? "self-end bg-[#fff8f8] rounded-bl-2xl rounded-tr-2xl text-[#350203]"
                          : "self-start rounded-2xl p-2 leading-loose text-white text-base font-normal"
                      }`}
                    >
                      <Markdown
                        className="markdown-content"
                        remarkPlugins={[remarkGfm]}
                      >
                        {msg.text}
                      </Markdown>
                    </div>
                    {/* User Profile Image */}
                    {msg.sender === "user" &&
                      (session?.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt={`${session.user.name}'s profile`}
                          width={35}
                          height={35}
                          className="rounded-full border-2 border-[#f8d6b6]"
                        />
                      ) : (
                        <PiStudentFill size={20} className="text-[#350203]" />
                      ))}
                  </div>
                ))}
                {/* Loading Spinner */}
                {loading && (
                  <div className="flex justify-center items-center">
                    <div className="spinner-border animate-spin rounded-full w-8 h-8 border-t-2 border-b-2 border-white"></div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-3 flex justify-center items-center fixed bottom-4 left-0 right-0">
                <div className="w-full md:w-1/2 h-14 bg-[#350203] flex rounded-full border border-white">
                  <input
                    type="text"
                    className="flex-1 px-4 py-2 rounded-full placeholder:font-normal placeholder:text-[#350203]"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleEnter}
                    placeholder="Ask Magneto Anything"
                  />
                  <button onClick={handleSend} className="px-3 py-3">
                    <BiSend size={25} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </SidebarInset>
      </div>
    </section>
  );
};

export default TutorInterface;
