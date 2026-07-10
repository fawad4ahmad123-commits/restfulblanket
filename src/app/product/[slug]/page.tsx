import { Suspense } from 'react';
import ProductContent from '@/src/components/products/product-main';
import {
  getBestSellers,
  getCategories,
  getProductById,
  getProductBySlug,
} from '@/src/lib/products';
import { Loader } from '@/src/components/loader';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [allProducts, product, categories] = await Promise.all([
    getBestSellers(),
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (product?.type === 'grouped' && product?.grouped_products?.length) {
    product.grouped_products_data = await Promise.all(
      product.grouped_products.map((id: number) => getProductById(id)),
    );
  }

  const relatedIds = product?.related_ids || [];

  const relatedProducts = allProducts.filter((item: any) =>
    relatedIds.some((id: number | string) => Number(id) === Number(item.id)),
  );

  return (
    <Suspense fallback={<Loader />}>
      <ProductContent
        likeProducts={relatedProducts}
        productResponse={product}
        categories={categories}
      />
    </Suspense>
  );
}
