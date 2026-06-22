import ProductContent from "@/src/components/products/product-main";
import { Suspense } from "react";

const ProductPage = () => {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#fdf9f6] px-4 py-8 md:px-8 lg:px-20">
          <div className="mx-auto max-w-7xl">Loading product…</div>
        </main>
      }
    >
      <ProductContent />
    </Suspense>
  );
};

export default ProductPage;
