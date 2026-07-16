'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface GuideFaqProps {
  items: {
    question: string;
    answer: string;
  }[];
}

type FaqRowProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

const FaqRow = ({ question, answer, isOpen, onToggle }: FaqRowProps) => (
  <div className="overflow-hidden rounded-xl border border-stone-200 bg-white transition-shadow duration-200 hover:shadow-sm">
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      className="group flex w-full items-center justify-between px-5 py-4 text-left md:px-6 md:py-5"
    >
      <span className="pr-4 text-sm font-medium leading-snug tracking-wide text-stone-800">
        {question}
      </span>

      <span className="flex-shrink-0 text-stone-500 transition-colors duration-150 group-hover:text-stone-800">
        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </span>
    </button>

    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="px-5 pb-5 md:px-6 md:pb-6">
        <div className="mb-4 h-px bg-stone-100" />
        <div
          className="text-sm leading-relaxed text-stone-500 [&_p]:mb-2 last:[&_p]:mb-0"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      </div>
    </div>
  </div>
);

export function GuideFaq({ items }: GuideFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (items.length === 0) return null;

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-[#fdf9f6] py-16 md:py-20 xl:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="mx-auto max-w-2xl">
          <h2
            id="faq-heading"
            className="mb-10 text-center text-3xl text-stone-900 md:text-4xl xl:mb-12 xl:text-5xl"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Ofte Stillede <em className="font-normal italic">Spørgsmål</em>
          </h2>

          <div className="flex flex-col gap-3">
            {items.map((item, index) => (
              <FaqRow
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
