import { ArrowRight } from 'lucide-react';
import { CTA_DATA } from './contants';

export function CTASection() {
  return (
    <section className="bg-[#EEE5DD] py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-5xl text-[#3A2A22]">
          {CTA_DATA.title} <span className="italic">{CTA_DATA.highlight}</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-[#7D746D]">
          {CTA_DATA.description}
        </p>

        <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#3A2A22] px-6 py-3 text-sm text-white">
          {CTA_DATA.buttonText}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
