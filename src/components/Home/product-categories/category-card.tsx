'use client';

import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CategoryCardProps {
  image: string;
  title: string;
  subtitle?: string;
  index?: string;
}

const CategoryCard = ({ image, title, subtitle, index }: CategoryCardProps) => {
  const router = useRouter();
  return (
    <div
      className="group relative overflow-hidden rounded-[28px]"
      onClick={() => router.push(`/categories`)}
    >
      <div className="relative h-[420px] sm:h-[500px]">
        <Image
          src={image}
          alt={`${title}${subtitle ? ` - ${subtitle}` : ''}`}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        {index && (
          <div className="absolute left-4 top-4 z-20 rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#3b281f]">
            {index}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        <div className="absolute bottom-6 left-6 z-20">
          {subtitle && (
            <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-white/80">
              {subtitle}
            </p>
          )}

          <h3 className="text-2xl font-medium text-white">{title}</h3>
        </div>

        <button
          type="button"
          aria-label={`View ${title}`}
          title={`View ${title}`}
          className="absolute bottom-6 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
        >
          <ArrowUpRight
            aria-hidden="true"
            size={22}
            className="absolute transition-all duration-300 group-hover:scale-0 group-hover:opacity-0"
          />

          <ArrowRight
            aria-hidden="true"
            size={22}
            className="absolute scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
            onClick={() => router.push(`/categories`)}
          />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
