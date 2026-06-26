'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react';
import { pageData } from '../contants';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-8">
      <h2
        className="mb-8 text-center text-[#35281E]"
        style={{
          fontWeight: 400,
          fontSize: '56px',
          lineHeight: '56px',
        }}
      >
        Common{' '}
        <span
          style={{
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: '56px',
            lineHeight: '56px',
          }}
        >
          questions
        </span>
      </h2>

      <div className="mx-auto max-w-4xl space-y-4">
        {pageData.faqs.map((faq, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[16px] border border-[#E9DDD4] bg-[#FAF4EF]"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex w-full items-center justify-between px-6 py-3 text-left transition-colors "
            >
              <span className="flex-1 text-left text-lg font-medium text-[#35281E]">
                {faq.question}
              </span>

              {openIndex === index ? (
                <Minus className="h-5 w-5 flex-shrink-0 text-[#35281E]" />
              ) : (
                <Plus className="h-5 w-5 flex-shrink-0 text-[#35281E]" />
              )}
            </button>

            {openIndex === index && (
              <div className=" px-6 py-5 text-left text-[#6B5B52]">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
