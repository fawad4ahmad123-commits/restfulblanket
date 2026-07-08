import { Suspense } from 'react';
import ProductContent from '@/src/components/products/product-main';
import {
  getBestSellers,
  getCategories,
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

  const relatedIds = product?.related_ids || [];

  const relatedProducts = allProducts.filter((item: any) =>
    relatedIds.some((id: number | string) => Number(id) === Number(item.id)),
  );
  console.log('t1', { relatedProducts });
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
