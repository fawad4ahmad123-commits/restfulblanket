import Image from "next/image";
import { CalendarDays, Eye } from "lucide-react";
import { BlogCard as BlogCardProps } from "../types";

const BlogCard = ({
  image,
  author,
  authorImage,
  title,
  excerpt,
  date,
  views,
}: BlogCardProps) => {
  return (
    <article className="group">
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
            alt={author}
            width={34}
            height={34}
            className="rounded-full"
          />

          <span className="text-sm text-[#3b281f]">{author}</span>
        </div>
      </div>

      <div className="px-2 pt-5">
        <h3 className="font-serif text-[32px] leading-[1.05] text-[#3b281f]">
          {title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-7 text-[#85776d]">
          {excerpt}
        </p>

        <div className="mt-5 border-t border-[#d9cec5] pt-4">
          <div className="flex items-center gap-6 text-sm text-[#85776d]">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              {date}
            </div>

            <div className="flex items-center gap-2">
              <Eye size={16} />
              {views}
            </div>
          </div>
        </div>

        <button className="mt-6 w-full rounded-full bg-[#e6dbd0] py-4 text-sm font-medium text-[#3b281f] transition hover:bg-[#3b281f] hover:text-white">
          Read More
        </button>
      </div>
    </article>
  );
};

export default BlogCard;
