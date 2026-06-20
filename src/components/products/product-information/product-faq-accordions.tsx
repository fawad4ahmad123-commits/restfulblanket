"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaqItem } from "../types";

interface ProductFaqAccordionProps {
  items: FaqItem[];
  defaultOpenId?: string;
}
const ProductFaqAccordion = ({
  items,
  defaultOpenId,
}: ProductFaqAccordionProps) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  if (!items.length) return null;

  return (
    <div className="divide-y divide-[#E3DCCD] overflow-hidden rounded-xl border border-[#E3DCCD] bg-[#F7F2EA]">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-medium text-[#3F3A36]">
                {item.title}
              </span>
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center text-[#3F3A36]">
                {isOpen ? (
                  <Minus className="h-3.5 w-3.5" />
                ) : (
                  <Plus className="h-3.5 w-3.5" />
                )}
              </span>
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-in-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0">
                {item.body && (
                  <p className="px-5 pb-4 text-sm leading-relaxed text-[#8A8377]">
                    {item.body}
                  </p>
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
