import { Quote } from 'lucide-react';
import { FOUNDER_QUOTE } from './contants';

export function FounderQuote() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl rounded-[28px] bg-[#F7F1EC] px-12 py-14 text-center">
        <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-[#988D85]">
          {FOUNDER_QUOTE.eyebrow}
        </p>

        <div className="relative">
          <Quote className="absolute right-0 top-0 h-12 w-12 text-[#E8D8C9]" />

          <blockquote className="mx-auto max-w-2xl text-3xl italic leading-relaxed text-[#3A2A22]">
            "{FOUNDER_QUOTE.quote}"
          </blockquote>
        </div>

        <div className="mt-8">
          <p className="text-[#3A2A22]">{FOUNDER_QUOTE.name}</p>

          <p className="mt-1 text-xs text-[#8B817A]">{FOUNDER_QUOTE.role}</p>
        </div>
      </div>
    </section>
  );
}
