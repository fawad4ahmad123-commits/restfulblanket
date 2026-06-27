import Image from 'next/image';
import { ABOUT_DATA } from './contants';

export function AboutHero() {
  return (
    <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
      <div>
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#8d827b]">
          {ABOUT_DATA.eyebrow}
        </p>

        <h1 className="mb-6 text-4xl leading-tight text-[#3d2f27] md:text-6xl">
          {ABOUT_DATA.title.first}{' '}
          <span className="italic">{ABOUT_DATA.title.highlighted}</span>
          <br />
          {ABOUT_DATA.title.second}
        </h1>

        <p className="max-w-md text-[#7d726b]">{ABOUT_DATA.description}</p>
      </div>

      <div className="relative overflow-hidden rounded-[28px]">
        <Image
          src={ABOUT_DATA.image}
          alt="Sleeping woman"
          width={800}
          height={600}
          className="h-full w-full object-cover"
        />

        <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-white">
          <span>{ABOUT_DATA.imageBadges[0]}</span>
          <span>{ABOUT_DATA.imageBadges[1]}</span>
        </div>
      </div>
    </section>
  );
}
