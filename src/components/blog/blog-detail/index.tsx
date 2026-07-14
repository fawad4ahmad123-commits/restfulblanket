'use client';

import { ArrowRight } from 'lucide-react';
import BlogCard from '../../Home/blog';
import { BLOGS } from '../../Home/constants';
import ArticleHero from './article-hero';
import ArticleLayout from './article-layout';
import AuthorCard from './author-card';
import { useRouter } from 'next/navigation';
import { formatBlogDetail } from '@/src/utilty/blog-detail-formater';

const Article = ({ blog }: any) => {
  const article = formatBlogDetail(blog);
  const router = useRouter();

  return (
    <main className="bg-[#fff9f5]">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        {article?.hero && <ArticleHero data={article.hero} />}

        {article?.content && <ArticleLayout data={article.content} />}

        <div className="mb-8 mt-8 flex items-center justify-center">
          <h1 className="font-serif text-[32px] text-[#35281E]">
            Du vil måske også kunne lide
          </h1>
        </div>

        <div
          className="flex gap-6 overflow-x-auto pb-4 xl:grid xl:grid-cols-4 xl:overflow-visible"
          role="region"
          aria-label="Blog articles"
        >
          {BLOGS.map((blog, index) => (
            <div
              key={`${blog.title}-${index}`}
              className="w-[85%] shrink-0 sm:w-[65%] md:w-[48%] xl:w-auto"
            >
              <BlogCard {...blog} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <p
            aria-label="Book a free consultation"
            title="Book a free consultation"
            className="flex items-center gap-2 text-sm font-medium text-[#3b281f]"
          >
            Se alle blogs
            <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#3b281f]/20">
              <ArrowRight
                aria-hidden="true"
                size={14}
                onClick={() => router.push('/blog')}
              />
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Article;
