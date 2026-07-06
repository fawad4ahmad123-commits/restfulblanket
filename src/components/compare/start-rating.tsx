import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  reviewCount: number;
}

export function StarRating({ rating, reviewCount }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-3.5 w-3.5',
              i < Math.round(rating)
                ? 'fill-[#e6cbb8] text-[#e6cbb8]'
                : 'fill-stone-200 text-stone-200',
            )}
          />
        ))}
      </div>

      <span className="text-xs text-stone-500">
        {rating.toFixed(1)} · {reviewCount.toLocaleString()}
      </span>
    </div>
  );
}
