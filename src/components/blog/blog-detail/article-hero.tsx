import Image from 'next/image';
import { Calendar, Eye } from 'lucide-react';
import { ARTICLE_HERO } from '../constants';

export default function ArticleHero() {
  return (
    <section className="mb-20">
      {/* Breadcrumb */}
      <div className="mb-10 text-xs text-[#8D837B]">
        Home
        <span className="mx-2">›</span>
        Blogs
        <span className="mx-2">›</span>
        <span>{ARTICLE_HERO.title}</span>
      </div>

      <div className="mx-auto max-w-3xl text-center">
        {/* Category */}
        <span className="inline-flex rounded-full bg-[#35281E] px-4 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
          {ARTICLE_HERO.category}
        </span>

        {/* Title */}
        <h1 className="mt-6 font-serif text-[56px] leading-[1.1] text-[#35281E]">
          {ARTICLE_HERO.title}
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-7 text-[#736760]">
          {ARTICLE_HERO.description}
        </p>

        {/* Meta */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[#736760]">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 overflow-hidden rounded-full">
              <Image
                src={ARTICLE_HERO.authorImage}
                alt={ARTICLE_HERO.author}
                width={28}
                height={28}
                className="h-full w-full object-cover"
              />
            </div>

            <span>{ARTICLE_HERO.author}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{ARTICLE_HERO.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <Eye size={14} />
            <span>{ARTICLE_HERO.views}</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="mx-auto mt-14 max-w-5xl">
        <div className="relative aspect-[16/8] overflow-hidden rounded-[28px]">
          <Image
            src={ARTICLE_HERO.image}
            alt={ARTICLE_HERO.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
        </div>
      </div>
    </section>
  );
}
