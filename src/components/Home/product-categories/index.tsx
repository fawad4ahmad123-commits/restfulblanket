"use client";

import { useEffect, useState } from "react";
import SliderControls from "../../generic/slider-control";
import CategoryCard from "./category-card";
import { categories } from "../../constant";

const ProductCategories = () => {
  const [start, setStart] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () =>
      window.removeEventListener("resize", checkScreen);
  }, []);

  const visibleCards = isMobile ? 1 : 4;

  const next = () => {
    setStart((prev) =>
      prev >= categories.length - visibleCards
        ? 0
        : prev + 1
    );
  };

  const prev = () => {
    setStart((prev) =>
      prev === 0
        ? categories.length - visibleCards
        : prev - 1
    );
  };

  return (
    <section className="bg-[#fff9f5] py-12 md:py-20">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="font-serif text-3xl text-[#3b281f] md:text-5xl">
            Vores <em>Produktkategorier</em>
          </h2>

          <SliderControls
            prev={prev}
            next={next}
          />
        </div>

        <div
          className={`grid gap-5 ${
            isMobile ? "grid-cols-1" : "grid-cols-4"
          }`}
        >
          {categories
            .slice(start, start + visibleCards)
            .map((item, i) => (
              <CategoryCard
                key={item.title}
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                index={`0${start + i + 1}`}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;