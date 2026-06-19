"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { SliderCard as SliderCardProps } from "./types";

interface ExtendedSliderCardProps extends SliderCardProps {
  hoverImage?: string;
}

const SliderCard = ({
  image,
  hoverImage,
  title,
  price,
  badge,
  index,
  originalPrice,
  rating = 4.9,
  reviewCount = 1284,
  weight,
  dimensions,
  onAddToCart,
}: ExtendedSliderCardProps) => {
  const [wished, setWished] = useState(false);

  const stars = Math.round(rating);

  return (
    <div className="group overflow-hidden rounded-[24px] bg-[#fdf9f6] transition-all duration-300 ">
      <div className="relative overflow-hidden rounded-[24px]">
        <div className="relative h-[340px] md:h-[420px]">
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover transition-all duration-500 ${
              hoverImage ? "group-hover:opacity-0" : ""
            }`}
          />

          {hoverImage && (
            <Image
              src={hoverImage}
              alt={`${title} hover`}
              fill
              className="object-cover opacity-0 transition-all duration-500 group-hover:opacity-100"
            />
          )}
        </div>

        {(badge || index) && (
          <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3b281f]">
            {badge || index}
          </div>
        )}

        <button
          onClick={() => setWished((w) => !w)}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110"
        >
          <Heart
            size={16}
            className={
              wished
                ? "fill-[#35281e] text-[#35281e]"
                : "text-[#35281e]"
            }
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-gradient-to-t from-black/60 to-transparent pb-6 pt-14 transition-all duration-300 group-hover:translate-y-0">
          <button className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-[#3b281f]">
            <Eye size={14} />
            Quick View
          </button>
        </div>
      </div>

      <div className="px-5 pb-5 pt-5">
        <div className="mb-3 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 ${
                i < stars ? "text-[#A38575]" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}

          <span className="ml-2 text-xs text-[#3b281f]/60">
            {rating} · {reviewCount.toLocaleString()}
          </span>
        </div>

        <h3 className="mb-2 text-lg font-medium leading-snug text-[#3b281f]">
          {title}
        </h3>

        {(weight || dimensions) && (
          <p className="mb-4 text-xs text-[#3b281f]/50">
            {[weight, dimensions].filter(Boolean).join(" · ")}
          </p>
        )}

        <div className="mb-5 flex items-center gap-2">
          {price && (
            <span className="text-lg font-semibold text-[#3b281f]">
              {price}
            </span>
          )}

          {originalPrice && (
            <span className="text-sm text-[#3b281f]/40 line-through">
              {originalPrice}
            </span>
          )}
        </div>

        <button
          onClick={onAddToCart}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#3b281f] py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          <ShoppingBag className="h-4 w-4" />
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default SliderCard;