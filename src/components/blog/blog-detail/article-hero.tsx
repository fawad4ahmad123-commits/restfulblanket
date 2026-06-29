import Image from 'next/image';
import { Calendar, Eye } from 'lucide-react';

export default function ArticleHero({ data }: any) {
  const {
    author,
    authorImage,
    category,
    date,
    description,
    image,
    title,
    views,
  } = data;

  return (
    <section className="mb-20">
      <div className="mb-10 text-xs text-[#8D837B]">
        Home
        <span className="mx-2">›</span>
        Blogs
        <span className="mx-2">›</span>
        <span>{title}</span>
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full bg-[#35281E] px-4 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
          {category}
        </span>

        <h1 className="mt-6 font-serif text-[56px] leading-[1.1] text-[#35281E]">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-7 text-[#736760]">
          {description}
        </p>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[#736760]">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 overflow-hidden rounded-full">
              <Image
                src={authorImage}
                alt={author}
                width={28}
                height={28}
                className="h-full w-full object-cover"
              />
            </div>

            <span>{author}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{date}</span>
          </div>

          <div className="flex items-center gap-2">
            <Eye size={14} />
            <span>{views}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-5xl">
        <div className="relative aspect-[16/8] overflow-hidden rounded-[28px]">
          <Image
            src={image}
            alt={title}
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
