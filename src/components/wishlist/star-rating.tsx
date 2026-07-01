import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewCount: number;
}

export function StarRating({ rating, reviewCount }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-[#8A8377]">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-3 w-3"
            style={{
              fill: i < Math.round(rating) ? '#A38575' : '#E9DDD4',
              color: i < Math.round(rating) ? '#A38575' : '#E9DDD4',
            }}
          />
        ))}
      </div>
      <span>
        {rating.toFixed(1)} · {reviewCount.toLocaleString()}
      </span>
    </div>
  );
}
