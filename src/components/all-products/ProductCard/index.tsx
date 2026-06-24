import { Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group rounded-xl border bg-white p-2 transition-shadow hover:shadow-md">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {product.isNew && (
          <Badge className="absolute left-2 top-2 bg-stone-900">New</Badge>
        )}

        <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            className="h-7 w-7 rounded-full"
          >
            <Heart className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-7 w-7 rounded-full"
          >
            <Eye className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="px-1 pt-3">
        <p className="text-sm font-medium text-stone-800 line-clamp-1">
          {product.name}
        </p>
        <p className="text-xs text-stone-400">Size: {product.size}</p>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-stone-900">
            €{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-stone-400 line-through">
              €{product.originalPrice}
            </span>
          )}
        </div>

        <Button size="sm" className="mt-2 w-full rounded-lg">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
