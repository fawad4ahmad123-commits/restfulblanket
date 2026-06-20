"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SliderCard from "../../generic/card-slider";
import { products } from "../../constant";
import { CATEGORIES } from "../constants";

const BestSellers = () => {
  const [start, setStart] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(4);
  const [isDesktop, setIsDesktop] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
        setIsDesktop(false);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
        setIsDesktop(false);
      } else {
        setVisibleCount(4);
        setIsDesktop(true);
      }
    };

    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const next = () => {
    if (!isDesktop) {
      sliderRef.current?.scrollBy({
        left: 350,
        behavior: "smooth",
      });
      return;
    }

    setStart((prev) =>
      prev + 1 >= products.length - (visibleCount - 1) ? 0 : prev + 1,
    );
  };

  const prev = () => {
    if (!isDesktop) {
      sliderRef.current?.scrollBy({
        left: -350,
        behavior: "smooth",
      });
      return;
    }

    setStart((prev) =>
      prev === 0 ? products.length - visibleCount : prev - 1,
    );
  };

  return (
    <section
      className="bg-[#FAF4EE] py-16"
      aria-labelledby="best-sellers-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <h2
            id="best-sellers-heading"
            className="font-serif text-3xl text-[#3b281f] lg:text-5xl"
          >
            <em>Best Sellers</em>
            <span className="font-sans font-normal"> of the season</span>
          </h2>

          <div
            className="overflow-x-auto scrollbar-hide"
            role="tablist"
            aria-label="Product categories"
          >
            <div className="inline-flex min-w-max gap-2 rounded-full border border-[#3b281f]/20 p-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  aria-label={`Filter products by ${cat}`}
                  aria-pressed={activeCategory === cat}
                  title={`Filter products by ${cat}`}
                  onClick={() => {
                    setActiveCategory(cat);
                    setStart(0);
                  }}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs transition ${
                    activeCategory === cat
                      ? "bg-[#3b281f] text-white"
                      : "text-[#3b281f]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
            role="region"
            aria-label="Best selling products"
          >
            {products.map((item, i) => (
              <div
                key={`${item.title}-${i}`}
                className="w-[85%] shrink-0 sm:w-[60%] md:w-[48%]"
              >
                <SliderCard
                  image={item.image}
                  hoverImage={item.hoverImage}
                  title={item.title}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  rating={item.rating}
                  reviewCount={item.reviewCount}
                  weight={item.weight}
                  dimensions={item.dimensions}
                  badge="BEST SELLER"
                  type="product"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden overflow-hidden lg:block">
          <div
            className="flex gap-4 transition-transform duration-500"
            style={{
              transform: `translateX(calc(-${start * (100 / visibleCount)}%))`,
            }}
          >
            {products.map((item, i) => (
              <div
                key={`${item.title}-${i}`}
                className="w-[calc(25%-12px)] flex-shrink-0"
              >
                <SliderCard
                  image={item.image}
                  hoverImage={item.hoverImage}
                  title={item.title}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  rating={item.rating}
                  reviewCount={item.reviewCount}
                  weight={item.weight}
                  dimensions={item.dimensions}
                  badge="BEST SELLER"
                  type="product"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/products"
            aria-label="View all products"
            title="View all products"
            className="flex items-center gap-2 text-sm font-medium text-[#3b281f]"
          >
            VIEW ALL PRODUCTS
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#3b281f]/20">
              <ArrowRight aria-hidden="true" size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
