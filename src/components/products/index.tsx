'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import FeatureList from './feature-list';
import ColorSelector from './color-selector';
import OptionPillGroup from './option-pill-group';
import ProductInfoAccordion from './product-info-accordion';
import AddToCartBar from './add-to-cart-bar';
import Breadcrumbs from './bread-crumbs';
import RatingStars from './rating-star';
import PriceDisplay from './price-display';
import MobileStickyCart from './mobile-stick-cart';
import { CartContext } from '@/src/core/context/cart-context';

const ProductInfoPanel = ({ product, onProductChange }: any) => {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error('CartContext not found');
  }

  const { addToCart } = cart;

  const addToCartRef = useRef<HTMLDivElement>(null);
  const [showStickyCart, setShowStickyCart] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColorId, setSelectedColorId] = useState('');
  const [selectedWeightId, setSelectedWeightId] = useState('');
  const [selectedSizeId, setSelectedSizeId] = useState('');
  const colors = product?.colors ?? [];
  const weights = product?.weights ?? [];
  const sizes = product?.sizes ?? [];
  const stockQuantity = product?.stockQuantity ?? 0;

  const featuresFromDescription = (html: string) =>
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/•/g, '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((text, index) => ({ id: `sd-${index}`, text }));

  const features =
    product?.features?.length > 0
      ? product.features
      : featuresFromDescription(product?.shortDescription || '');

  useEffect(() => {
    setSelectedColorId('');
    setSelectedWeightId('');
    setSelectedSizeId('');
  }, [product?.id]);

  const handleAddToCart = () => {
    const selectedColor =
      colors.find((c: any) => c.id === selectedColorId)?.label || '';
    const selectedWeight =
      weights.find((w: any) => w.id === selectedWeightId)?.label || '';
    const selectedSize =
      sizes.find((s: any) => s.id === selectedSizeId)?.label || '';

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        color: selectedColor,
        variant: selectedSize,
        weight: selectedWeight,
        price: Number(product.price),
        image: product.images?.[0] ?? '',
      });
    }
  };

  const handleAttributeChange = async (type: string, value: string) => {
    const matchedLink = product?.attributeLinks?.find(
      (item: any) =>
        item.name?.toLowerCase() === type.toLowerCase() && item.value === value,
    );

    if (!matchedLink?.relatedProduct) return;

    try {
      const response = await fetch(
        `/api/product/${matchedLink.relatedProduct}`,
      );

      if (!response.ok) {
        console.error(`Failed to load related product: ${response.status}`);
        return;
      }

      const newProduct = await response.json();

      if (!newProduct || newProduct.error) {
        console.error('Related product response was empty or invalid');
        return;
      }

      onProductChange(newProduct);
    } catch (error) {
      console.error('Failed to load related product:', error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyCart(!entry.isIntersecting),
      { threshold: 0.1 },
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
        <h1 className="font-serif text-[35px] font-normal leading-[52px] tracking-normal text-[#3F3A36]">
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
        currency={product?.currency ?? 'kr'}
      />

      {features.length > 0 && <FeatureList features={features} />}

      <Separator className="bg-[#E3DCCD]" />

      {colors.length > 0 && (
        <ColorSelector
          colors={colors}
          selectedColorId={selectedColorId}
          onSelect={(id) => {
            setSelectedColorId(id);

            const selected = colors.find((c: any) => c.id === id);
            if (selected) {
              handleAttributeChange('color', selected.label);
            }
          }}
        />
      )}

      {weights.length > 0 && (
        <OptionPillGroup
          label="Vægtguide"
          options={weights}
          selectedId={selectedWeightId}
          onSelect={(id) => {
            setSelectedWeightId(id);

            const selected = weights.find((w: any) => w.id === id);
            if (selected) {
              handleAttributeChange('weight', selected.label);
            }
          }}
        />
      )}

      {sizes.length > 0 && (
        <OptionPillGroup
          label="Størrelse"
          options={sizes}
          selectedId={selectedSizeId}
          onSelect={(id) => {
            setSelectedSizeId(id);

            const selected = sizes.find((s: any) => s.id === id);
            if (selected) {
              handleAttributeChange('size', selected.label);
            }
          }}
        />
      )}

      <div ref={addToCartRef}>
        <AddToCartBar
          quantity={quantity}
          onQuantityChange={setQuantity}
          price={product?.price ?? 0}
          currency={product?.currency ?? 'kr'}
          onAddToCart={handleAddToCart}
          stockQuantity={stockQuantity}
        />
      </div>

      <ProductInfoAccordion
        activeAccordion={activeAccordion}
        setActiveAccordion={setActiveAccordion}
      />

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
