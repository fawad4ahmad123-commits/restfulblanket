'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SliderCard from '../../generic/card-slider';
import SliderControls from '../../generic/slider-control';
import { PLACEHOLDER_IMAGE } from '../../constant';

const CATEGORIES = ['Alle', 'Voksne', 'Børn', 'Dyner', 'Tilbehør'];

const CATEGORY_MAPPING: Record<string, string> = {
  tyngdetaeppe: 'Voksne',
  gaveideer: 'Tilbehør',
};

const BestSellers = ({
  isProduct,
  products = [],
}: {
  isProduct: boolean;
  products: any[];
}) => {
  const [start, setStart] = useState(0);
  const [activeCategory, setActiveCategory] = useState('Alle');
  const [visibleCount, setVisibleCount] = useState(4);
  const [isDesktop, setIsDesktop] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const productData = products;

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
    window.addEventListener('resize', updateVisibleCount);

    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const bestsellerProducts = productData.filter((product: any) =>
    product.meta_data?.some(
      (meta: any) =>
        meta.key === '_card_label' &&
        String(meta.value).toUpperCase() === 'BESTSELLER',
    ),
  );
  const baseProducts = isProduct ? productData : bestsellerProducts;

  const filteredProducts =
    activeCategory === 'Alle'
      ? baseProducts
      : baseProducts.filter((product: any) =>
          product.categories?.some(
            (category: any) =>
              CATEGORY_MAPPING[category.slug] === activeCategory,
          ),
        );

  const next = () => {
    if (!isDesktop) {
      sliderRef.current?.scrollBy({
        left: 350,
        behavior: 'smooth',
      });
      return;
    }

    setStart((prev) =>
      prev + 1 >= filteredProducts.length - (visibleCount - 1) ? 0 : prev + 1,
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
        ? Math.max(filteredProducts.length - visibleCount, 0)
        : prev - 1,
    );
  };

  return (
    <section
      className={isProduct ? 'py-16' : 'bg-[#FAF4EE] py-16'}
      aria-labelledby="best-sellers-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {isProduct ? (
            <h2 className="font-serif text-3xl text-[#3b281f] lg:text-5xl">
              <em>Relaterede  </em>
              <span className="font-sans font-normal">produkter.</span>
            </h2>
          ) : (
            <h2 className="font-serif text-3xl text-[#3b281f] lg:text-5xl">
              <em>Sæsonens bedst </em>
              <span className="font-sans font-normal">sælgende produkter</span>
            </h2>
          )}

          {isProduct ? (
            <SliderControls prev={prev} next={next} />
          ) : (
            <div className="overflow-x-auto scrollbar-hide">
              <div className="inline-flex min-w-max gap-1.5 rounded-full border border-[#3b281f]/20 p-1">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setActiveCategory(category);
                      setStart(0);
                    }}
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition ${
                      activeCategory === category
                        ? 'bg-[#3b281f] text-white'
                        : 'text-[#3b281f]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="lg:hidden">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto overscroll-x-contain pb-2 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          >
            {filteredProducts.map((item: any) => {
              const mainImage = item.images?.[0]?.src || PLACEHOLDER_IMAGE;
              const hoverImage = item.images?.[1]?.src || mainImage;

              const colorAttribute = item.attributes?.find(
                (attr: any) =>
                  attr.slug === 'pa_color' ||
                  attr.name?.toLowerCase() === 'color',
              );

              const sizeAttribute = item.attributes?.find(
                (attr: any) =>
                  attr.slug === 'pa_stoerrelse' ||
                  attr.name?.toLowerCase().includes('size'),
              );

              const color = colorAttribute?.options?.[0] || '';
              const size = sizeAttribute?.options?.[0] || '';

              const badge =
                item.meta_data?.find((meta: any) => meta.key === '_card_label')
                  ?.value || '';

              return (
                <div
                  key={item.id}
                  className="w-[85%] shrink-0 snap-start sm:w-[60%] md:w-[48%]"
                >
                  <SliderCard
                    id={item.id}
                    slug={item.slug}
                    image={mainImage}
                    hoverImage={hoverImage}
                    title={item.name}
                    price={item.sale_price || item.price}
                    originalPrice={item.regular_price}
                    rating={Number(item.average_rating)}
                    reviewCount={item.rating_count}
                    badge={badge}
                    color={color}
                    size={size}
                    type="product"
                    isProduct={isProduct}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="hidden overflow-hidden lg:block">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${start * (100 / visibleCount)}%))`,
            }}
          >
            {filteredProducts.map((item: any) => {
              const mainImage = item.images?.[0]?.src || PLACEHOLDER_IMAGE;
              const hoverImage = item.images?.[1]?.src || mainImage;

              const badge =
                item.meta_data?.find((meta: any) => meta.key === '_card_label')
                  ?.value || '';

              return (
                <div key={item.id} className="w-[calc(25%-12px)] flex-shrink-0">
                  <SliderCard
                    id={item.id}
                    slug={item.slug}
                    image={mainImage}
                    hoverImage={hoverImage}
                    title={item.name}
                    price={item.sale_price || item.price}
                    originalPrice={item.regular_price}
                    rating={Number(item.average_rating)}
                    reviewCount={item.rating_count}
                    badge={badge}
                    color=""
                    size=""
                    type="product"
                    isProduct={isProduct}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {!isProduct && (
          <div className="mt-8 flex justify-center">
            <Link
              href="/shop"
              className="flex items-center gap-2 text-sm font-medium text-[#3b281f]"
            >
              SE ALLE PRODUKTER
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#3b281f]/20">
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;
