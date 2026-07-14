'use client';

import { useState } from 'react';
import { BlogHero } from './blog-hero';
import { BlogFilters } from './blog-filters';
import { FeaturedArticle } from './featured-article';
import BlogCard from '../Home/blog';
import { Pagination } from '../all-products/Pagination';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Blog = ({ blogs }: any) => {
  const isSlider = false;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const postsPerPage = 8;

  const filteredBlogs =
    blogs?.filter((blog: any) =>
      blog?.title?.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;

  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  return (
    <div className="container mx-auto max-w-7xl px-6 py-8">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-sm text-[#8B817A]">
          Forside <span className="mx-2">›</span> Blogindlæg
        </div>

        <div className="relative w-full lg:w-[300px]">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A79D96]" />

          <Input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search articles..."
            className="h-11 w-full rounded-full border-[#E4DAD1] bg-transparent pl-11"
          />
        </div>
      </div>

      <BlogHero />

      <BlogFilters />

      <div className="mt-16 mb-16">
        <FeaturedArticle blogs={blogs} />
      </div>

      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-[32px] font-serif text-[#35281E]">
          Flere artikler fra journalen
        </h3>

        <span className="text-sm text-[#736760]">
          {filteredBlogs.length} artikler
        </span>
      </div>

      <div
        className={
          isSlider
            ? 'flex gap-6 overflow-x-auto pb-4 xl:grid xl:grid-cols-4 xl:overflow-visible'
            : 'grid gap-6 md:grid-cols-2 xl:grid-cols-4'
        }
        role="region"
        aria-label="Blog articles"
      >
        {currentBlogs.map((blog: any, index: number) => (
          <div
            key={`${blog.id ?? blog.title}-${index}`}
            className={
              isSlider
                ? 'w-[85%] shrink-0 sm:w-[65%] md:w-[48%] xl:w-auto'
                : 'w-full'
            }
          >
            <BlogCard {...blog} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Blog;
