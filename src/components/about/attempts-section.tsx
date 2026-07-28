'use client';

import Image from 'next/image';
import { useAboutContext } from '@/src/core/context/about-context';
import { RichText } from './rich-text';

export function AttemptsSection() {
  const { contentSections } = useAboutContext();

  if (!contentSections || contentSections.length === 0) return null;

  return (
    <>
      {contentSections.map((section, idx) => {
        const hasContent =
          section.heading || section.description || section.images.length > 0;

        if (!hasContent) return null;

        return (
          <section key={`${section.heading}-${idx}`} className="mt-20">
            {section.heading && (
              <h2 className="mb-6 text-left text-2xl font-medium text-[#3d2f27] md:text-3xl">
                {section.heading}
              </h2>
            )}

            {section.description && (
              <RichText
                text={section.description}
                className="mb-8 max-w-4xl space-y-3 text-left text-base leading-7 text-[#6f645d]"
              />
            )}

            {section.images.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-8">
                {section.images.map((image, index) => (
                  <Image
                    key={image}
                    src={image}
                    alt={`Certification logo ${index + 1}`}
                    width={140}
                    height={140}
                    sizes="140px"
                    loading="lazy"
                    quality={75}
                    className="h-auto w-[140px] object-contain"
                  />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </>
  );
}
