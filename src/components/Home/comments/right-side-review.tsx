import { Star } from "lucide-react";
import { RightReviews as RightReviewsProps } from "./types";

const RightReviews = ({
  reviews,
  current,
  animating,
  direction,
}: RightReviewsProps)=> {
  const sideReviews = [
    reviews[(current + 1) % reviews.length],
    reviews[(current + 2) % reviews.length],
    reviews[(current + 3) % reviews.length],
  ];

  return (
    <div className="flex flex-col gap-4">
      {sideReviews.map((review, i) => (
        <div
          key={`${current}-${i}`}
          className={`flex items-start gap-4 rounded-xl p-4 transition-all ${
            i === 0 ? "bg-[#392A22] text-white" : "bg-white text-[#392A22]"
          } ${
            animating
              ? direction === "left"
                ? "animate-[slideOutLeft_0.35s_ease_forwards]"
                : "animate-[slideOutRight_0.35s_ease_forwards]"
              : direction === "left"
              ? "animate-[slideInRight_0.35s_ease_forwards]"
              : "animate-[slideInLeft_0.35s_ease_forwards]"
          }`}
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
              i === 0
                ? "bg-white/20 text-white"
                : "bg-[#392A22]/10 text-[#392A22]"
            }`}
          >
            {review.name.charAt(0)}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span
                className={`truncate text-sm font-medium ${
                  i === 0 ? "text-white" : "text-[#392A22]"
                }`}
              >
                {review.name}
              </span>

              <div className="flex shrink-0 gap-0.5">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className={`h-3 w-3 ${
                      i === 0
                        ? "fill-white text-white"
                        : "fill-[#392A22] text-[#392A22]"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p
              className={`mt-1 line-clamp-2 text-xs leading-relaxed ${
                i === 0 ? "text-white/70" : "text-[#392A22]/60"
              }`}
            >
              {review.review}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RightReviews