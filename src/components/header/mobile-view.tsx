'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, ChevronDown, User } from 'lucide-react';
import Link from 'next/link';

import { useMergedNavigation } from '@/src/hooks/use-merged-navigation';
import { useCategories } from '@/src/core/context/category-provider';
import { useAuth } from '@/src/core/context/auth-context';

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

// SAME FLOW AS DESKTOP NAVIGATION
const getNavigationHref = (parentTitle: string, item: any) => {
  if (item?.href) {
    return item.href;
  }

  return `/collections/${slugify(parentTitle)}/${slugify(
    item?.title || item?.name,
  )}`;
};

const MobileView = ({ wishlistCount }: { wishlistCount: number }) => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const navigation = useMergedNavigation();

  const { parentCategories, getChildren } = useCategories();

  const { user, isAuthenticated } = useAuth();

  return (
    <nav
      aria-label="Mobile navigation"
      className="flex h-full min-h-0 flex-1 flex-col"
    >
      <div className="flex-1">
        {navigation.map((item: any) => {
          const isOpen = openItem === item.title;

          /*
            ALL PRODUCTS
            Same as desktop:
            /shop/category
          */
          if (item.href === '/shop') {
            return (
              <div
                key={item.title}
                className="border-b border-[#E9DDD4]/60 py-4"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenItem(isOpen ? null : item.title)}
                  className="flex w-full items-center justify-between text-base font-medium text-[#35281E]"
                >
                  {item.title}

                  <ChevronDown
                    className={`size-4 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="ml-1 mt-3 flex flex-col gap-3 border-l border-[#E9DDD4] py-1 pl-4">
                    {parentCategories.map((category: any) => {
                      const children = getChildren(category.id);

                      return (
                        <div
                          key={category.id}
                          className="flex flex-col gap-2.5"
                        >
                          <Link
                            href={`/shop/${category.slug}`}
                            className="text-[10px] font-semibold uppercase tracking-wider text-[#35281E]/40"
                          >
                            {category.name}
                          </Link>

                          {children.map((child: any) => (
                            <Link
                              key={child.id}
                              href={`/shop/${child.slug}`}
                              className="text-sm text-[#6F6258]"
                            >
                              {child.name}
                            </Link>
                          ))}
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

          const hasChildren =
            Array.isArray(item.children) && item.children.length > 0;

          const hasDropdown = hasGroups || hasChildren;

          if (!hasDropdown) {
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
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenItem(isOpen ? null : item.title)}
                className="flex w-full items-center justify-between text-base font-medium text-[#35281E]"
              >
                {item.title}

                <ChevronDown
                  className={`size-4 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="ml-1 mt-3 flex flex-col gap-3 border-l border-[#E9DDD4] py-1 pl-4">
                  {hasGroups &&
                    item.groups.map((group: any) => (
                      <div
                        key={group.heading}
                        className="flex flex-col gap-2.5"
                      >
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#35281E]/40">
                          {group.heading}
                        </span>

                        {group.links.map((link: any) => (
                          <Link
                            key={link.title}
                            href={getNavigationHref(item.title, link)}
                            className="text-sm text-[#6F6258]"
                          >
                            {link.title}
                          </Link>
                        ))}
                      </div>
                    ))}

                  {!hasGroups &&
                    item.children?.map((child: any) => (
                      <Link
                        key={child.title}
                        href={getNavigationHref(item.title, child)}
                        className="text-sm text-[#6F6258]"
                      >
                        {child.title}
                      </Link>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-auto shrink-0 pt-6">
        {isAuthenticated ? (
          <Link
            href="/profile"
            className="mb-3 flex items-center gap-3 rounded-full border border-[#E9DDD4] bg-white px-4 py-2.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#35281E] text-xs font-semibold text-white">
              {getInitials(user?.name)}
            </span>

            <span className="text-sm text-[#35281E]">{user?.name}</span>
          </Link>
        ) : (
          <Link href="/signin" className="mb-3 block">
            <Button
              variant="ghost"
              className="h-12 w-full rounded-full border border-[#E9DDD4] text-[#35281E]"
            >
              <User className="size-4" />
              Sign In
            </Button>
          </Link>
        )}

        <Link href="/wishlist">
          <Button className="h-12 w-full rounded-full border border-[#E9DDD4] bg-white text-[#35281E]">
            <Heart className="size-4" />
            Wishlist {wishlistCount}
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default MobileView;
