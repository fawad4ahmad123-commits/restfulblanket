'use client';

import Image from 'next/image';
import { ArrowRight, CalendarDays, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const FeaturedArticle = ({ blogs }: any) => {
  const router = useRouter();

  const latestBlog = blogs?.[0];

  if (!latestBlog) return null;

  const { author, authorImage, date, excerpt, image, slug, title, views } =
    latestBlog;

  return (
    <section className="grid items-center gap-[56px] lg:grid-cols-[640px_1fr]">
      <div className="relative h-[436px] overflow-hidden rounded-[24px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="640px"
          className="object-cover"
        />

        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#4A403B]">
          Fremhævet
        </div>
      </div>

      <div className="flex-1">
        <span className="rounded-full border border-[#E4DAD1] px-3 py-1 text-[11px] uppercase tracking-wide text-[#857B74]">
          Seneste artikel
        </span>

        <h2 className="mt-6 max-w-xl font-serif text-[32px] leading-tight text-[#3A2A22]">
          {title}
        </h2>

        <p className="mt-5 max-w-lg text-[16px] leading-7 text-[#8B817A]">
          {excerpt}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[#7D736C]">
          <div className="flex items-center gap-2">
            <div className="relative h-9 w-9 overflow-hidden rounded-full">
              <Image
                src={authorImage}
                alt={author}
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>

            <span>{author}</span>
          </div>

          <span>•</span>

          <div className="flex items-center gap-2">
            <CalendarDays size={15} />
            <span>{date}</span>
          </div>

          <span>•</span>

          <div className="flex items-center gap-2">
            <Eye size={15} />
            <span>{views}</span>
          </div>
        </div>

        <Button
          onClick={() => router.push(`/blog/${slug}`)}
          className="mt-8 h-12 rounded-full bg-[#3A2A22] px-8 hover:bg-[#3A2A22] cursor-pointer"
        >
          Læs hele artiklen
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};
