"use client";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import FeatureList from "./feature-list";
import ColorSelector from "./color-selector";
import OptionPillGroup from "./option-pill-group";
import ProductInfoAccordion from "./product-info-accordion";
import AddToCartBar from "./add-to-cart-bar";
import Breadcrumbs from "./bread-crumbs";
import RatingStars from "./rating-star";
import PriceDisplay from "./price-display";
import { Product } from "./types";

interface ProductInfoPanelProps {
  product: Product;
}

const ProductInfoPanel = ({ product }: any) => {
  const [selectedColorId, setSelectedColorId] = useState(product.colors[0].id);
  const [selectedWeightId, setSelectedWeightId] = useState(
    product.weights[1]?.id ?? product.weights[0].id,
  );
  const [selectedSizeId, setSelectedSizeId] = useState(
    product.sizes[1]?.id ?? product.sizes[0].id,
  );
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log("Add to cart", {
      productId: product.id,
      colorId: selectedColorId,
      weightId: selectedWeightId,
      sizeId: selectedSizeId,
      quantity,
    });
  };
console.log("t2 product ",{product })
  return (
    <div className="flex flex-col gap-5">
      <Breadcrumbs items={product.breadcrumbs} />

      <div className="space-y-2">
        <h1 className="font-serif text-[40px] font-normal leading-[52px] tracking-normal text-[#3F3A36]">
          {product.name}
        </h1>
        <RatingStars
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </div>

      <PriceDisplay
        price={product.price}
        compareAtPrice={product.compareAtPrice}
        currency={product.currency}
      />

      <FeatureList features={product.features} />

      <Separator className="bg-[#E3DCCD]" />

      <ColorSelector
        colors={product.colors}
        selectedColorId={selectedColorId}
        onSelect={setSelectedColorId}
      />

      <OptionPillGroup
        label="Weight"
        options={product.weights}
        selectedId={selectedWeightId}
        onSelect={setSelectedWeightId}
        trailingSlot={
          <button
            className="text-xs font-medium text-[#3F3A36] underline-offset-2 hover:underline cursor-pointer"
            onClick={() => open}
          >
            Weight guide
          </button>
        }
      />

      <OptionPillGroup
        label="Size"
        options={product.sizes}
        selectedId={selectedSizeId}
        onSelect={setSelectedSizeId}
      />

      <AddToCartBar
        quantity={quantity}
        onQuantityChange={setQuantity}
        price={product.price}
        currency={product.currency}
        onAddToCart={handleAddToCart}
      />

      <ProductInfoAccordion sections={product.infoSections} />
    </div>
  );
};

export default ProductInfoPanel;
