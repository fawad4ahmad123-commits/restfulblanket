'use client';

import Image from 'next/image';
import { HERO_SLIDES } from '../../constant';
import { SearchBar } from '../SearchBar';

const ShopHero = ({ onSearch }: any) => {
  const hero = HERO_SLIDES[0];

  return (
    <>
      <section className="relative h-[280px] sm:h-[400px] md:h-[550px] overflow-hidden">
        <Image
          src={hero.image}
          alt={hero.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full items-center justify-center">
          <h1
            className="text-center font-semibold text-white"
            style={{
              fontSize: 'clamp(60px, 14vw, 220px)',
            }}
          >
            SHOP
          </h1>
        </div>
      </section>
      <div className="relative z-20 mx-auto -mt-8 w-full max-w-5xl px-4 md:-mt-10">
        <SearchBar onSearch={onSearch} />
      </div>
    </>
  );
};

export default ShopHero;
