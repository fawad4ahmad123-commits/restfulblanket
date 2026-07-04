import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from './constants';
import { StarRating } from './start-rating';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3] w-full bg-[#d9c3a1]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover"
        />
        <Badge className="absolute left-4 top-4">{product.badge}</Badge>
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-sm transition hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3 p-5">
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <div>
          <h3 className="text-base font-medium leading-snug text-stone-900">
            {product.title}
          </h3>
          <p className="mt-1 text-xs text-stone-500">
            {product.weightKg} kg · {product.sizeCm}
          </p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-stone-900">
            €{product.price}
          </span>
          <span className="text-sm text-stone-400 line-through">
            €{product.originalPrice}
          </span>
        </div>

        <Button className="w-full">
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </Button>
      </div>
    </Card>
  );
}
