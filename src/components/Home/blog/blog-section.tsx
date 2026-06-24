import { ArrowRight } from 'lucide-react';
import { BLOGS } from '../constants';
import BlogCard from '.';

const BlogsSection = () => {
  return (
    <section className="bg-[#fdf9f6] py-20" aria-labelledby="blogs-heading">
      <div className="mx-auto max-w-[1400px] px-5">
        <h2
          id="blogs-heading"
          className="mb-14 text-center font-serif text-4xl text-[#3b281f] md:text-6xl"
        >
          Thoughts on{' '}
          <span className="italic font-normal">Restful Living.</span>
        </h2>

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

        <div className="mt-16 flex items-center justify-center gap-4">
          <span className="text-sm font-medium uppercase tracking-[0.35em] text-[#3b281f]">
            View All Blogs
          </span>

          <button
            type="button"
            aria-label="View all blog articles"
            title="View all blog articles"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#3b281f] text-[#3b281f] transition hover:bg-[#3b281f] hover:text-white"
          >
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
