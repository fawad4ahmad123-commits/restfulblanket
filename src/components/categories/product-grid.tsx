import ProductCard from './product-card';

interface ProductGridProps {
  products: any[];
}

export function ProductGrid({ products = [] }: ProductGridProps) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
