'use client';

import Image from 'next/image';
import { HERO_SLIDES } from '../../constant';
import { SearchBar } from '../SearchBar';
import PaymentTrustBadge from '../../hero/trustpilot-badge';

const ShopHero = ({ onSearch }: any) => {
  const hero = HERO_SLIDES[0];

  return (
    <>
      <section className="relative h-[750px] overflow-hidden md:h-[550px]">
        <Image
          src="/home/hero-img.jpg"
          alt={hero.title}
          fill
          priority
          fetchPriority="high"
          quality={70}
          sizes="(max-width: 768px) 100vw, 1400px"
          className="object-cover object-[center_10%] md:object-[center_20%]"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full items-center justify-center pt-[110px] md:pt-[120px]">
          <div className="w-full max-w-[1200px] px-4 md:px-6">
            <div className="text-center text-white">
              <h1 className="font-serif text-[30px] leading-[1.05] sm:text-[38px] md:text-[72px] lg:text-[80px]">
                Find Roen, der Passer til Dig
              </h1>
              <p className="mx-auto mt-4 max-w-[700px] text-sm leading-6 sm:text-base md:mt-6 md:text-[20px] md:leading-9">
                Udforsk vores naturlige tyngdeprodukter, skræddersyet til at
                give dit nervesystem den ro, det fortjener.
              </p>
              <PaymentTrustBadge isShop={true} />
            </div>
          </div>
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
