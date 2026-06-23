import { Suspense } from "react";
import ProductContent from "@/src/components/products/product-main";
import { getBestSellers, getProductByName } from "@/src/lib/products";

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  const [likeProducts, product] = await Promise.all([
    getBestSellers(),
    getProductByName({ name: id || "" }),
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductContent likeProducts={likeProducts} productResponse={product} />
    </Suspense>
  );
}
