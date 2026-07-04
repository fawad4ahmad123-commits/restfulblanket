import CompareBar from '../compare/compare-bar';
import ProductCard from './product-card';

interface ProductGridProps {
  products: any[];
}

export function ProductGrid({ products }: { products: any[] }) {
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
