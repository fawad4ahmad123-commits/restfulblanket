'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { navigation } from '../constant';
import { cn } from '@/lib/utils';

const Navigation = ({ isHome = true }: { isHome?: boolean }) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="hidden items-center gap-6 lg:flex xl:gap-8"
    >
      {navigation.map((item: any) => {
        const isActive = pathname === item.href;
        const hasGroups = item.groups?.length > 0;
        const hasChildren = item.children?.length > 0;
        const hasProducts = item.products?.length > 0;
        const hasDropdown = hasGroups || hasChildren;

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

        if (!hasDropdown) {
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

        return (
          <div key={item.title} className="group static">
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
                'invisible absolute inset-x-0 top-full z-[9999] opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100',
                hasProducts ? 'border-t' : 'flex justify-start',
                isHome
                  ? 'border-white/10 bg-[#392A22]'
                  : 'border-[#392A22]/10 bg-white shadow-lg',
              )}
            >
              <div
                className={cn(
                  'mx-auto flex max-w-[1400px] gap-12 px-6 py-8',
                  !hasProducts && 'inline-flex w-auto rounded-xl border p-5',
                  !hasProducts &&
                    (isHome
                      ? 'border-white/10 bg-[#392A22]'
                      : 'border-[#392A22]/10 bg-white shadow-lg'),
                )}
              >
                {item.groups.map((group: any) => (
                  <div
                    key={group.heading}
                    className="flex min-w-[180px] flex-col gap-1"
                  >
                    <span
                      className={cn(
                        'mb-2 whitespace-nowrap text-xs font-medium uppercase tracking-wide',
                        isHome ? 'text-[#E9DDD4]/60' : 'text-[#392A22]/50',
                      )}
                    >
                      {group.heading}
                    </span>
                    {group.links.map((link: any) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        role="menuitem"
                        aria-label={`Go to ${link.title}`}
                        title={link.title}
                        className={cn(
                          'block whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors',
                          isHome
                            ? 'text-[#E9DDD4] hover:bg-white/10'
                            : 'text-[#392A22] hover:bg-[#392A22]/10',
                        )}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                ))}

                {hasProducts && (
                  <div className="grid flex-1 grid-cols-4 gap-6">
                    {item.products.map((product: any) => (
                      <Link
                        key={product.title}
                        href={product.href}
                        role="menuitem"
                        aria-label={`Go to ${product.title}`}
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
                            'text-sm',
                            isHome ? 'text-[#E9DDD4]' : 'text-[#392A22]',
                          )}
                        >
                          {product.title}
                        </span>
                        <span
                          className={cn(
                            'text-sm',
                            isHome ? 'text-[#E9DDD4]/60' : 'text-[#392A22]/60',
                          )}
                        >
                          {product.price}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {!hasProducts && !item.groups.length && hasChildren && (
                  <div className="flex flex-col gap-1">
                    {item.children.map((child: any) => (
                      <Link
                        key={child.title}
                        href={child.href}
                        role="menuitem"
                        aria-label={`Go to ${child.title}`}
                        title={child.title}
                        className={cn(
                          'block whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors',
                          isHome
                            ? 'text-[#E9DDD4] hover:bg-white/10'
                            : 'text-[#392A22] hover:bg-[#392A22]/10',
                        )}
                      >
                        {child.title}
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
