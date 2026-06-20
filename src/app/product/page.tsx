import BestSellers from "@/src/components/Home/best-seller-season";
import Coments from "@/src/components/Home/comments";
import RestfulBlanketVideo from "@/src/components/Home/video-descripton";
import ProductInfoPanel from "@/src/components/products";
import {
  naturalCozyBlanket,
  pearlClassicInfo,
} from "@/src/components/products/contants";
import ProductGallery from "@/src/components/products/product-gallery";
import ProductInformationSection from "@/src/components/products/product-information/product-information-section";
import TestimonialVideoSlider from "@/src/components/products/video-testimonals.tsx";

const ProductPage = () => {
  const product = naturalCozyBlanket;

  return (
    <main className="min-h-screen bg-[#fdf9f6] px-4 py-8 md:px-8 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[620px_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-6 lg:self-start">
            <ProductGallery
              images={product.images}
              badge={product.badge}
              productName={product.name}
            />
          </div>
          <div className="min-w-0">
            <ProductInfoPanel product={product} />
          </div>
        </div>
      </div>
      <section className="mt-24">
        <Coments />
      </section>
      <ProductInformationSection info={pearlClassicInfo} />
      <TestimonialVideoSlider />
      <RestfulBlanketVideo />
      <BestSellers isProduct />
    </main>
  );
};
export default ProductPage;
