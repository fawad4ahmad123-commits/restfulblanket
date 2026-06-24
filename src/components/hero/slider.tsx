import React from 'react';
import { HERO_SLIDES } from '../constant';

const HeroSlider = ({
  currentSlide,
  setCurrentSlide,
}: {
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  return (
    <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-7">
      {HERO_SLIDES.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className="flex items-center gap-2 md:gap-3"
        >
          <div className="relative h-[2px] w-10 overflow-hidden bg-[#fff9f5]/30 md:w-16">
            {currentSlide === index && (
              <div
                key={`${currentSlide}-${index}`}
                className="absolute left-0 top-0 h-full bg-[#fff9f5] animate-[progress_5s_linear_forwards]"
              />
            )}
          </div>
          <span
            className={`text-xs transition-all duration-300 md:text-sm ${
              currentSlide === index
                ? 'font-medium text-[#fff9f5]'
                : 'text-[#fff9f5]/50'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </button>
      ))}
    </div>
  );
};

export default HeroSlider;
