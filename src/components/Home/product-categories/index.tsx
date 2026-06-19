"use client";
import { useState } from "react";
import SliderControls from "../../generic/slider-control";
import SliderCard from "../../generic/card-slider";
import { categories } from "../../constant";

const  ProductCategories = ()  =>{
  const [start, setStart] = useState(0);

  const next = () =>
    setStart((prev) =>
      prev + 1 >= categories.length - 3
        ? 0
        : prev + 1
    );

  const prev = () =>
    setStart((prev) =>
      prev === 0
        ? categories.length - 4
        : prev - 1
    );

  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="font-serif text-5xl">
            Vores <em>Produktkategorier</em>
          </h2>

          <SliderControls
            prev={prev}
            next={next}
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {categories
            .slice(start, start + 4)
            .map((item, i) => (
              <SliderCard
                key={i}
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                index={`0${i + 1}`}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
export default ProductCategories