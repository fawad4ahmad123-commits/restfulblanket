import { ArrowLeft, ArrowRight } from "lucide-react";
import { SliderControls as SliderControlsProps } from "./types";

const SliderControls = ({ prev, next }: SliderControlsProps) => {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Show previous product categories"
        title="Show previous product categories"
        onClick={prev}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#3b281f]/20"
      >
        <ArrowLeft aria-hidden="true" size={20} />
      </button>

      <button
        type="button"
        aria-label="Show next product categories"
        title="Show next product categories"
        onClick={next}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#3b281f]/20 bg-[#3b281f]"
      >
        <ArrowRight aria-hidden="true" size={20} color="white" />
      </button>
    </div>
  );
};

export default SliderControls;
