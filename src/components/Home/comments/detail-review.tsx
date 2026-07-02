import { Star } from 'lucide-react';
import { LeftReview as LeftReviewProps } from './types';

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
  review,
  current,
  animating,
  direction,
}: LeftReviewProps) => {
  if (!review) return null;

  return (
    <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl bg-[#fff9f5] shadow-sm">
      <div
        key={current}
        className={`absolute inset-0 flex flex-col p-8 ${
          animating
            ? direction === 'left'
              ? 'animate-[slideOutLeft_0.35s_ease_forwards]'
              : 'animate-[slideOutRight_0.35s_ease_forwards]'
            : direction === 'left'
              ? 'animate-[slideInRight_0.35s_ease_forwards]'
              : 'animate-[slideInLeft_0.35s_ease_forwards]'
        }`}
      >
        <StarRating count={review.rating} />

        <blockquote className="mt-5 max-h-[180px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden font-serif text-[22px] italic leading-relaxed text-[#392A22]">
          "{review.review?.replace(/<[^>]*>/g, '')?.replace(/\n/g, '')}"
        </blockquote>

        <div className="mt-auto flex items-center gap-3 p-1">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-[#392A22]/10 flex items-center justify-center text-[#392A22] font-semibold text-sm">
            {review.reviewer?.charAt(0)}
          </div>

          <div>
            <div className="text-sm font-medium text-[#392A22]">
              {review.reviewer}
            </div>

            <div className="text-xs uppercase tracking-widest text-[#35281E]">
              VERIFICERET KUNDE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftReview;
