import { useEffect } from 'react';
import { ProductCard } from '../ProductCard';
import { trackViewItemList } from '@/src/lib/analytics/ecommerce';

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

  useEffect(() => {
    if (!products?.length) return;

    trackViewItemList(
      products.map((product) => ({
        item_id: String(product.id),
        item_name: product.name,
        price: Number(product.price),
        item_variant:
          product.attributeLinks?.find((attr: any) => attr.name === 'weight')
            ?.value || '',

        weight:
          product.attributeLinks?.find((attr: any) => attr.name === 'weight')
            ?.value || '',

        size:
          product.attributeLinks?.find((attr: any) => attr.name === 'size')
            ?.value || '',
      })),
      'Shop Products',
    );
  }, [products]);

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product, index) => {
        const colorAttribute = product.attributeLinks?.find(
          (attr: any) => attr.name === 'color' && attr.related_product === 0,
        );
        return (
          <ProductCard
            key={`${product.id}-${product.slug || index}`}
            product={{
              id: product.id,
              image: product.image || '',
              title: product.name,
              slug: product.slug || String(product.id),
              price: `${product.currency}${product.price}`,
              originalPrice: product.originalPrice
                ? `${product.currency}${product.originalPrice}`
                : undefined,
              color: colorAttribute?.label || '',
              size:
                product.attributeLinks?.find(
                  (attr: any) =>
                    attr.name === 'size' && attr.related_product === 0,
                )?.value || '',
              weight:
                product.attributeLinks?.find(
                  (attr: any) =>
                    attr.name === 'weight' && attr.related_product === 0,
                )?.value || '',
              dimensions: product.dimensions,
              rating: product.rating,
              reviewCount: product.reviewCount,
              isNew: product.isNewArrival,
              stockQuantity: product.stockQuantity,
              stockStatus: product.stockStatus,
            }}
          />
        );
      })}
    </div>
  );
}
