'use client';

import { useAboutContext } from '@/src/core/context/about-context';
import Image from 'next/image';
import { RichText } from './rich-text';

export function AboutHero() {
  const { hero } = useAboutContext();

  return (
    <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
      <div>
        <h1 className="mb-6 text-2xl leading-tight text-[#3d2f27] md:text-3xl">
          {hero.heading || 'No heading available'}
        </h1>

        {hero.description ? (
          <RichText
            text={hero.description}
            className="max-w-md space-y-4 text-[#7d726b]"
          />
        ) : (
          <p className="max-w-md text-[#7d726b]">No description available</p>
        )}
      </div>

      <div className="relative overflow-hidden rounded-[28px]">
        {hero.image ? (
          <Image
            src={hero.image}
            alt={hero.heading || 'RestfulBlanket'}
            width={800}
            height={600}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-[400px] w-full bg-[#F5F1ED] flex items-center justify-center text-[#7d726b]">
            <span>No image available</span>
          </div>
        )}
      </div>
    </section>
  );
}
