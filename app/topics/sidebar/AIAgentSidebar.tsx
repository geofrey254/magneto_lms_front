"use client";
import React, { useState, useRef, useEffect, FC } from "react";
import { BiSend } from "react-icons/bi";
import { FaWindowClose } from "react-icons/fa";
import { FaCertificate } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";

// Define the structure for a message
interface Message {
  sender: "user" | "grok";
  text: string;
}

// Define props for the Dialog component
interface DialogProps {
  onClose: () => void;
}

const Page: FC = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <div className="flex">
      <button
        className="px-6 py-3 text-white font-semibold text-lg rounded-full bg-gradient-to-r from-[#f8d6b6] via-pink-500 to-red-500 shadow-lg transform hover:scale-105 hover:shadow-2xl focus:outline-none transition-transform duration-300 ease-in-out"
        onClick={() => setShowDialog(true)}
      >
        Ask Magneto AI
      </button>

      {showDialog && <Dialog onClose={() => setShowDialog(false)} />}
    </div>
  );
};

const Dialog: FC<DialogProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message to the chat
    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Send message to the backend and get response
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/magneto_agent/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch response from Magneto API.");
      }

      const data: {
        prompt: string;
        magneto: { session_id: string; outputs: string };
      } = await response.json();
      const botMessage: Message = {
        sender: "grok",
        text: data.magneto.outputs,
      }; // Use only the outputs field
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        sender: "grok",
        text: "Sorry, something went wrong. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("Error communicating with API:", error);
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
    // Disable scrolling
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section className="font-Montserrat tracking-wide fixed inset-0 mt-16 flex items-center justify-center bg-black bg-opacity-50">
      <div className="chat-bg rounded-lg shadow-xl w-full max-w-full h-[90vh] flex flex-col">
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
                {msg.text}
              </div>
              {msg.sender === "user" && (
                <PiStudentFill
                  size={40}
                  className="bg-gradient-to-tl from-amber-900 to-red-300 rounded-full  p-2 text-white"
                />
              )}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <div className="p-3 flex justify-center items-center">
          <div className="w-1/2 bg-[#350203] flex rounded-full border border-white">
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

export default Page;
