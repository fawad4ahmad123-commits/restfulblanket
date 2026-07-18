'use client';

import { useAboutContext } from '@/src/core/context/about-context';
import Image from 'next/image';

export function AboutHero() {
  const { aboutData } = useAboutContext();

  return (
    <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
      <div>
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#8d827b]">
          {aboutData.eyebrow}
        </p>

        <h1 className="mb-6 text-4xl leading-tight text-[#3d2f27] md:text-6xl">
          {aboutData.title.first}{' '}
          <span className="italic">{aboutData.title.highlighted}</span>
          <br />
          {aboutData.title.second}
        </h1>

        <p className="max-w-md text-[#7d726b]">{aboutData.description}</p>
      </div>

      <div className="relative overflow-hidden rounded-[28px]">
        <Image
          src={aboutData.image}
          alt="Sleeping woman"
          width={800}
          height={600}
          className="h-full w-full object-cover"
        />

        <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-white">
          <span>{aboutData.imageBadges[0]}</span>
          <span>{aboutData.imageBadges[1]}</span>
        </div>
      </div>
    </section>
  );
}
