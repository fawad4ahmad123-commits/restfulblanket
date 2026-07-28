import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  reviewCount: number;
}

const RatingStars = ({ rating, reviewCount }: RatingStarsProps) => {
  const hasReviews = reviewCount > 0;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => {
          const filled = hasReviews && rating >= index + 1;
          const partial = hasReviews && rating > index && rating < index + 1;

          return (
            <div key={index} className="relative h-4 w-4">
              <Star className="absolute h-4 w-4 fill-white text-[#E6CBB8]" />

              {(filled || partial) && (
                <div
                  className="absolute overflow-hidden"
                  style={{
                    width: filled ? '100%' : `${(rating - index) * 100}%`,
                  }}
                >
                  <Star className="h-4 w-4 fill-[#E6CBB8] text-[#E6CBB8]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <span className="text-sm font-medium text-[#3F3A36]">
        {hasReviews ? rating.toFixed(1) : '0.0'}
      </span>

      <span
        onClick={() =>
          document.getElementById('reviews')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
        className="cursor-pointer text-sm text-[#392A22] hover:underline"
      >
        ({reviewCount.toLocaleString()} anmeldelser)
      </span>
    </div>
  );
};

export default RatingStars;
