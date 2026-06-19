"use client";
import { useState } from "react";

const faqs = [
  {
    question: "How do I choose the right weight?",
    answer:
      "We recommend selecting a blanket that is approximately 10–12% of your body weight. Use our weight guide above — if you're between sizes, we suggest going with the lighter option for your first blanket. You can always exchange within the 30-night trial.",
  },
  {
    question: "Is the Nord Classic suitable for hot sleepers?",
    answer:
      "Yes! The Nord Classic uses breathable natural materials that regulate temperature throughout the night, making it a great option for hot sleepers. Many customers report sleeping cooler with the weighted blanket than with a standard duvet.",
  },
  {
    question: "Can I use the weighted blanket with a duvet cover?",
    answer:
      "Absolutely. Our blankets are designed to fit standard duvet covers. We also offer our own range of covers made from the same breathable materials, sized specifically for each blanket weight.",
  },
  {
    question: "How do I clean the blanket?",
    answer:
      "All Nord Classic blankets are machine washable on a gentle cycle up to 30°C. We recommend using a large-capacity machine (at least 8 kg) for even cleaning. Tumble dry on low or lay flat to air dry.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-night trial on all blankets. If you're not completely satisfied, contact our team and we'll arrange a free collection and full refund — no questions asked.",
  },
];

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function FAQItem({ question, answer, isOpen, onToggle }:any) {
  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden bg-white transition-shadow duration-200 hover:shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className="text-sm font-medium text-stone-800 tracking-wide pr-4 leading-snug"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {question}
        </span>
        <span className="flex-shrink-0 text-stone-500 group-hover:text-stone-800 transition-colors duration-150">
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6">
          <div className="h-px bg-stone-100 mb-4" />
          <p
            className="text-sm text-stone-500 leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CommonQuestions() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i:any) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center py-20 px-4"
      style={{ backgroundColor: "#F5F0E8", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Heading */}
      <h2
        className="text-4xl md:text-5xl text-stone-900 mb-12 tracking-tight text-center"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        Common{" "}
        <em
          className="font-normal"
          style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
        >
          questions
        </em>
      </h2>

      {/* FAQ list */}
      <div className="w-full max-w-2xl flex flex-col gap-3">
        {faqs.map((faq, i) => (
          <FAQItem
            key={i}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </div>
  );
}