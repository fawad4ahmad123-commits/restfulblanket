'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FaqItem } from '../types';

interface ProductFaqAccordionProps {
  items: FaqItem[];
  defaultOpenId?: string;
}

const formatBodyToHtml = (body: string) => {
  if (!body) return '';
  if (/<[a-z][\s\S]*>/i.test(body)) {
    return body;
  }
  const lines = body.split(/\r?\n/);
  let html = '';
  let inList = false;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      return;
    }
    const isBullet =
      trimmed.startsWith('•') ||
      trimmed.startsWith('-') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('✅');

    if (isBullet) {
      if (!inList) {
        html += '<ul class="list-disc pl-5 space-y-1 mb-3">';
        inList = true;
      }
      let content = trimmed.replace(/^[•\-*✅]\s*/, '');
      const prefix = trimmed.startsWith('✅') ? '✅ ' : '';
      html += `<li>${prefix}${content}</li>`;
    } else {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      html += `<p class="mb-2">${trimmed}</p>`;
    }
  });

  if (inList) {
    html += '</ul>';
  }

  return html;
};

const ProductFaqAccordion = ({ items }: ProductFaqAccordionProps) => {
  const [openId, setOpenId] = useState<string | null>(null);
  if (!items.length) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-[#E9DDD4] bg-[#fdf9f6]">
      {items.map((item, index) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={cn(
              index !== items.length - 1 && 'border-b border-[#D8CCC2]',
            )}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-medium text-[#3F3A36]">
                {item.title}
              </span>

              <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#3F3A36]">
                {isOpen ? (
                  <Minus className="h-3.5 w-3.5" />
                ) : (
                  <Plus className="h-3.5 w-3.5" />
                )}
              </span>
            </button>

            <div
              className={cn(
                'grid overflow-hidden transition-all duration-300 ease-in-out',
                isOpen
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="min-h-0">
                {item.body && (
                  <div
                    className="px-5 pb-4 text-sm leading-relaxed text-[#392A22] space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-2 [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{
                      __html: formatBodyToHtml(item.body),
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductFaqAccordion;
