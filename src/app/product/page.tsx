import ProductContent from "@/src/components/products/product-main";
import { Suspense } from "react";

export default function ProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductContent />
    </Suspense>
  );
}
