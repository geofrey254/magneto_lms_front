"use client";
import React, { useState } from "react";

function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleQuestion = (index: any) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqData = [
    {
      question: "What subjects are offered?",
      answer:
        "We offer a wide range of subjects including Mathematics, Science, History, Literature, and many more.",
    },
    {
      question: "How do I access my class content?",
      answer:
        "Once you log in, navigate to the 'Topics' section, choose your class, and select the chapter you want to study.",
    },
    // {
    //   question: "How do I submit exams?",
    //   answer:
    //     "You can download the exam in PDF format, complete it, and upload your scanned answers for grading.",
    // },
    {
      question: "How does pricing work?",
      answer:
        "Our pricing is based on the period you enroll in. Payments can be made securely via M-Pesa.",
    },
    {
      question: "What is the payment method?",
      answer:
        "We accept payments through M-Pesa. Before accessing the content, you will be required to subscribe to the platform either daily, monthly or yearly depending on your needs.",
    },
  ];

  return (
    <section className="bg-[#350203] w-full py-12">
      <div className="container mx-auto px-4 max-w-screen-lg">
        <h2 className="text-4xl font-bold text-center mb-8 text-[#f8d6b6]">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-gray-600 pb-4">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full text-left flex justify-between items-center text-lg font-medium text-[#f8d6b6] hover:text-gray-300"
              >
                {faq.question}
                <span>
                  {openQuestion === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 text-[#f8d6b6]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 12H6"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 text-[#f8d6b6]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m6-6H6"
                      />
                    </svg>
                  )}
                </span>
              </button>

              {openQuestion === index && (
                <p className="mt-4 text-white">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
