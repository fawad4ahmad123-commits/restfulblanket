import { ArrowLeft, ArrowRight } from 'lucide-react';

interface HeadingProps {
  prev: () => void;
  next: () => void;
}

const Heading = ({ prev, next }: HeadingProps) => {
  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-serif text-[36px] leading-tight text-[#392A22] md:text-[48px]">
          Mød vores
          <span className="italic font-normal"> søvneksperter</span>
        </h2>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Show previous experts"
            title="Show previous experts"
            onClick={prev}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#3b281f]/20"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            type="button"
            aria-label="Show next experts"
            title="Show next experts"
            onClick={next}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#3b281f]"
          >
            <ArrowRight size={20} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Heading;
