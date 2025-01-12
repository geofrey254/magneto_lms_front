"use client";

import React, { useState, useRef, useEffect, FC } from "react";
import { FaCertificate } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { sendPrompt } from "@/@/utils/api";
import { BiSend } from "react-icons/bi";

// Define the structure for a message
interface Message {
  sender: "user" | "grok";
  text: string;
}

// Define props for the Dialog component
interface DialogProps {
  onClose: () => void;
}

const Dialog: FC<DialogProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const botResponse = await sendPrompt(input);
      const botMessage: Message = { sender: "grok", text: botResponse };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error communicating with API:", error);
      const errorMessage: Message = {
        sender: "grok",
        text: "Sorry, something went wrong. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
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
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section className="font-Montserrat tracking-wide fixed inset-0 mt-16 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="chat-bg rounded-lg shadow-xl w-full max-w-full h-[85vh] md:h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 bg-[#350203]">
          <h2 className="text-lg font-light text-white">
            Magneto Learning Assistant
          </h2>
          <button className="px-4 py-2 text-white transition" onClick={onClose}>
            <FaWindowClose size={30} />
          </button>
        </div>

        <div className="scroll_ai flex-1 overflow-y-auto p-4 space-y-8">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-4 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "grok" && (
                <FaCertificate
                  size={40}
                  className="bg-gradient-to-tl from-red-900 to-amber-500 rounded-full p-2 text-white"
                />
              )}
              <div
                className={`max-w-2xl px-4 py-2 ${
                  msg.sender === "user"
                    ? "self-end bg-white rounded-2xl text-[#350203]"
                    : "self-start bg-[#350203] rounded-2xl p-2 text-white text-base font-normal"
                }`}
              >
                <Markdown
                  className="markdown-content"
                  remarkPlugins={[remarkGfm]}
                >
                  {msg.text}
                </Markdown>
              </div>
              {msg.sender === "user" && (
                <PiStudentFill
                  size={40}
                  className="bg-gradient-to-tl from-amber-900 to-red-300 rounded-full p-2 text-white"
                />
              )}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <div className="p-3 flex justify-center items-center">
          <div className="w-full md:w-1/2 bg-[#350203] flex rounded-full border border-white">
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
    </section>
  );
};

export default Dialog;
