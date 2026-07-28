'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductInfoPanel from '@/src/components/products';
import ProductGallery from '@/src/components/products/product-gallery';
import { Loader } from '../loader';
import { formatProduct } from '@/src/utilty/single-product-formatter';
import { formatProductInformation } from '@/src/utilty/info-accordianc-formater';
import { useProductMeta } from '@/src/core/context/product-meta-context';

const BestSellers = dynamic(
  () => import('@/src/components/Home/best-seller-season'),
);

const Coments = dynamic(() => import('@/src/components/Home/comments'));

const ProductInformationSection = dynamic(
  () =>
    import('@/src/components/products/product-information/product-information-section'),
);

const TestimonialVideoSlider = dynamic(
  () => import('@/src/components/products/video-testimonals.tsx'),
  {
    ssr: false,
  },
);

const RestfulBlanketVideo = dynamic(
  () => import('@/src/components/Home/video-descripton'),
  {
    ssr: false,
  },
);

const ProductCategories = dynamic(() => import('../Home/product-categories'));

const ProductContent = ({ likeProducts, productResponse, categories }: any) => {
  const router = useRouter();
  const { setMetaFields } = useProductMeta();

  const [currentProduct, setCurrentProduct] = useState(productResponse);
  const [isChangingProduct, setIsChangingProduct] = useState(false);

  const product = useMemo(
    () => formatProduct(currentProduct),
    [currentProduct],
  );

  const productInformation = useMemo(
    () => formatProductInformation(currentProduct),
    [currentProduct],
  );

  const changeProduct = async (newProduct: any) => {
    setIsChangingProduct(true);

    await new Promise((resolve) => setTimeout(resolve, 50));

    setCurrentProduct(newProduct);

    if (newProduct?.slug) {
      router.replace(`/shop/${newProduct.slug}`, {
        scroll: false,
      });
    }

    setIsChangingProduct(false);
  };

  useEffect(() => {
    const meta = product?.metaFields;

    setMetaFields({
      certificateImage: meta?.certificateImage,
      certificateImages: meta?.certificateImages,
      offerBadge: meta?.offerBadge,
      offerText: meta?.offerText,
      promoColor: meta?.promoColor,
      promoText: meta?.promoText,
      properties: meta?.properties,
      temperature: meta?.temperature,
      themeColor: meta?.themeColor,
    });
  }, [product?.metaFields, setMetaFields]);

  return (
    <main className="min-h-screen bg-[#fdf9f6] px-4 py-8 sm:px-6 lg:px-10 2xl:px-20">
      {isChangingProduct ? (
        <div className="flex min-h-[70vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="mx-auto max-w-[1400px]">
            <div
              className="
                grid
                grid-cols-1
                items-start
                gap-8
                lg:grid-cols-[480px_minmax(0,1fr)]
                xl:grid-cols-[540px_minmax(0,1fr)]
                2xl:grid-cols-[636px_minmax(0,1fr)]
              "
            >
              <div className="w-full lg:sticky lg:top-5">
                <ProductGallery
                  images={product?.images}
                  badge={product?.badge}
                  productName={product?.name}
                />
              </div>

              <div className="min-w-0 w-full">
                <ProductInfoPanel
                  product={product}
                  onProductChange={changeProduct}
                  onLoadingChange={setIsChangingProduct}
                />
              </div>
            </div>
          </div>

          <section className="mt-8">
            <BestSellers isProduct={true} products={likeProducts} />
          </section>

          <Coments id={product?.id || ''} />

          <ProductInformationSection info={productInformation} />

          <TestimonialVideoSlider />

          <RestfulBlanketVideo />

          <ProductCategories response_categories={categories} />
        </>
      )}
    </main>
  );
};

export default ProductContent;
