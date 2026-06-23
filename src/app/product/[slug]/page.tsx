import { Suspense } from "react";
import ProductContent from "@/src/components/products/product-main";
import { getBestSellers, getProductBySlug } from "@/src/lib/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [likeProducts, product] = await Promise.all([
    getBestSellers(),
    getProductBySlug(slug),
  ]);
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductContent likeProducts={likeProducts} productResponse={product} />
    </Suspense>
  );
}
