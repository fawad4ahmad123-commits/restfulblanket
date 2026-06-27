import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { FOUNDER_INFO } from './contants';

export function FounderSection() {
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[420px_1fr] lg:items-center">
        <div className="overflow-hidden rounded-[24px]">
          <Image
            src={FOUNDER_INFO.image}
            alt={FOUNDER_INFO.name}
            width={420}
            height={420}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h2 className="mb-2 text-3xl text-[#3A2A22]">{FOUNDER_INFO.name}</h2>

          <p className="mb-8 text-xs uppercase tracking-[0.2em] text-[#8B817A]">
            {FOUNDER_INFO.title}
          </p>

          <div className="space-y-6 text-[#736A64]">
            {FOUNDER_INFO.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#3A2A22] px-6 py-3 text-sm text-white">
            {FOUNDER_INFO.buttonText}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
