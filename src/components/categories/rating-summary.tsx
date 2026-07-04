import { Star } from 'lucide-react';

interface RatingSummaryProps {
  rating: number;
  reviewCount: number;
}

export function RatingSummary({ rating, reviewCount }: RatingSummaryProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const fillAmount = Math.min(Math.max(rating - i, 0), 1);

          return (
            <div key={i} className="relative h-4 w-4">
              <Star className="absolute inset-0 h-4 w-4 text-[#E6CBB8]" />
              {fillAmount > 0 && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fillAmount * 100}%` }}
                >
                  <Star className="h-4 w-4 fill-[#E6CBB8] text-[#E6CBB8]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <span className="text-sm font-medium text-[#3F3A36]">{rating}</span>

      <span className="text-sm text-[#8A8377]">
        ({reviewCount.toLocaleString()} Anmeldelser)
      </span>
    </div>
  );
}
