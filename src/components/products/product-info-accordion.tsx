import * as React from "react";
import { ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductInfoSection } from "./types";
import { WhyRestfulBlanketContent } from "./why-restful-blanket-content";

interface ProductInfoAccordionProps {
  sections: ProductInfoSection[];
}

const ProductInfoAccordion = ({ sections }: ProductInfoAccordionProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="rounded-2xl border border-[#E3DCCD] px-4"
    >
      {sections.map((section) => (
        <AccordionItem
          key={section.id}
          value={section.id}
          className="border-b last:border-b-0"
        >
          <AccordionTrigger
            className="py-5 text-left hover:no-underline"
            aria-label={`Toggle ${section.title}`}
          >
            <span className="flex items-center gap-3 font-medium text-[#3F3A36]">
              <ShieldCheck className="h-5 w-5 shrink-0" aria-hidden="true" />
              {section.title}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            {section.id === sections[0]?.id ? (
              <WhyRestfulBlanketContent />
            ) : (
              <div className="text-sm leading-6 text-[#6F6860]">
                {section.body}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
export default ProductInfoAccordion;
