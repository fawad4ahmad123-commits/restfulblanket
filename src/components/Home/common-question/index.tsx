'use client';
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { FAQS } from '../constants';

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => (
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
        isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="px-5 pb-5 md:px-6 md:pb-6">
        <div className="mb-4 h-px bg-stone-100" />

        <p className="text-sm leading-relaxed text-stone-500">{answer}</p>
      </div>
    </div>
  </div>
);

const CommonQuestions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-[#fdf9f6] py-16 md:py-20 xl:py-24">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="mx-auto max-w-2xl">
          <h2
            className="mb-10 text-center text-3xl text-stone-900 md:text-4xl xl:mb-12 xl:text-5xl"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
            }}
          >
            Almindelige <em className="font-normal italic">spørgsmål</em>
          </h2>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonQuestions;
