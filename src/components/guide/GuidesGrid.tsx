import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { GuideCard } from '@/src/types/wp';

interface GuidesGridProps {
  guides: GuideCard[];
}

export function GuidesGrid({ guides }: GuidesGridProps) {
  if (guides.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6">
        <h1 className="text-3xl font-bold text-[#4a3f38]">Vores Guides</h1>
        <p className="mt-4 text-[#736760]">Ingen guides fundet lige nu.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-center text-3xl font-bold text-[#4a3f38] sm:text-4xl">
        Vores Guides
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {guides.map((guide) => (
          <article
            key={guide.slug}
            className="flex flex-col rounded-2xl border border-[#e7ded6] bg-[#faf7f4] p-6 transition-shadow duration-200 hover:shadow-md sm:p-8"
          >
            <h2 className="text-xl font-semibold text-[#4a3f38]">
              {guide.title}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#736760]">
              {guide.description}
            </p>

            {guide.bullets.length > 0 && (
              <>
                <p className="mt-4 text-sm font-medium text-[#4a3f38]">
                  I denne guide lærer du:
                </p>
                <ul className="mt-2 space-y-2">
                  {guide.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-sm text-[#736760]"
                    >
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#392A22]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <Link
              href={guide.href}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#392A22] px-5 py-2.5 text-sm font-medium text-white no-underline shadow-sm transition-opacity hover:opacity-90"
            >
              Læs Guide
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
