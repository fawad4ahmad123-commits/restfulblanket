import { ArrowRight } from "lucide-react";
import { BLOGS } from "../constants";
import BlogCard from ".";

const BlogsSection = () => {
  return (
    <section className="bg-[#fdf9f6] py-20">
      <div className="mx-auto max-w-[1400px] px-5">
        <h2 className="mb-14 text-center font-serif text-4xl text-[#3b281f] md:text-6xl">
          Thoughts on{" "}
          <span className="italic font-normal">Restful Living.</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {BLOGS.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>

        <div className="mt-16 flex items-center justify-center gap-4">
          <span className="text-sm font-medium uppercase tracking-[0.35em] text-[#3b281f]">
            View All Blogs
          </span>

          <button className="flex h-12 w-12 items-center justify-center rounded-full border border-[#3b281f] text-[#3b281f] transition hover:bg-[#3b281f] hover:text-white">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
