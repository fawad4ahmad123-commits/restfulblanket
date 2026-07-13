'use client';

import { ShoppingBag, X } from 'lucide-react';

interface ProductConfigOverlayProps {
  availableColors?: string[];
  availableSizes?: string[];
  availableWeights?: string[];

  selectedColor: string;
  selectedSize: string;
  selectedWeight: string;

  setSelectedColor: (value: string) => void;
  setSelectedSize: (value: string) => void;
  setSelectedWeight: (value: string) => void;

  onClose: () => void;
  onAddToCart: () => void;
}

const ProductConfigOverlay = ({
  availableColors = [],
  availableSizes = [],
  availableWeights = [],
  selectedColor,
  selectedSize,
  selectedWeight,
  setSelectedColor,
  setSelectedSize,
  setSelectedWeight,
  onClose,
  onAddToCart,
}: ProductConfigOverlayProps) => {
  console.log('t123 hover cart');
  return (
    <div
      className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm p-5 flex flex-col items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 h-8 w-8 rounded-full bg-white flex items-center justify-center"
      >
        <X size={16} />
      </button>

      <div className="space-y-4 text-white max-w-md w-full">
        {availableColors.length > 0 && (
          <div>
            <p className="text-xs mb-2 text-center">Color</p>
            <div className="flex flex-wrap justify-center gap-2">
              {availableColors.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedColor(item)}
                  className={`
                                        px-3
                                        py-1.5
                                        rounded-full
                                        text-xs
                                        border
                                        transition
                                        ${
                                          selectedColor === item
                                            ? 'bg-white text-[#35281E]'
                                            : 'bg-white/20 text-white border-white/40'
                                        }
                                    `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {availableSizes.length > 0 && (
          <div>
            <p className="text-xs mb-2 text-center">Size</p>
            <div className="flex flex-wrap justify-center gap-2">
              {availableSizes.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedSize(item)}
                  className={`
                                        px-3
                                        py-1.5
                                        rounded-full
                                        text-xs
                                        border
                                        transition
                                        ${
                                          selectedSize === item
                                            ? 'bg-white text-[#35281E]'
                                            : 'bg-white/20 text-white border-white/40'
                                        }
                                    `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {availableWeights.length > 0 && (
          <div>
            <p className="text-xs mb-2 text-center">Weight</p>
            <div className="flex flex-wrap justify-center gap-2">
              {availableWeights.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedWeight(item)}
                  className={`
                                        px-3
                                        py-1.5
                                        rounded-full
                                        text-xs
                                        border
                                        transition
                                        ${
                                          selectedWeight === item
                                            ? 'bg-white text-[#35281E]'
                                            : 'bg-white/20 text-white border-white/40'
                                        }
                                    `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onAddToCart}
        className="
                    absolute
                    bottom-5
                    left-1/2
                    -translate-x-1/2
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-[#E9DDD4]
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-[#35281E]
                    hover:bg-white
                    transition
                "
      >
        <ShoppingBag size={16} />
        Add to cart
      </button>
    </div>
  );
};

export default ProductConfigOverlay;
