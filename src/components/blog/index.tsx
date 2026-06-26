import { BlogHero } from './blog-hero';
import { BlogFilters } from './blog-filters';
import { FeaturedArticle } from './featured-article';
import BlogCard from '../Home/blog';
import { BLOGS } from '../Home/constants';

const Blog = () => {
  const isSlider = false;
  return (
    <div className="container mx-auto max-w-7xl px-6 py-8">
      <div className="mb-10 text-sm text-[#8B817A]">
        Home <span className="mx-2">›</span> Blogs
      </div>
      <BlogHero />
      <BlogFilters />
      <div className="mt-16 mb-16">
        <FeaturedArticle />
      </div>
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-[32px] font-serif text-[#35281E]">
          More from the Journal
        </h3>

        <span className="text-sm text-[#736760]">{BLOGS.length} articles</span>
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
        {BLOGS.map((blog, index) => (
          <div
            key={`${blog.title}-${index}`}
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
    </div>
  );
};

export default Blog;
