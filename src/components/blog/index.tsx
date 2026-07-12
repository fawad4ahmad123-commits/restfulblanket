'use client';

import { useState } from 'react';
import { BlogHero } from './blog-hero';
import { BlogFilters } from './blog-filters';
import { FeaturedArticle } from './featured-article';
import BlogCard from '../Home/blog';
import { Pagination } from '../all-products/Pagination';

const Blog = ({ blogs }: any) => {
  const isSlider = false;

  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 8;

  const totalPages = Math.ceil((blogs?.length || 0) / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;

  const currentBlogs =
    blogs?.slice(startIndex, startIndex + postsPerPage) || [];

  console.log('Blog Pagination:', {
    totalBlogs: blogs?.length,
    totalPages,
    currentPage,
    showing: currentBlogs.length,
  });

  return (
    <div className="container mx-auto max-w-7xl px-6 py-8">
      <div className="mb-10 text-sm text-[#8B817A]">
        Home <span className="mx-2">›</span> Blogs
      </div>

      <BlogHero />

      <BlogFilters />

      <div className="mt-16 mb-16">
        <FeaturedArticle blogs={blogs} />
      </div>

      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-[32px] font-serif text-[#35281E]">
          More from the Journal
        </h3>

        <span className="text-sm text-[#736760]">
          {blogs?.length || 0} articles
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default Blog;
