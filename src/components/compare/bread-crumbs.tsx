import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BREADCRUMB_ITEMS } from './constants';

export function BreadcrumbNav() {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-[#35281E]">
      <ol className="flex items-center gap-1.5">
        {BREADCRUMB_ITEMS.map((item, index) => {
          const isLast = index === BREADCRUMB_ITEMS.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="text-stone-700">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-stone-700">
                  {item.label}
                </Link>
              )}
              {!isLast && <ChevronRight className="h-3 w-3 text-stone-400" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
