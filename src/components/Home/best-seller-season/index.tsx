'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SliderCard from '../../generic/card-slider';
import SliderControls from '../../generic/slider-control';
import { PLACEHOLDER_IMAGE } from '../../constant';
import CompareBar from '../../compare/compare-bar';

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

  const getAlleProducts = () => {
    const highRated = productData.filter(
      (product: any) => Number(product.average_rating) > 4,
    );

    if (highRated.length > 0) {
      return highRated.slice(0, 4);
    }

    return [...productData]
      .sort(
        (a: any, b: any) => Number(b.average_rating) - Number(a.average_rating),
      )
      .slice(0, 4);
  };

  const filteredProducts = isProduct
    ? productData
    : activeCategory === 'Alle'
      ? getAlleProducts()
      : productData.filter((product: any) =>
          product.categories?.some((category: any) => {
            const mappedCategory =
              CATEGORY_MAPPING[category.slug] || category.name;
            return mappedCategory === activeCategory;
          }),
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
              <em>Relaterede </em>
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
                    } cursor-pointer`}
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
              const attributeLinks = item.attribute_links || [];

              const colorOptions = attributeLinks
                .filter(
                  (attr: any) =>
                    attr.name === 'color' && Number(attr.related_product) === 0,
                )
                .map((attr: any) => attr.label);

              const colorHexValues = attributeLinks
                .filter(
                  (attr: any) =>
                    attr.name === 'color' && Number(attr.related_product) === 0,
                )
                .map((attr: any) => attr.hexvalue);

              const size =
                attributeLinks.find(
                  (attr: any) =>
                    attr.name === 'size' &&
                    Number(attr.related_product) === Number(item.id),
                )?.value ||
                attributeLinks.find(
                  (attr: any) =>
                    attr.name === 'size' && Number(attr.related_product) === 0,
                )?.value ||
                '';

              const weight =
                attributeLinks.find(
                  (attr: any) =>
                    attr.name === 'weight' &&
                    Number(attr.related_product) === Number(item.id),
                )?.value ||
                attributeLinks.find(
                  (attr: any) =>
                    attr.name === 'weight' &&
                    Number(attr.related_product) === 0,
                )?.value ||
                '';

              const color = colorOptions.length > 0 ? colorOptions[0] : '';
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
                    price={
                      item.on_sale
                        ? item.sale_price
                        : item.price || item.regular_price
                    }
                    originalPrice={
                      item.on_sale ? item.regular_price : undefined
                    }
                    rating={Number(item.average_rating)}
                    reviewCount={item.rating_count}
                    dimensions={item.dimensions || ''}
                    badge={badge}
                    color={color}
                    size={size}
                    weight={weight}
                    stockStatus={item.stock_status}
                    stockQuantity={item.stock_quantity}
                    isProduct={isProduct}
                    type="product"
                    availableColors={colorOptions}
                    availableHexColors={colorHexValues}
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
              const attributeLinks = item.attribute_links || [];

              const colorOptions = attributeLinks
                .filter(
                  (attr: any) =>
                    attr.name === 'color' && Number(attr.related_product) === 0,
                )
                .map((attr: any) => attr.label);

              const colorHexValues = attributeLinks
                .filter(
                  (attr: any) =>
                    attr.name === 'color' && Number(attr.related_product) === 0,
                )
                .map((attr: any) => attr.hexvalue);

              const size =
                attributeLinks.find(
                  (attr: any) =>
                    attr.name === 'size' &&
                    Number(attr.related_product) === Number(item.id),
                )?.value ||
                attributeLinks.find(
                  (attr: any) =>
                    attr.name === 'size' && Number(attr.related_product) === 0,
                )?.value ||
                '';

              const weight =
                attributeLinks.find(
                  (attr: any) =>
                    attr.name === 'weight' &&
                    Number(attr.related_product) === Number(item.id),
                )?.value ||
                attributeLinks.find(
                  (attr: any) =>
                    attr.name === 'weight' &&
                    Number(attr.related_product) === 0,
                )?.value ||
                '';

              const color = colorOptions.length > 0 ? colorOptions[0] : '';
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
                    price={
                      item.on_sale
                        ? item.sale_price
                        : item.price || item.regular_price
                    }
                    originalPrice={
                      item.on_sale ? item.regular_price : undefined
                    }
                    rating={Number(item.average_rating)}
                    reviewCount={item.rating_count}
                    badge={badge}
                    stockStatus={item.stock_status}
                    stockQuantity={item.stock_quantity}
                    color={color}
                    size={size}
                    weight={weight}
                    isProduct={isProduct}
                    type="product"
                    availableColors={colorOptions}
                    availableHexColors={colorHexValues}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <CompareBar />
        {!isProduct && (
          <div className="mt-8 flex justify-center">
            <Link
              href="/butik"
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
