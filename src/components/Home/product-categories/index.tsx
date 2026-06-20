"use client";

import { useEffect, useRef, useState } from "react";
import SliderControls from "../../generic/slider-control";
import CategoryCard from "./category-card";
import { categories } from "../../constant";

const ProductCategories = () => {
  const [start, setStart] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

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
                key={`${item.title}-${i}`}
                className="w-[85%] shrink-0 snap-center sm:w-[70%] md:w-[48%]"
              >
                <CategoryCard
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle}
                  index={`0${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden gap-5 lg:grid lg:grid-cols-4">
          {categories.slice(start, start + visibleCards).map((item, i) => (
            <CategoryCard
              key={`${item.title}-${start}-${i}`}
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
