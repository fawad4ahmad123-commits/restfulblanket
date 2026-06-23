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
import Image from "next/image";
import { cn } from "@/lib/utils";
import { sections } from "./contants";

interface ProductInfoAccordionProps {
  sections: ProductInfoSection[];
}
const trustItems = {
  icon: "/home/shieldIcon.png",
  alt: "90 night guarantee",
  title: "90 nætter",
  subtitle: "Sikkerhed",
  monochrome: true,
};
const ProductInfoAccordion = () => {
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
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F7F2EC]"
                aria-hidden="true"
              >
                <Image
                  src={trustItems.icon}
                  alt={trustItems.alt}
                  width={20}
                  height={20}
                  className={cn(
                    "h-5 w-5 md:h-[18px] md:w-[18px]",
                    trustItems.monochrome && "brightness-0",
                  )}
                />
              </div>

              <div className="">
                <span className="block text-[18px] font-medium text-[#3F3A36]">
                  {section.title}
                </span>

                <p className="text-[14px] font-normal leading-5 text-[#8A8377]">
                  Trusted quality. Made for your well-being.
                </p>
              </div>
            </div>
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
