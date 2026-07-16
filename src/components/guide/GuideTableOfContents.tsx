'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TocItem } from '@/src/types/wp';

interface GuideTableOfContentsProps {
  items: TocItem[];
}

export function GuideTableOfContents({ items }: GuideTableOfContentsProps) {
  const [open, setOpen] = useState(true);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Indholdsfortegnelse"
      className="mx-auto mt-8 max-w-6xl rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 sm:px-6"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 py-1 text-left font-semibold text-neutral-900"
        aria-expanded={open}
      >
        <span>📖 Indholdsfortegnelse</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && (
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-neutral-700">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="underline-offset-2 hover:text-emerald-700 hover:underline"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
