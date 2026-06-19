"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  prev: () => void;
  next: () => void;
}

export default function SliderControls({
  prev,
  next,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={prev}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#3b281f]/20"
      >
        <ArrowLeft size={18} />
      </button>

      <button
        onClick={next}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3b281f] text-white"
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
}