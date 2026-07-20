'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useMergedNavigation } from '@/src/hooks/use-merged-navigation';
import { useCategories } from '@/src/core/context/category-provider';
import { useAuth } from '@/src/core/context/auth-context';

const MAX_SUB_CATEGORIES = 4;

const getInitials = (name?: string) =>
  name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || '';

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

const fixProductHref = (href: string) =>
  href.replace(/^\/products\//, '/product/');

const MobileView = ({ wishlistCount }: { wishlistCount: number }) => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [openSubItem, setOpenSubItem] = useState<string | null>(null);
  const [openParentCategory, setOpenParentCategory] = useState<number | null>(
    null,
  );

  const navigation = useMergedNavigation();

  const { categories, parentCategories, getChildren, getProductsByCategory } =
    useCategories();

  const { user, isAuthenticated } = useAuth();

  const tyngdedynerCategory = categories.find(
    (c: any) => c.slug === 'tyngdedyner',
  );

  const sovevaerelseCategory = categories.find(
    (c: any) => c.slug === 'sovevaerelse',
  );

  const resolveCategoryImage = (link: any): string | null => {
    const direct = link?.image?.src || link?.image;
    if (direct) return direct;

    const href: string = link?.href || '';
    const slug = href.split('/').filter(Boolean).pop();
    if (!slug) return null;

    const match = categories.find((c: any) => c.slug === slug);
    return match?.image?.src || match?.image || null;
  };

  const visibleParentCategories = parentCategories.filter(
    (category: any) => getChildren(category.id).length > 0,
  );

  return (
    <nav className="flex h-full flex-col">
      <div className="flex-1">
        {navigation.map((item: any) => {
          const isOpen = openItem === item.title;

          if (item.href === '/shop') {
            return (
              <div
                key={item.title}
                className="border-b border-[#E9DDD4]/60 py-4"
              >
                <button
                  onClick={() => setOpenItem(isOpen ? null : item.title)}
                  className="flex w-full items-center justify-between text-base font-medium text-[#35281E]"
                >
                  Alle Produkter
                  <ChevronDown
                    className={`size-4 text-[#E9DDD4] transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="mt-4 ml-3 flex flex-col gap-1 border-l border-[#E9DDD4] pl-4">
                    {visibleParentCategories.map((category: any) => {
                      const children = getChildren(category.id);
                      const isCategoryOpen = openParentCategory === category.id;

                      return (
                        <div key={category.id} className="flex flex-col">
                          <button
                            onClick={() =>
                              setOpenParentCategory(
                                isCategoryOpen ? null : category.id,
                              )
                            }
                            className="flex w-full items-center justify-between py-2 text-xs font-semibold uppercase text-[#35281E]/50"
                          >
                            {category.name}
                            <ChevronDown
                              className={`size-3.5 shrink-0 transition-transform ${
                                isCategoryOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {isCategoryOpen && (
                            <div className="mb-2 flex flex-col gap-2">
                              {children
                                .slice(0, MAX_SUB_CATEGORIES)
                                .map((child: any) => {
                                  const childImageSrc = child?.image?.src;

                                  return (
                                    <Link
                                      key={child.id}
                                      href={`/shop/${child.slug}`}
                                      className="flex items-center gap-3 text-sm text-[#35281E]"
                                    >
                                      {childImageSrc && (
                                        <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-white">
                                          <Image
                                            src={childImageSrc}
                                            alt={child.name}
                                            fill
                                            className="object-cover"
                                          />
                                        </span>
                                      )}
                                      {child.name}
                                    </Link>
                                  );
                                })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const hasGroups =
            Array.isArray(item.groups) && item.groups.length > 0;

          const dynamicProducts =
            item.title === 'Tyngdedyner'
              ? getProductsByCategory(tyngdedynerCategory?.id ?? null, 4)
              : item.title === 'Tilbehør'
                ? getProductsByCategory(sovevaerelseCategory?.id ?? null, 4)
                : item.products || [];

          const hasProducts = dynamicProducts.length > 0;

          if (!hasGroups && !hasProducts) {
            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex border-b border-[#E9DDD4]/60 py-4 text-base font-medium text-[#35281E]"
              >
                {item.title}
              </Link>
            );
          }
          return (
            <div key={item.title} className="border-b border-[#E9DDD4]/60 py-4">
              <button
                onClick={() => setOpenItem(isOpen ? null : item.title)}
                className="flex w-full items-center justify-between text-base font-medium text-[#35281E]"
              >
                {item.title}
                <ChevronDown
                  className={`size-4 text-[#E9DDD4] transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="mt-4 ml-3 flex flex-col gap-5 border-l border-[#E9DDD4] pl-4">
                  {hasGroups &&
                    item.groups.map((group: any) => (
                      <div key={group.heading}>
                        <span className="text-xs font-semibold uppercase text-[#35281E]/50">
                          {group.heading}
                        </span>
                        <div className="mt-2 flex flex-col gap-1">
                          {group.links
                            .slice(0, MAX_SUB_CATEGORIES)
                            .map((link: any) => {
                              const hasSubChildren =
                                link.children && link.children.length > 0;
                              const subKey = `${item.title}-${link.title}`;
                              const isSubOpen = openSubItem === subKey;
                              const linkImageSrc = resolveCategoryImage(link);

                              return (
                                <div key={link.title} className="flex flex-col">
                                  {hasSubChildren ? (
                                    <>
                                      <button
                                        onClick={() =>
                                          setOpenSubItem(
                                            isSubOpen ? null : subKey,
                                          )
                                        }
                                        className="flex w-full items-center justify-between gap-3 rounded-lg py-2 text-sm text-[#35281E]"
                                      >
                                        <span className="flex items-center gap-3">
                                          {linkImageSrc && (
                                            <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-white">
                                              <Image
                                                src={linkImageSrc}
                                                alt={link.title}
                                                fill
                                                className="object-cover"
                                              />
                                            </span>
                                          )}
                                          {link.title}
                                        </span>
                                        <ChevronDown
                                          className={`size-3.5 shrink-0 text-[#E9DDD4] transition-transform ${
                                            isSubOpen ? 'rotate-180' : ''
                                          }`}
                                        />
                                      </button>
                                      {isSubOpen && (
                                        <div className="ml-3 mt-1 flex flex-col gap-2 border-l border-[#E9DDD4] pl-3">
                                          {link.children.map((child: any) => (
                                            <Link
                                              key={child.title}
                                              href={child.href || '#'}
                                              className="text-sm text-[#35281E]"
                                            >
                                              {child.title}
                                            </Link>
                                          ))}
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <Link
                                      href={
                                        link.href ||
                                        `/collections/${slugify(item.title)}/${slugify(link.title)}`
                                      }
                                      className="flex items-center gap-3 rounded-lg py-2 text-sm text-[#35281E]"
                                    >
                                      {linkImageSrc && (
                                        <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-white">
                                          <Image
                                            src={linkImageSrc}
                                            alt={link.title}
                                            fill
                                            className="object-cover"
                                          />
                                        </span>
                                      )}
                                      {link.title}
                                    </Link>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    ))}
                  {hasProducts && (
                    <div>
                      <span className="text-xs font-semibold uppercase text-[#35281E]/50">
                        Produkter
                      </span>
                      <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                        {dynamicProducts.map((product: any) => (
                          <Link
                            key={product.id || product.title}
                            href={fixProductHref(product.href)}
                            className="flex w-24 shrink-0 flex-col gap-2"
                          >
                            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#F5F0EB]">
                              <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="line-clamp-2 text-xs text-[#35281E]">
                              {product.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-auto pt-6">
        {isAuthenticated ? (
          <Link
            href="/profile"
            className="mb-3 flex items-center gap-3 rounded-full border border-[#E9DDD4] bg-white p-3 text-[#35281E]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#35281E] text-xs text-[#FFF9F5]">
              {getInitials(user?.name)}
            </span>
            {user?.name}
          </Link>
        ) : (
          <Link href="/signin">
            <Button className="h-12 w-full rounded-full bg-[#35281E] text-[#FFF9F5]">
              <User className="size-4" />
              Sign In
            </Button>
          </Link>
        )}
        <Link href="/wishlist">
          <Button className="mt-3 h-12 w-full rounded-full border border-[#E9DDD4] bg-white text-[#35281E]">
            <Heart className="size-4" />
            Wishlist {wishlistCount}
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default MobileView;
