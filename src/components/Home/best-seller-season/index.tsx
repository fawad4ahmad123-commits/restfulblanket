'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SliderCard from '../../generic/card-slider';
import { CATEGORIES } from '../constants';
import SliderControls from '../../generic/slider-control';
import { PLACEHOLDER_IMAGE } from '../../constant';

const BestSellers = ({
  isProduct,
  products = [],
}: {
  isProduct?: boolean;
  products: any[];
}) => {
  const [start, setStart] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
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

  const filteredProducts =
    activeCategory === 'All'
      ? productData
      : productData.filter((product) =>
          product.categories?.some((cat: any) => cat.name === activeCategory),
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

  console.log('t6', { filteredProducts });
  return (
    <section
      className={isProduct ? 'bg-{#FAF4EE] py-16' : 'bg-[#FAF4EE] py-16'}
      aria-labelledby="best-sellers-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {isProduct ? (
            <h2
              id="best-sellers-heading"
              className="font-serif text-3xl text-[#3b281f] lg:text-5xl"
            >
              <em>You may also </em>
              <span className="font-sans font-normal">like.</span>
            </h2>
          ) : (
            <h2
              id="best-sellers-heading"
              className="font-serif text-3xl text-[#3b281f] lg:text-5xl"
            >
              <em> Sæsonens bedst</em>
              <span className="font-sans font-normal">sælgende produkter</span>
            </h2>
          )}

          {isProduct ? (
            <SliderControls prev={prev} next={next} />
          ) : (
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
                    aria-pressed={activeCategory === cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setStart(0);
                    }}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs transition ${
                      activeCategory === cat
                        ? 'bg-[#3b281f] text-white'
                        : 'text-[#3b281f]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="lg:hidden">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
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
                  attr.slug === 'size' ||
                  attr.name?.toLowerCase().includes('size') ||
                  attr.name?.toLowerCase().includes('størrelse'),
              );

              const color = colorAttribute?.options?.[0] || '';
              const size = sizeAttribute?.options?.[0] || '';
              return (
                <div
                  key={item.id}
                  className="w-[85%] shrink-0 sm:w-[60%] md:w-[48%]"
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
                    badge={item.featured ? 'BEST SELLER' : ''}
                    color={color}
                    size={size}
                    type="product"
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
              const colorAttribute = item.attributes?.find(
                (attr: any) =>
                  attr.slug === 'pa_color' ||
                  attr.name?.toLowerCase() === 'color',
              );

              const sizeAttribute = item.attributes?.find(
                (attr: any) =>
                  attr.slug === 'pa_stoerrelse' ||
                  attr.slug === 'size' ||
                  attr.name?.toLowerCase().includes('size') ||
                  attr.name?.toLowerCase().includes('størrelse'),
              );

              const color = colorAttribute?.options?.[0] || '';
              const size = sizeAttribute?.options?.[0] || '';

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
                    badge={item.featured ? 'BEST SELLER' : ''}
                    color={color}
                    size={size}
                    type="product"
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
              className="flex items-center gap-2 text-sm font-medium text-[#3b281f] cursor-pointer"
            >
              VIEW ALL PRODUCTS
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
