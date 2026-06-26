import Image from 'next/image';
import { Quote } from 'lucide-react';
import { AUTHOR_CARD } from '../constants';

export default function AuthorCard() {
  return (
    <div className="relative rounded-[24px] border border-[#EFE8E2] bg-[#F8F3EE] p-8">
      <Quote className="absolute right-8 top-8 h-12 w-12 text-[#E6D7CB]" />

      <p className="max-w-4xl font-serif text-[30px] italic leading-[42px] text-[#4A4039]">
        {AUTHOR_CARD.quote}
      </p>

      <div className="mt-8 flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={AUTHOR_CARD.image}
            alt={AUTHOR_CARD.name}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h4 className="text-sm font-medium text-[#35281E]">
            {AUTHOR_CARD.name}
          </h4>

          <p className="text-xs text-[#8B817A]">{AUTHOR_CARD.role}</p>
        </div>
      </div>
    </div>
  );
}
