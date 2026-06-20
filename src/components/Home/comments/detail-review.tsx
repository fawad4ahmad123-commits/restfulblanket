import { Star } from "lucide-react";
import { LeftReview as LeftReviewProps } from "./types";
import { REVIEWS } from "../constants";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-[#392A22] text-[#392A22]" />
      ))}
    </div>
  );
}

const LeftReview = ({
  current,
  animating,
  direction,
}: LeftReviewProps) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#fff9f5] p-8 shadow-sm">
      <div
        key={current}
        className={`${
          animating
            ? direction === "left"
              ? "animate-[slideOutLeft_0.35s_ease_forwards]"
              : "animate-[slideOutRight_0.35s_ease_forwards]"
            : direction === "left"
              ? "animate-[slideInRight_0.35s_ease_forwards]"
              : "animate-[slideInLeft_0.35s_ease_forwards]"
        }`}
      >
        <StarRating count={REVIEWS[current].rating} />
        <blockquote className="mt-5 font-serif text-[22px] italic leading-relaxed text-[#392A22]">
          "{REVIEWS[current].review}"
        </blockquote>
        <div className="mt-8 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#392A22]/10 flex items-center justify-center text-[#392A22] font-semibold text-sm">
            {REVIEWS[current].name.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-medium text-[#392A22]">
              {REVIEWS[current].name}
            </div>
            <div className="text-xs uppercase tracking-widest text-[#392A22]/50">
              {REVIEWS[current].location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LeftReview;
