import ProductContent from "@/src/components/products/product-main";
import { getBestSellers } from "@/src/lib/products";
import { Suspense } from "react";

export default async function ProductPage() {
  const start = Date.now();

  const response = await getBestSellers();

  const end = Date.now();

  console.log("t1 API Time:", end - start, "ms");

  console.log(
    "t1 Payload Size:",
    (JSON.stringify(response).length / 1024).toFixed(2),
    "KB",
  );
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductContent likeProducts={response} />
    </Suspense>
  );
}
