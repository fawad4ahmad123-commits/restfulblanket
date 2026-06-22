"use client";

import { useEffect, useRef, useState } from "react";

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
import { WooCommerce } from "@/src/lib/woocommerce";
import { useSearchParams } from "next/navigation";
import { WooCommerceProduct } from "@/src/components/products/types";

const ProductContent = () => {
  const detailsRef = useRef<HTMLDivElement>(null);
  const [productData, setProductData] = useState<WooCommerceProduct | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const paramId = useSearchParams();
  const id = paramId.get("id");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await WooCommerce.get(`products/${id}`);
        setProductData(response.data);
      } catch (error) {
        console.error("WooCommerce Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const details = detailsRef.current;

    if (!details) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = details.getBoundingClientRect();

      if (rect.top > 50) return;

      const atTop = details.scrollTop <= 0;

      const atBottom =
        details.scrollTop + details.clientHeight >= details.scrollHeight - 1;

      if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
        e.preventDefault();
        details.scrollTop += e.deltaY;
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const {
    name,
    images: apiImages,
    price,
    regular_price,
    sale_price,
    price_html,
    short_description,
    description,
    sku,
    stock_status,
    stock_quantity,
    on_sale,
  } = productData ?? {};

  const mappedImages =
    apiImages && apiImages.length > 0
      ? apiImages.map((img: any) => img.src)
      : naturalCozyBlanket.images;

  const product = productData
    ? {
        ...naturalCozyBlanket,
        name: name ?? "",
        images: mappedImages,
        price,
        regularPrice: regular_price,
        salePrice: sale_price,
        priceHtml: price_html,
        shortDescription: short_description,
        description,
        sku,
        stockStatus: stock_status,
        stockQuantity: stock_quantity,
        onSale: on_sale,
        badge: on_sale ? "Sale" : "",
      }
    : naturalCozyBlanket;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fdf9f6] px-4 py-8 md:px-8 lg:px-20">
        <div className="mx-auto max-w-7xl">Loading product…</div>
      </main>
    );
  }
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
          <div
            ref={detailsRef}
            className="min-w-0 lg:max-h-[calc(100vh-48px)] lg:overflow-y-auto scrollbar-hide p-3"
          >
            <ProductInfoPanel product={product} />
          </div>
        </div>
      </div>
      <section>
        <Coments />
      </section>
      <ProductInformationSection info={pearlClassicInfo} />
      <TestimonialVideoSlider />
      <RestfulBlanketVideo />
      <BestSellers isProduct />
    </main>
  );
};

export default ProductContent;
