'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SliderControls as SliderControlsProps } from './types';

const SliderControls = ({ prev, next }: SliderControlsProps) => {
  return (
    <div
      className="flex items-center gap-3"
      role="group"
      aria-label="Slider navigation controls"
    >
      <button
        type="button"
        onClick={prev}
        aria-label="Show previous product categories"
        title="Show previous product categories"
        className="
          flex h-12 w-12 cursor-pointer items-center justify-center
          rounded-full border border-[#3b281f]/20
          transition-colors
          hover:bg-[#f5f1ee]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#3b281f]
          focus-visible:ring-offset-2
        "
      >
        <ArrowLeft size={20} aria-hidden="true" focusable="false" />
      </button>

      <button
        type="button"
        onClick={next}
        aria-label="Show next product categories"
        title="Show next product categories"
        className="
          flex h-12 w-12 cursor-pointer items-center justify-center
          rounded-full border border-[#3b281f]/20
          bg-[#3b281f]
          transition-opacity
          hover:opacity-90
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#3b281f]
          focus-visible:ring-offset-2
        "
      >
        <ArrowRight
          size={20}
          color="white"
          aria-hidden="true"
          focusable="false"
        />
      </button>
    </div>
  );
};

export default SliderControls;
