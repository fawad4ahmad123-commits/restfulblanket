"use client";

import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import FeatureList from "./feature-list";
import ColorSelector from "./color-selector";
import OptionPillGroup from "./option-pill-group";
import ProductInfoAccordion from "./product-info-accordion";
import AddToCartBar from "./add-to-cart-bar";
import Breadcrumbs from "./bread-crumbs";
import RatingStars from "./rating-star";
import PriceDisplay from "./price-display";
import MobileStickyCart from "./mobile-stick-cart";

const ProductInfoPanel = ({ product }: any) => {
  const addToCartRef = useRef<HTMLDivElement>(null);
  const [showStickyCart, setShowStickyCart] = useState(false);
  const colors = product?.colors ?? [];
  const weights = product?.weights ?? [];
  const sizes = product?.sizes ?? [];
  const features = product?.features ?? [];
  const stockQuantity = product?.stockQuantity ?? 0;

  const [selectedColorId, setSelectedColorId] = useState(colors[0]?.id ?? "");

  const [selectedWeightId, setSelectedWeightId] = useState(
    weights[1]?.id ?? weights[0]?.id ?? "",
  );

  const [selectedSizeId, setSelectedSizeId] = useState(
    sizes[1]?.id ?? sizes[0]?.id ?? "",
  );

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log("Add to cart", {
      productId: product?.id,
      colorId: selectedColorId,
      weightId: selectedWeightId,
      sizeId: selectedSizeId,
      quantity,
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyCart(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
      },
    );

    if (addToCartRef.current) {
      observer.observe(addToCartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5">
      <Breadcrumbs items={product?.breadcrumbs ?? []} />

      <div className="space-y-2">
        <h1 className="font-serif text-[40px] font-normal leading-[52px] tracking-normal text-[#3F3A36]">
          {product?.name}
        </h1>

        <RatingStars
          rating={product?.rating ?? 0}
          reviewCount={product?.reviewCount ?? 0}
        />
      </div>

      <PriceDisplay
        price={product?.price ?? 0}
        compareAtPrice={product?.compareAtPrice ?? 0}
        currency={product?.currency ?? "kr"}
      />

      {features.length > 0 && <FeatureList features={features} />}

      <Separator className="bg-[#E3DCCD]" />

      {colors.length > 0 && (
        <ColorSelector
          colors={colors}
          selectedColorId={selectedColorId}
          onSelect={setSelectedColorId}
        />
      )}

      {weights.length > 0 && (
        <OptionPillGroup
          label="Weight"
          options={weights}
          selectedId={selectedWeightId}
          onSelect={setSelectedWeightId}
          trailingSlot={
            <button className="cursor-pointer text-xs font-medium text-[#3F3A36] underline-offset-2 hover:underline">
              Weight guide
            </button>
          }
        />
      )}

      {sizes.length > 0 && (
        <OptionPillGroup
          label="Size"
          options={sizes}
          selectedId={selectedSizeId}
          onSelect={setSelectedSizeId}
        />
      )}

      <div ref={addToCartRef}>
        <AddToCartBar
          quantity={quantity}
          onQuantityChange={setQuantity}
          price={product?.price ?? 0}
          currency={product?.currency ?? "kr"}
          onAddToCart={handleAddToCart}
          stockQuantity={stockQuantity}
        />
      </div>

      <ProductInfoAccordion />
      <MobileStickyCart
        visible={showStickyCart}
        product={{
          name: product?.name,
          price: product?.price,
          currency: product?.currency,
          image: product?.images?.[0],
        }}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductInfoPanel;
