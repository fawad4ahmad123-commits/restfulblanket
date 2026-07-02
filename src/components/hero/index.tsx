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
  }, [currentSlide]);

  return (
    <section className="relative min-h-auto">
      <Image
        src={HERO_SLIDES[currentSlide].image}
        alt={HERO_SLIDES[currentSlide].title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{
          objectPosition: 'center 25%',
        }}
      />

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 mx-auto flex min-h-auto w-full max-w-[1400px] flex-col justify-between px-5 pb-8 pt-[140px] sm:min-h-screen sm:pt-[160px] md:px-6 md:pb-10 md:pt-[220px]">
        <div className="flex flex-1 items-center md:items-start">
          <div className="max-w-[720px] pt-[150px] text-[#fff9f5] sm:pt-0">
            <h1 className="font-serif text-[44px] leading-[0.95] tracking-[-0.02em] md:text-[60px] lg:text-[72px]">
              {HERO_SLIDES[currentSlide].title}
            </h1>

            <p className="mt-5 max-w-[460px] text-xs leading-6 text-[#fff9f5]/80 md:mt-8 md:text-sm md:leading-7">
              {HERO_SLIDES[currentSlide].description}
            </p>

            <ShopButtons />
          </div>

          <div className="flex-1" />
        </div>

        <PaymentTrustBadge />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
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
