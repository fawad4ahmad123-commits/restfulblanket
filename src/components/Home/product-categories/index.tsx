'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import CategoryCard from './category-card';
import SliderControls from '../../generic/slider-control';
import { PLACEHOLDER_IMAGE } from '../../constant';

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

interface ProductCategoriesProps {
  response_categories: ProductCategory[];
  isCategory?: boolean;
}

const ProductCategories = ({
  response_categories,
  isCategory = false,
}: ProductCategoriesProps) => {
  const pathname = usePathname();
  const isCollectionsPage = pathname === '/collections';

  const [start, setStart] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const categories = response_categories ?? [];

  const ALLOWED_CATEGORIES = [
    'Tyngdedyner',
    'Tyngdetæppe',
    'Sengesæt',
    'Hovedpuder',
  ];

  const filteredCategories = isCollectionsPage
    ? categories
        .filter((item) => item.parent === 0)
        .filter((item) => item.name !== 'Ukategoriseret')
    : categories
        .filter(
          (item) => item.parent !== 0 && ALLOWED_CATEGORIES.includes(item.name),
        )
        .sort(
          (a, b) =>
            ALLOWED_CATEGORIES.indexOf(a.name) -
            ALLOWED_CATEGORIES.indexOf(b.name),
        );

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreen();

    window.addEventListener('resize', checkScreen);

    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const visibleCards = 4;

  const next = () => {
    if (!isDesktop) {
      sliderRef.current?.scrollBy({
        left: 350,
        behavior: 'smooth',
      });
      return;
    }

    setStart((prev) =>
      prev >= Math.max(filteredCategories.length - visibleCards, 0)
        ? 0
        : prev + 1,
    );
  };

  const prev = () => {
    if (!isDesktop) {
      sliderRef.current?.scrollBy({
        left: -350,
        behavior: 'smooth',
      });
      return;
    }

    setStart((prev) =>
      prev === 0
        ? Math.max(filteredCategories.length - visibleCards, 0)
        : prev - 1,
    );
  };

  if (!filteredCategories.length) {
    return null;
  }

  return (
    <section
      className={`${isCategory ? '' : 'bg-[#fff9f5]'} py-12 md:py-20`}
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

          {!isCollectionsPage && <SliderControls prev={prev} next={next} />}
        </div>

        {isCollectionsPage ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredCategories.map((item, i) => (
              <CategoryCard
                key={item.id}
                image={item.image?.src || PLACEHOLDER_IMAGE}
                title={item.name}
                subtitle={`${item.count} produkter`}
                index={`0${i + 1}`}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="lg:hidden">
              <div
                ref={sliderRef}
                className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
                role="region"
                aria-label="Product categories slider"
              >
                {filteredCategories.map((item, i) => (
                  <div
                    key={item.id}
                    className="w-[85%] shrink-0 snap-center sm:w-[70%] md:w-[48%]"
                  >
                    <CategoryCard
                      image={item.image?.src || PLACEHOLDER_IMAGE}
                      title={item.name}
                      subtitle={`${item.count} produkter`}
                      index={`0${i + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden gap-5 lg:grid lg:grid-cols-4">
              {filteredCategories
                .slice(start, start + visibleCards)
                .map((item, i) => (
                  <CategoryCard
                    key={item.id}
                    image={item.image?.src || PLACEHOLDER_IMAGE}
                    title={item.name}
                    subtitle={`${item.count} produkter`}
                    index={`0${start + i + 1}`}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductCategories;
