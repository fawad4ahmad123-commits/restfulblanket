"use client";

import { useEffect, useRef, useState } from "react";
import SliderControls from "../../generic/slider-control";
import CategoryCard from "./category-card";
import { WooCommerce } from "@/src/lib/woocommerce";

interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  image: {
    id: number;
    src: string;
    alt: string;
  } | null;
  count: number;
}

const ProductCategories = () => {
  const [start, setStart] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const visibleCards = 4;

  const next = () => {
    if (!isDesktop) {
      sliderRef.current?.scrollBy({
        left: 350,
        behavior: "smooth",
      });
      return;
    }

    setStart((prev) =>
      prev >= categories.length - visibleCards ? 0 : prev + 1,
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
      prev === 0 ? categories.length - visibleCards : prev - 1,
    );
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await WooCommerce.get(`products/categories`);
        // Only keep categories that have an image, since CategoryCard requires one
        const data: ProductCategory[] = (response.data || []).filter(
          (cat: ProductCategory) => !!cat.image?.src,
        );
        setCategories(data);
      } catch (error) {
        console.error("WooCommerce Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fdf9f6] px-4 py-8 md:px-8 lg:px-20">
        <div className="mx-auto max-w-7xl">Loading categories…</div>
      </main>
    );
  }

  if (!categories.length) {
    return null;
  }

  return (
    <section
      className="bg-[#fff9f5] py-12 md:py-20"
      aria-labelledby="product-categories-heading"
    >
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2
            id="product-categories-heading"
            className="font-serif text-3xl text-[#3b281f] md:text-5xl"
          >
            Vores <em>Produktkategorier</em>
          </h2>

          <SliderControls prev={prev} next={next} />
        </div>

        <div className="lg:hidden">
          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
            role="region"
            aria-label="Product categories slider"
          >
            {categories.map((item, i) => (
              <div
                key={item.id}
                className="w-[85%] shrink-0 snap-center sm:w-[70%] md:w-[48%]"
              >
                <CategoryCard
                  image={item.image!.src}
                  title={item.name}
                  subtitle={item.parent ? undefined : `${item.count} produkter`}
                  index={`0${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden gap-5 lg:grid lg:grid-cols-4">
          {categories.slice(start, start + visibleCards).map((item, i) => (
            <CategoryCard
              key={item.id}
              image={item.image!.src}
              title={item.name}
              subtitle={item.parent ? undefined : `${item.count} produkter`}
              index={`0${start + i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
