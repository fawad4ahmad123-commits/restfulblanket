'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Search, User, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '../constant';

const MobileView = ({ wishlistCount }: { wishlistCount: number }) => {
  const pathname = usePathname();
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <nav
      aria-label="Mobile navigation"
      className="flex flex-col flex-1 h-full min-h-0"
    >
      <div className="flex-1">
        {navigation.map((item: any) => {
          const isActive = pathname === item.href;
          const hasGroups = item.groups?.length > 0;
          const hasChildren = item.children?.length > 0;
          const hasDropdown = hasGroups || hasChildren;
          const isOpen = openItem === item.title;

          if (!hasDropdown) {
            return (
              <Link
                key={item.title}
                href={item.href}
                aria-label={`Go to ${item.title}`}
                title={item.title}
                className={`flex border-b border-[#E9DDD4]/60 py-4 text-base font-medium transition-colors text-[#35281E] hover:text-[#35281E]/70`}
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
