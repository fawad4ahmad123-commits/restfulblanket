'use client';

import Image from 'next/image';
import { CalendarDays, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BlogCard as BlogCardProps } from '../types';

const BlogCard = ({
  image,
  author,
  authorImage,
  title,
  excerpt,
  date,
  views,
  slug,
}: BlogCardProps) => {
  const router = useRouter();

  return (
    <article className="group flex h-full flex-col">
      <div className="relative overflow-hidden rounded-[28px]">
        <div className="relative h-[320px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#f7f2ee] px-3 py-2 shadow-md">
          <Image
            src={authorImage}
            alt={`${author} profile photo`}
            width={34}
            height={34}
            className="rounded-full"
          />

          <span className="text-sm text-[#3b281f]">{author}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-2 pt-5">
        <h3 className="line-clamp-2 min-h-[68px] font-serif text-[32px] leading-[1.05] text-[#3b281f]">
          {title}
        </h3>

        <p className="mt-3 line-clamp-2 min-h-[56px] text-sm leading-7 text-[#85776d]">
          {excerpt}
        </p>

        <div className="mt-5 border-t border-[#d9cec5] pt-4 pb-3">
          <div className="flex items-center gap-6 text-sm text-[#85776d]">
            <div
              className="flex items-center gap-2"
              aria-label={`Published on ${date}`}
            >
              <CalendarDays size={16} />
              {date}
            </div>

            <div
              className="flex items-center gap-2"
              aria-label={`${views} views`}
            >
              <Eye size={16} />
              {views}
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label={`Read more about ${title}`}
          title={`Read more about ${title}`}
          onClick={() => router.push(`/blog-detail/${slug}`)}
          className="mt-6 w-full rounded-full bg-[#3b281f] py-4 text-sm font-medium text-white transition hover:bg-[#3b281f] hover:text-white md:mt-auto md:bg-[#e6dbd0] md:text-[#3b281f]"
        >
          Read More
        </button>
      </div>
    </article>
  );
};

export default BlogCard;
