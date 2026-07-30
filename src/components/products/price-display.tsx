import { Badge } from '@/components/ui/badge';

interface PriceDisplayProps {
  price: number;
  compareAtPrice?: number;
  currency: string;
}

const PriceDisplay = ({
  price,
  compareAtPrice,
  currency,
}: PriceDisplayProps) => {
  const savings =
    compareAtPrice && compareAtPrice > price ? compareAtPrice - price : 0;

  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl font-semibold text-[#3F3A36]">
        {currency}
        {price}
      </span>

      {compareAtPrice && compareAtPrice > price && (
        <span className="text-base text-[#392A22] line-through">
          {currency}
          {compareAtPrice}
        </span>
      )}

      {savings > 0 && (
        <Badge className="rounded-full bg-[#E6CBB8] px-2.5 py-0.5 text-xs font-medium text-[#3F3A36] hover:bg-[#E6CBB8]">
          Gem {currency}
          {savings}
        </Badge>
      )}
    </div>
  );
};
export default PriceDisplay;
