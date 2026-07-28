'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAboutContext } from '@/src/core/context/about-context';

export function FounderSection() {
  const { expert, documentLinks } = useAboutContext();

  const founderLink = documentLinks?.find(
    (link) =>
      /zafir|ekspertpanel/i.test(link.label) ||
      /zafir|ekspertpanel/i.test(link.href),
  );

  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[420px_1fr] lg:items-center">
        <div className="overflow-hidden rounded-[24px]">
          {expert.image ? (
            <Image
              src={expert.image}
              alt={expert.name || 'Founder'}
              width={420}
              height={420}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-[420px] w-full items-center justify-center bg-gray-100 text-[#8B817A]">
              <span>No image available</span>
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-2 text-3xl text-[#3A2A22]">
            {expert.name || 'No name available'}
          </h2>
          <p className="mb-8 text-xs uppercase tracking-[0.2em] text-[#8B817A]">
            {expert.title}
          </p>

          <div className="space-y-6 text-[#736A64]">
            {expert.description ? (
              <p>{expert.description}</p>
            ) : (
              <p>No description available</p>
            )}
          </div>

          {founderLink && (
            <Link
              href={founderLink.href}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#3A2A22] px-6 py-3 text-sm text-white"
            >
              {founderLink.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
