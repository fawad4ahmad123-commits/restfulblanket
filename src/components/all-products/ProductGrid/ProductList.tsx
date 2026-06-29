import { ProductCard } from '../ProductCard';

interface Props {
  products: any[];
}

export default function ProductList({ products }: Props) {
  if (!products.length) {
    return (
      <p className="py-16 text-center text-sm text-[#8A7A6F]">
        No products match your filters.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard
          key={`${product.id}-${product.slug || index}`}
          product={{
            image: product.image || '',
            title: product.name,
            price: `${product.currency}${product.price}`,
            originalPrice: `${product.currency}${product.originalPrice}`,
            weight: product.weight,
            dimensions: product.dimensions,
            rating: product.rating,
            reviewCount: product.reviewCount,
            isNew: product.isNewArrival,
          }}
        />
      ))}
    </div>
  );
}
