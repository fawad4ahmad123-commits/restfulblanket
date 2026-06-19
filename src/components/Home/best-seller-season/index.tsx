"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SliderControls from "../../generic/slider-control";
import SliderCard from "../../generic/card-slider";
import { products } from "../../constant";
import { CATEGORIES } from "../constants";

const BestSellers = () => {
  const [start, setStart] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4);
      }
    };

    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const next = () =>
    setStart((prev) =>
      prev + 1 >= products.length - (visibleCount - 1) ? 0 : prev + 1,
    );

  const prev = () =>
    setStart((prev) =>
      prev === 0 ? products.length - visibleCount : prev - 1,
    );

  return (
    <section className="bg-[#fff9f5] py-16">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="font-serif text-3xl text-[#3b281f] lg:text-5xl">
            <em>Best Sellers</em>
            <span className="font-sans font-normal">of the season</span>
          </h2>

          <div className="overflow-x-auto scrollbar-hide">
            <div className="inline-flex gap-2 rounded-full border border-[#3b281f]/20 p-1 min-w-max">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setStart(0);
                  }}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs ${
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

        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500"
            style={{
              transform: `translateX(calc(-${start * (100 / visibleCount)}%))`,
            }}
          >
            {products.map((item, i) => (
              <div
                key={i}
                className="w-full flex-shrink-0 sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]"
              >
                <SliderCard
                  image={item.image}
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
            className="flex items-center gap-2 text-sm font-medium text-[#3b281f]"
          >
            VIEW ALL PRODUCTS
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#3b281f]/20">
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
