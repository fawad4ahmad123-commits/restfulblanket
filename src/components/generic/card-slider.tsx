"use client";

import Image from "next/image";
import { Heart, Eye, ArrowUpRight, RefreshCw } from "lucide-react";
import { useState } from "react";

interface SliderCardProps {
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;
  index?: string;
  price?: string;
  originalPrice?: string;
  rating?: number;
  reviewCount?: number;
  weight?: string;
  dimensions?: string;
  type?: "category" | "product";
  onAddToCart?: () => void;
}

export default function SliderCard({
  image,
  title,
  price,
  subtitle,
  badge,
  index,
  originalPrice,
  rating = 4.9,
  reviewCount = 1284,
  weight,
  dimensions,
  type = "category",
  onAddToCart,
}: SliderCardProps) {
  const [wished, setWished] = useState(false);

  const stars = Math.round(rating);

  return (
    <div className="group flex flex-col rounded-[20px] overflow-hidden bg-[#f5f0eb]">
      {/* Image area */}
      <div className="relative overflow-hidden rounded-[20px]">
        <div className="relative h-[280px] sm:h-[320px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Badge top-left */}
        {(badge || index) && (
          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#3b281f]">
            {badge || index}
          </div>
        )}

        {/* Wishlist top-right */}
        {type === "product" && (
          <button
            onClick={() => setWished((w) => !w)}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110"
          >
            <Heart
              size={15}
              className={wished ? "fill-red-500 text-red-500" : "text-[#3b281f]"}
            />
          </button>
        )}

        {/* Quick View overlay */}
        {type === "product" && (
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-gradient-to-t from-black/60 to-transparent pb-4 pt-10 transition-all duration-300 group-hover:translate-y-0">
            <button className="flex items-center gap-2 rounded-full bg-[#3b281f] px-5 py-2.5 text-xs font-medium text-white">
              <Eye size={13} />
              Quick View
            </button>
          </div>
        )}

        {/* Category arrow */}
        {type === "category" && (
          <button className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow">
            <ArrowUpRight size={18} />
          </button>
        )}
      </div>

      {/* Info area */}
      {type === "product" && (
        <div className="flex flex-col gap-2 px-1 pt-4 pb-2">
          {/* Stars + review count */}
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-3.5 w-3.5 ${i < stars ? "text-amber-500" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[11px] text-[#3b281f]/60">
              {rating} · {reviewCount.toLocaleString()}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold leading-snug text-[#3b281f]">
            {title}
          </h3>

          {/* Weight + dimensions */}
          {(weight || dimensions) && (
            <p className="text-[11px] text-[#3b281f]/50">
              {[weight, dimensions].filter(Boolean).join(" · ")}
            </p>
          )}

          {/* Price row */}
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              {price && (
                <span className="text-base font-semibold text-[#3b281f]">
                  {price}
                </span>
              )}
              {originalPrice && (
                <span className="text-xs text-[#3b281f]/40 line-through">
                  {originalPrice}
                </span>
              )}
            </div>

            {/* Compare icon */}
            <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#3b281f]/15 text-[#3b281f]/50 transition hover:border-[#3b281f]/40 hover:text-[#3b281f]">
              <RefreshCw size={13} />
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={onAddToCart}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-[#3b281f]/20 bg-[#ede8e2] py-3 text-xs font-medium text-[#3b281f] transition hover:bg-[#3b281f] hover:text-white"
          >
            🛒 Add To Cart
          </button>
        </div>
      )}

      {/* Category card label */}
      {type === "category" && (
        <div className="p-4 text-[#3b281f]">
          {subtitle && (
            <p className="mb-1 text-[10px] uppercase tracking-[0.2em] opacity-50">
              {subtitle}
            </p>
          )}
          <h3 className="text-lg font-medium">{title}</h3>
          {price && <p className="mt-1 text-sm font-semibold">{price}</p>}
        </div>
      )}
    </div>
  );
}