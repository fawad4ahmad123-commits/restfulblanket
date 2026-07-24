'use client';

import Image from 'next/image';
import { CalendarDays } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BlogCard as BlogCardProps } from '../types';

const BlogCard = ({
  image,
  author,
  authorImage,
  title,
  excerpt,
  date,
  slug,
}: BlogCardProps) => {
  const router = useRouter();

  return (
    <article className="group flex h-full w-full flex-col">
      <div className="relative overflow-hidden rounded-[28px]">
        <div className="relative h-[320px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-2 pt-5">
        <h3 className="line-clamp-2 min-h-[68px] font-serif text-[32px] leading-[1.05] text-[#3b281f]">
          {title}
        </h3>

        <p className="mt-3 line-clamp-2 min-h-[56px] text-sm leading-7 text-[#85776d]">
          {excerpt}
        </p>

        <div className="mt-5 border-t border-[#d9cec5] pt-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 text-sm text-[#85776d]"
              aria-label={`Published on ${date}`}
            >
              <CalendarDays size={16} />
              <span>{date}</span>
            </div>

            <div
              className="flex items-center gap-2"
              aria-label={`Author: ${author}`}
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image
                  src={authorImage || image}
                  alt={author}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>

              <span className="text-sm text-[#3b281f]">{author}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label={`Read more about ${title}`}
          title={`Read more about ${title}`}
          onClick={() => router.push(`/blog/${slug}`)}
          className="mt-6 w-full cursor-pointer rounded-full bg-[#E9DDD4] py-4 text-sm font-medium text-[#35281E] transition hover:bg-[#2a1c15] hover:text-white"
        >
          Læs mere
        </button>
      </div>
    </article>
  );
};

export default BlogCard;
