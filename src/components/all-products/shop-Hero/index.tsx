'use client';

import Image from 'next/image';
import { HERO_SLIDES } from '../../constant';
import { SearchBar } from '../SearchBar';

const ShopHero = ({ onSearch }: any) => {
  const hero = HERO_SLIDES[0];

  return (
    <>
      <section className="relative h-[550px] overflow-hidden">
        <Image
          src="/home/hero-img.jpg"
          alt={hero.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_10%] md:object-[center_20%] "
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full items-center justify-center pt-[180px]">
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
      <section className="bg-[#F7F3EE]">
        <div className="mx-auto max-w-[1728px] px-6">
          <div className="relative z-10 -translate-y-19 rounded-t-[32px] bg-white px-3 py-2">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopHero;
