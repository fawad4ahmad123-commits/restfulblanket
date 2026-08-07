import { trackViewItemList } from '@/src/lib/analytics/ecommerce';
import { useEffect } from 'react';
import CompareBar from '../compare/compare-bar';
import ProductCard from './product-card';

interface ProductGridProps {
  products: any[];
}

export function ProductGrid({ products }: ProductGridProps) {
  useEffect(() => {
    if (products && products.length > 0) {
      trackViewItemList(products, 'product_grid');
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <CompareBar />
    </>
  );
}
