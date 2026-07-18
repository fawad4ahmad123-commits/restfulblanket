'use client';

import { useAboutContext } from '@/src/core/context/about-context';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  const { ctaData } = useAboutContext();

  return (
    <section className="bg-[#EEE5DD] py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-5xl text-[#3A2A22]">
          {ctaData.title} <span className="italic">{ctaData.highlight}</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-[#7D746D]">
          {ctaData.description}
        </p>

        <Link
          href="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#3A2A22] px-6 py-3 text-sm text-white"
        >
          {ctaData.buttonText}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
