'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function decodeHtmlEntities(text: string): string {
  if (!text) return '';

  return text
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '…')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rsquo;/g, '’');
}

interface Heading {
  id: string;
  title: string;
  level: number;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-[#E5DDD7] bg-white p-5">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between text-left lg:cursor-default"
        aria-expanded={isOpen}
        aria-controls="toc-list"
      >
        <h3 className="text-sm font-semibold text-[#35281E]">På denne side</h3>

        <ChevronDown
          size={16}
          className={`shrink-0 text-[#6F6259] transition-transform duration-200 lg:hidden ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        id="toc-list"
        className={`grid overflow-hidden transition-all duration-300 ease-in-out lg:!grid-rows-[1fr] lg:!mt-4 lg:opacity-100 ${
          isOpen
            ? 'grid-rows-[1fr] mt-4 opacity-100'
            : 'grid-rows-[0fr] mt-0 opacity-0'
        }`}
      >
        <div className="space-y-3 overflow-hidden">
          {headings.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-xs text-[#6F6259] transition hover:text-[#35281E] ${
                item.level === 3 ? 'pl-4' : ''
              } ${item.level === 4 ? 'pl-8' : ''}`}
            >
              {decodeHtmlEntities(item.title)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
