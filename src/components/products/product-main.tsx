'use client';

import BestSellers from '@/src/components/Home/best-seller-season';
import Coments from '@/src/components/Home/comments';
import RestfulBlanketVideo from '@/src/components/Home/video-descripton';
import ProductInfoPanel from '@/src/components/products';
import ProductGallery from '@/src/components/products/product-gallery';
import ProductInformationSection from '@/src/components/products/product-information/product-information-section';
import TestimonialVideoSlider from '@/src/components/products/video-testimonals.tsx';
import { formatProduct } from '@/src/utilty/single-product-formatter';
import { formatProductInformation } from '@/src/utilty/info-accordianc-formater';
import ProductCategories from '../Home/product-categories';

const ProductContent = ({
  likeProducts,
  productResponse,
  categories,
}: {
  likeProducts: any[];
  productResponse: any[];
  categories: any[];
}) => {
  const product = productResponse ? formatProduct(productResponse) : null;
  const product_information = formatProductInformation(productResponse);
  console.log('t65', { productResponse, product_information });
  return (
    <main className="min-h-screen bg-[#fdf9f6] px-4 py-8 md:px-8 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[620px_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-[10px] lg:self-start">
            <ProductGallery
              images={product?.images}
              badge={product?.badge}
              productName={product?.name}
            />
          </div>

          <div className="min-w-0 p-3">
            <ProductInfoPanel
              product={product}
              relatedProducts={likeProducts}
            />
          </div>
        </div>
      </div>

      <section className="mt-6">
        <BestSellers isProduct={true} products={likeProducts} />
      </section>

      <Coments id={product?.id || ''} />

      <ProductInformationSection info={product_information} />

      <TestimonialVideoSlider />

      <RestfulBlanketVideo />

      <ProductCategories response_categories={categories} />
    </main>
  );
};

export default ProductContent;
