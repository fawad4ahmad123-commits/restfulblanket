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
    <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
      {navigation.map((item: any) => {
        const isActive = pathname === item.href;
        const hasChildren = item.children?.length > 0;
        const isOpen = openItem === item.title;

        if (!hasChildren) {
          return (
            <Link
              key={item.title}
              href={item.href}
              aria-label={`Go to ${item.title}`}
              title={item.title}
              className={`border-b pb-3 text-base font-medium transition-colors hover:text-foreground/70 ${
                isActive ? 'text-foreground' : 'text-foreground/80'
              }`}
            >
              {item.title}
            </Link>
          );
        }

        return (
          <div key={item.title} className="border-b pb-3">
            <button
              type="button"
              aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${item.title} menu`}
              aria-expanded={isOpen}
              aria-controls={`submenu-${item.title}`}
              onClick={() => setOpenItem(isOpen ? null : item.title)}
              className={`flex w-full items-center justify-between text-base font-medium transition-colors hover:text-foreground/70 ${
                isActive ? 'text-foreground' : 'text-foreground/80'
              }`}
            >
              {item.title}
              <ChevronDown
                aria-hidden="true"
                className={`size-4 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div
                id={`submenu-${item.title}`}
                className="mt-3 flex flex-col gap-3 pl-3"
              >
                {item.children.map((child: any) => (
                  <Link
                    key={child.title}
                    href={child.href}
                    aria-label={`Go to ${child.title}`}
                    title={child.title}
                    className="text-sm text-foreground/80 hover:text-foreground/70"
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="flex items-center gap-4 pt-2">
        <Button
          size="icon"
          variant="ghost"
          aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`}
          title="Wishlist"
          className="relative"
        >
          <Heart aria-hidden="true" className="size-5" />
          {wishlistCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F5F0EB] text-[10px] font-semibold text-[#392A22]"
            >
              {wishlistCount}
            </span>
          )}
        </Button>

        <Button
          size="icon"
          variant="ghost"
          aria-label="Search products"
          title="Search products"
        >
          <Search aria-hidden="true" className="size-5" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          aria-label="My account"
          title="My account"
        >
          <User aria-hidden="true" className="size-5" />
        </Button>
      </div>
    </nav>
  );
};

export default MobileView;
