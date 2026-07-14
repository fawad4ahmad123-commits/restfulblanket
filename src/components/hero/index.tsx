'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import HeroSlider from './slider';
import DetailReviewShipping from './detail-review-shipping';
import ShopButtons from './shop-buttons';
import { HERO_SLIDES } from '../constant';
import PaymentTrustBadge from './trustpilot-badge';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const AUTOPLAY_DELAY = 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-r from-[#261D18] via-[#675B4E] to-[#261D18]/60">
      <Image
        src={HERO_SLIDES[currentSlide].image}
        alt={HERO_SLIDES[currentSlide].title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_20%] pt-[9rem] md:object-[center_15%] md:pt-26"
      />

      <div className="absolute inset-0 bg-[#2C2828]/50" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col px-5 pt-[140px] pb-6 md:px-6 md:pt-[220px] md:pb-8 lg:min-h-[620px] xl:min-h-[680px]">
        <div className="flex flex-1 items-center md:items-start">
          <div className="max-w-[720px] pt-[150px] text-white sm:pt-0">
            <h1 className="font-serif text-[44px] leading-[0.95] tracking-[-0.02em] text-white md:text-[60px] lg:text-[72px]">
              {HERO_SLIDES[currentSlide].title}
            </h1>

            <p className="mt-5 max-w-[460px] text-md leading-6 text-white md:mt-8 md:text-sm md:leading-7">
              {HERO_SLIDES[currentSlide].description}
            </p>

            <ShopButtons />
          </div>
        </div>

        <div className="mt-8">
          <PaymentTrustBadge />
        </div>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <HeroSlider
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
          />

          <DetailReviewShipping />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
