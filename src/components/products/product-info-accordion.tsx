import * as React from 'react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { WhyRestfulBlanketContent } from './why-restful-blanket-content';
import { cn } from '@/lib/utils';
import { sections } from './contants';

interface ProductInfoAccordionProps {
  activeAccordion: string | null;
  setActiveAccordion: (value: string | null) => void;
}

const trustItems = {
  icon: '/home/shieldIcon.png',
  alt: '90 night guarantee',
  title: '90 nætter',
  subtitle: 'Sikkerhed',
  monochrome: true,
};

const ProductInfoAccordion = ({
  activeAccordion,
  setActiveAccordion,
}: ProductInfoAccordionProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      value={activeAccordion || ''}
      onValueChange={(value) => setActiveAccordion(value || null)}
      className="
        rounded-2xl 
        border 
        border-[#E3DCCD] 
        px-3 
        sm:px-4 
        xl:px-5
      "
    >
      {sections.map((section) => (
        <AccordionItem
          key={section.id}
          value={section.id}
          className="border-b last:border-b-0"
        >
          <AccordionTrigger
            className="
              py-4 
              sm:py-5 
              xl:py-6
              text-left 
              hover:no-underline
            "
          >
            <div className="flex items-center gap-3 xl:gap-4">
              {/* Icon */}
              <div
                className="
                  flex 
                  h-10 
                  w-10 
                  sm:h-11 
                  sm:w-11 
                  xl:h-12 
                  xl:w-12
                  shrink-0 
                  items-center 
                  justify-center 
                  rounded-full 
                  bg-[#F7F2EC]
                "
              >
                <Image
                  src={trustItems.icon}
                  alt={trustItems.alt}
                  width={20}
                  height={20}
                  className={cn(
                    'h-4 w-4 xl:h-5 xl:w-5',
                    trustItems.monochrome && 'brightness-0',
                  )}
                />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <span
                  className="
                    block 
                    text-base 
                    xl:text-[18px]
                    font-medium 
                    text-[#3F3A36]
                  "
                >
                  {section.title}
                </span>

                <p
                  className="
                    text-xs 
                    sm:text-sm 
                    xl:text-[14px]
                    leading-5 
                    text-[#8A8377]
                  "
                >
                  Pålidelig kvalitet. Skabt til dit velvære.
                </p>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent
            className="
              pb-5
              xl:pb-7
            "
          >
            {section.id === sections[0]?.id ? (
              <WhyRestfulBlanketContent />
            ) : (
              <div
                className="
                  text-sm
                  xl:text-base
                  leading-6
                  text-[#6F6860]
                "
              >
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
