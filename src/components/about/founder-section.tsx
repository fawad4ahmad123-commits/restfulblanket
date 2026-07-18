'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAboutContext } from '@/src/core/context/about-context';

export function FounderSection() {
  const { founderInfo } = useAboutContext();

  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[420px_1fr] lg:items-center">
        <div className="overflow-hidden rounded-[24px]">
          <Image
            src={founderInfo.image}
            alt={founderInfo.name}
            width={420}
            height={420}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h2 className="mb-2 text-3xl text-[#3A2A22]">{founderInfo.name}</h2>
          <p className="mb-8 text-xs uppercase tracking-[0.2em] text-[#8B817A]">
            {founderInfo.title}
          </p>

          <div className="space-y-6 text-[#736A64]">
            {founderInfo.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <Link
            href="/om-os/ekspertpanel/zafir-baek"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#3A2A22] px-6 py-3 text-sm text-white"
          >
            {founderInfo.buttonText}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
