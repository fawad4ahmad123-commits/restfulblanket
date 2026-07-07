'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, ChevronDown, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '../constant';
import { useCategories } from '@/src/core/context/category-provider';
import { useAuth } from '@/src/core/context/auth-context';

const getInitials = (name?: string) =>
  name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';

const MobileView = ({ wishlistCount }: { wishlistCount: number }) => {
  const pathname = usePathname();
  const [openItem, setOpenItem] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const { parentCategories, getChildren } = useCategories();

  return (
    <nav
      aria-label="Mobile navigation"
      className="flex flex-col flex-1 h-full min-h-0"
    >
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
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls="submenu-all-products"
                  onClick={() => setOpenItem(isOpen ? null : item.title)}
                  className="flex w-full items-center justify-between text-base font-medium transition-colors text-[#35281E] hover:text-[#35281E]/70"
                >
                  {item.title}

                  <ChevronDown
                    aria-hidden="true"
                    className={`size-4 text-[#35281E] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id="submenu-all-products"
                    className="mt-3 flex flex-col gap-3 border-l border-[#E9DDD4] pl-4 ml-1 py-1"
                  >
                    {parentCategories.map((category: any) => {
                      const children = getChildren(category.id);

                      return (
                        <div
                          key={category.id}
                          className="flex flex-col gap-2.5"
                        >
                          <Link
                            href={`/shop?slug=${category.slug}`}
                            className="text-[10px] font-semibold uppercase tracking-wider text-[#35281E]/40"
                          >
                            {category.name}
                          </Link>

                          {children.map((child: any) => (
                            <Link
                              key={child.id}
                              href={`/shop?slug=${child.slug}`}
                              className="text-sm font-normal text-[#6F6258] hover:text-[#35281E]"
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
          const hasGroups = item.groups?.length > 0;
          const hasChildren = item.children?.length > 0;
          const hasDropdown = hasGroups || hasChildren;
          if (!hasDropdown) {
            return (
              <Link
                key={item.title}
                href={item.href}
                aria-label={`Go to ${item.title}`}
                title={item.title}
                className="flex border-b border-[#E9DDD4]/60 py-4 text-base font-medium transition-colors text-[#35281E] hover:text-[#35281E]/70"
              >
                {item.title}
              </Link>
            );
          }
          return (
            <div key={item.title} className="border-b border-[#E9DDD4]/60 py-4">
              <button
                type="button"
                aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${item.title} menu`}
                aria-expanded={isOpen}
                aria-controls={`submenu-${item.title}`}
                onClick={() => setOpenItem(isOpen ? null : item.title)}
                className="flex w-full items-center justify-between text-base font-medium transition-colors text-[#35281E] hover:text-[#35281E]/70"
              >
                {item.title}

                <ChevronDown
                  aria-hidden="true"
                  className={`size-4 text-[#35281E] transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div
                  id={`submenu-${item.title}`}
                  className="mt-3 flex flex-col gap-3 border-l border-[#E9DDD4] pl-4 ml-1 py-1"
                >
                  {hasGroups
                    ? item.groups.map((group: any) => (
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
                              href={link.href}
                              aria-label={`Go to ${link.title}`}
                              title={link.title}
                              className="text-sm font-normal text-[#6F6258] hover:text-[#35281E]"
                            >
                              {link.title}
                            </Link>
                          ))}
                        </div>
                      ))
                    : item.children.map((child: any) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          aria-label={`Go to ${child.title}`}
                          title={child.title}
                          className="text-sm font-normal text-[#6F6258] hover:text-[#35281E]"
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
      <div className="mt-auto pt-6 shrink-0">
        {isAuthenticated ? (
          <Link
            href="/profile"
            aria-label={`${user?.name} profile`}
            title="My profile"
            className="flex items-center gap-3 rounded-full border border-[#E9DDD4] bg-white px-4 py-2.5 mb-3 transition-colors hover:bg-[#35281E]/5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#35281E] text-xs font-semibold text-white shrink-0">
              {getInitials(user?.name)}
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-[#35281E]">
                {user?.name}
              </span>
              <span className="text-xs text-[#6F6258]">Restful Member</span>
            </span>
          </Link>
        ) : (
          <Link href="/signin" className="w-full block mb-3">
            <Button
              variant="ghost"
              aria-label="Sign in or manage account"
              title="My account"
              className="w-full h-12 rounded-full border border-[#E9DDD4] bg-white text-[#35281E] hover:bg-[#35281E] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-none cursor-pointer"
            >
              <User aria-hidden="true" className="size-4" />
              Sign In
            </Button>
          </Link>
        )}

        <Link href="/wishlist" className="w-full block">
          <Button className="w-full h-12 rounded-full border border-[#E9DDD4] bg-white text-[#35281E] hover:bg-[#35281E] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-none cursor-pointer">
            <Heart aria-hidden="true" className="size-4" />
            Wishlist
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default MobileView;
