import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingSummaryProps {
  rating: number;
  reviewCount: number;
}

export function RatingSummary({ rating, reviewCount }: RatingSummaryProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-4 w-4',
              i < Math.round(rating)
                ? 'fill-[#E6CBB8] text-[#E6CBB8]'
                : 'text-[#E6CBB8]',
            )}
          />
        ))}
      </div>

      <span className="text-sm font-medium text-[#3F3A36]">{rating}</span>

      <span className="text-sm text-[#8A8377]">
        ({reviewCount.toLocaleString()} reviews)
      </span>
    </div>
  );
}
