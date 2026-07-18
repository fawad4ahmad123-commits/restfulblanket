'use client';

import { useAboutContext } from '@/src/core/context/about-context';
import Link from 'next/link';

export function DocumentationSection() {
  const { documentLinks } = useAboutContext();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-6 text-5xl text-[#3C2D24]">
          Facts, images & documentation
        </h2>

        <p className="mb-8 text-[#7D746D]">
          Need quick facts, photography, press angles, or an interview with our
          founder? Everything sits in one place — alongside the CE documentation
          behind every duvet.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {documentLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm underline underline-offset-4"
            >
              {link.label} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
