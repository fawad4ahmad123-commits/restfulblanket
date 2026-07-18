'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCategories } from '@/src/core/context/category-provider';
import { useMergedNavigation } from '@/src/hooks/use-merged-navigation';

const MAX_MAIN_CATEGORIES = 4;
const MAX_SUB_CATEGORIES = 4;

const SUBCATEGORY_ORDER = [
  'Tyngdedyner',
  'Tyngdetæppe',
  'Sengesæt',
  'Hovedpuder',
];

const Navigation = ({ isHome = true }: { isHome?: boolean }) => {
  const pathname = usePathname();
  const { categories, parentCategories, getChildren, getProductsByCategory } =
    useCategories();

  const navigation = useMergedNavigation();
  const visibleParentCategories = useMemo(
    () =>
      parentCategories
        .filter((category: any) => getChildren(category.id).length > 0)
        .slice(0, MAX_MAIN_CATEGORIES),
    [parentCategories, getChildren],
  );

  const [hoveredCategoryId, setHoveredCategoryId] = useState<number | null>(
    null,
  );

  const activeCategoryId =
    hoveredCategoryId ?? visibleParentCategories[0]?.id ?? null;

  const shopDropdownProducts = useMemo(
    () => getProductsByCategory(activeCategoryId, 4),
    [activeCategoryId, getProductsByCategory],
  );

  const activeCategory = useMemo(
    () => visibleParentCategories.find((c: any) => c.id === activeCategoryId),
    [visibleParentCategories, activeCategoryId],
  );
  const tyngdedynerCategory = categories.find(
    (c: any) => c.slug === 'tyngdedyner',
  );

  const sovevaerelseCategory = categories.find(
    (c: any) => c.slug === 'sovevaerelse',
  );

  const tyngdedynerChildren = tyngdedynerCategory
    ? getChildren(tyngdedynerCategory.id)
    : [];

  const tilbehoerCategories = sovevaerelseCategory
    ? getChildren(sovevaerelseCategory.id).filter(
        (c: any) => c.slug === 'hovedpuder' || c.slug === 'sengesaet',
      )
    : [];

  function fixProductHref(href: string): string {
    return href.replace(/^\/products\//, '/product/');
  }

  const slugify = (text?: string) => {
    if (!text) return '';

    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/æ/g, 'ae')
      .replace(/ø/g, 'oe')
      .replace(/å/g, 'aa')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  return (
    <nav
      aria-label="Main navigation"
      className="hidden items-center gap-6 lg:flex xl:gap-8"
    >
      {navigation.map((item: any) => {
        const isActive = pathname === item.href;

        const baseLinkClass = cn(
          'whitespace-nowrap text-sm transition-colors',
          isHome
            ? cn(
                'hover:text-white/70',
                isActive ? 'text-white' : 'text-white/90',
              )
            : cn(
                'hover:text-[#392A22]/70',
                isActive ? 'text-[#392A22]' : 'text-[#392A22]/90',
              ),
        );
        if (item.href === '/shop') {
          return (
            <div key={item.title} className="group static">
              <Link
                href="/shop"
                aria-label="All Products"
                aria-haspopup="menu"
                title="All Products"
                className={cn('flex items-center gap-1', baseLinkClass)}
              >
                Alle Produkter
                <ChevronDown
                  aria-hidden="true"
                  className="size-3.5 transition-transform group-hover:rotate-180"
                />
              </Link>

              <div
                role="menu"
                aria-label="All Products submenu"
                className={cn(
                  'invisible absolute inset-x-0 top-full z-[9999] opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100',
                  'flex justify-start',
                  isHome ? 'bg-[#392A22]' : 'bg-[#fff9f5] shadow-lg',
                )}
              >
                <div
                  className={cn(
                    'flex w-full gap-12 px-10 py-8',
                    isHome ? 'bg-[#392A22]' : 'bg-[#fff9f5] shadow-lg',
                  )}
                >
                  {visibleParentCategories.map((category: any) => {
                    const children = [...getChildren(category.id)]
                      .sort(
                        (a: any, b: any) =>
                          SUBCATEGORY_ORDER.indexOf(a.name) -
                          SUBCATEGORY_ORDER.indexOf(b.name),
                      )
                      .slice(0, MAX_SUB_CATEGORIES);

                    return (
                      <div
                        key={category.id}
                        className="flex min-w-[180px] max-w-[220px] flex-col gap-1"
                        onMouseEnter={() => setHoveredCategoryId(category.id)}
                      >
                        <Link
                          href={`/shop/${category.slug}`}
                          title={category.name}
                          className={cn(
                            'mb-2 block truncate text-xs font-medium uppercase tracking-wide',
                            isHome ? 'text-[#E9DDD4]/60' : 'text-[#392A22]/50',
                          )}
                        >
                          {category.name}
                        </Link>

                        {children.map((child: any) => {
                          const childImageSrc = child?.image?.src;

                          return (
                            <Link
                              key={child.id}
                              href={`/shop/${child.slug}`}
                              role="menuitem"
                              aria-label={`Go to ${child.name}`}
                              title={child.name}
                              onMouseEnter={() =>
                                setHoveredCategoryId(child.id)
                              }
                              className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                                isHome
                                  ? 'text-[#E9DDD4] hover:bg-white/10'
                                  : 'text-[#392A22] hover:bg-[#392A22]/10',
                              )}
                            >
                              {childImageSrc ? (
                                <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-[#fff9f5]">
                                  <Image
                                    src={childImageSrc}
                                    alt={child.name}
                                    fill
                                    className="object-cover"
                                  />
                                </span>
                              ) : null}
                              <span className="truncate">{child.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    );
                  })}

                  {shopDropdownProducts.length > 0 && (
                    <div className="flex flex-1 flex-col gap-4 border-l border-white/10 pl-10">
                      {activeCategory?.image?.src && (
                        <div className="relative h-20 w-full overflow-hidden rounded-lg">
                          <Image
                            src={activeCategory.image.src}
                            alt={activeCategory.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="grid flex-1 grid-cols-4 gap-6">
                        {shopDropdownProducts.map((product: any) => {
                          return (
                            <Link
                              key={product.id}
                              href={fixProductHref(product.href)}
                              title={product.title}
                              className="flex flex-col gap-2"
                            >
                              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#F5F0EB]">
                                <Image
                                  src={product.image}
                                  alt={product.title}
                                  fill
                                  className="object-cover transition-transform group-hover/product:scale-105"
                                />
                              </div>
                              <span
                                className={cn(
                                  'truncate text-sm',
                                  isHome ? 'text-[#E9DDD4]' : 'text-[#392A22]',
                                )}
                              >
                                {product.title}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }
        const hasRealGroups =
          Array.isArray(item.groups) &&
          item.groups.some(
            (group: any) =>
              Array.isArray(group.links) && group.links.length > 0,
          );

        if (!hasRealGroups) {
          return (
            <Link
              key={item.title}
              href={item.href}
              aria-label={`Go to ${item.title}`}
              title={item.title}
              className={baseLinkClass}
            >
              {item.title}
            </Link>
          );
        }

        const dynamicProducts =
          item.title === 'Tyngdetæpper'
            ? getProductsByCategory(tyngdedynerCategory?.id ?? null, 4)
            : item.title === 'Tilbehør'
              ? getProductsByCategory(sovevaerelseCategory?.id ?? null, 4)
              : item.products || [];

        const hasProducts = dynamicProducts.length > 0;

        return (
          <div
            key={item.title}
            className={cn('group', hasProducts ? 'static' : 'relative')}
          >
            <Link
              href={item.href}
              aria-label={`${item.title} menu`}
              aria-haspopup="menu"
              title={item.title}
              className={cn('flex items-center gap-1', baseLinkClass)}
            >
              {item.title}
              <ChevronDown
                aria-hidden="true"
                className="size-3.5 transition-transform group-hover:rotate-180"
              />
            </Link>
            <div
              role="menu"
              aria-label={`${item.title} submenu`}
              className={cn(
                'invisible absolute top-full left-0 z-[9999] opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100',
                hasProducts ? 'inset-x-0 border-t' : 'rounded-xl',
                isHome
                  ? 'border-white/10 bg-[#392A22]'
                  : 'border-[#392A22]/10 bg-[#fff9f5] shadow-lg',
              )}
            >
              <div
                className={cn(
                  hasProducts
                    ? 'flex w-full gap-12 px-6 py-8'
                    : 'inline-flex min-w-[280px] flex-col rounded-xl p-5',
                  !hasProducts &&
                    (isHome ? 'bg-[#392A22]' : 'bg-[#fff9f5] shadow-lg'),
                )}
              >
                {item.groups.map((group: any) => (
                  <div
                    key={group.heading}
                    className="flex min-w-[280px] max-w-[350px] flex-col gap-1"
                  >
                    <span
                      title={group.heading}
                      className={cn(
                        'mb-2 block text-xs font-medium uppercase tracking-wide whitespace-normal break-words',
                        isHome ? 'text-[#E9DDD4]/60' : 'text-[#392A22]/50',
                      )}
                    >
                      {group.heading}
                    </span>

                    {group.links.map((category: any) => {
                      const hasSubChildren =
                        category.children && category.children.length > 0;

                      return (
                        <div
                          key={category.id || category.title}
                          className="group/sub relative"
                        >
                          <Link
                            href={
                              category.href ||
                              `/collections/${slugify(item.title)}/${slugify(
                                category.title || category.name,
                              )}`
                            }
                            role="menuitem"
                            title={category.name || category.title}
                            className={cn(
                              'flex items-start gap-3 rounded-lg py-2 text-sm transition-colors justify-between pr-2',
                              isHome
                                ? 'text-[#E9DDD4] hover:bg-white/10'
                                : 'text-[#392A22] hover:bg-[#392A22]/10',
                            )}
                          >
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              {(category?.image?.src || category?.image) && (
                                <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-[#F5F0EB]">
                                  <Image
                                    src={
                                      category?.image?.src || category?.image
                                    }
                                    alt={category.name || category.title}
                                    fill
                                    className="object-cover"
                                  />
                                </span>
                              )}

                              <span className="whitespace-normal break-words leading-snug">
                                {category.name || category.title}
                              </span>
                            </div>

                            {hasSubChildren && (
                              <ChevronDown className="-rotate-90 mt-1 shrink-0 size-3.5 transition-transform" />
                            )}
                          </Link>

                          {hasSubChildren && (
                            <div
                              className={cn(
                                'absolute left-full top-0 ml-1 invisible opacity-0 group-hover/sub:visible group-hover/sub:opacity-100 transition-all z-[10000] rounded-xl p-3 min-w-[280px] max-w-[350px]',
                                isHome
                                  ? 'bg-[#392A22] border border-white/10'
                                  : 'bg-[#fff9f5] shadow-lg border border-[#392A22]/10',
                              )}
                            >
                              <div className="flex flex-col gap-1">
                                {category.children.map((child: any) => (
                                  <Link
                                    key={child.title || child.name}
                                    href={child.href || '#'}
                                    className={cn(
                                      'flex items-start gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                                      isHome
                                        ? 'text-[#E9DDD4] hover:bg-white/10'
                                        : 'text-[#392A22] hover:bg-[#392A22]/10',
                                    )}
                                  >
                                    <span className="whitespace-normal break-words leading-snug">
                                      {child.title || child.name}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}

                {hasProducts && (
                  <div className="grid flex-1 grid-cols-4 gap-6">
                    {dynamicProducts.map((product: any) => (
                      <Link
                        key={product.title}
                        href={fixProductHref(product.href)}
                        title={product.title}
                        className="group/product flex flex-col gap-2"
                      >
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#F5F0EB]">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform group-hover/product:scale-105"
                          />
                        </div>

                        <span
                          className={cn(
                            'truncate text-sm',
                            isHome ? 'text-[#E9DDD4]' : 'text-[#392A22]',
                          )}
                        >
                          {product.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default Navigation;
