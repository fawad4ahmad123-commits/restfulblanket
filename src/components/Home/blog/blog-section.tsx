'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import BlogCard from '.';
import SliderControls from '../../generic/slider-control';

const BlogsSection = ({ blogs = [] }: any) => {
  const router = useRouter();

  const [start, setStart] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const visibleCards = 4;

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    checkScreen();

    window.addEventListener('resize', checkScreen);

    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const next = () => {
    if (!isDesktop) {
      sliderRef.current?.scrollBy({
        left: 350,
        behavior: 'smooth',
      });
      return;
    }

    setStart((prev) =>
      prev >= Math.max(blogs.length - visibleCards, 0) ? 0 : prev + 1,
    );
  };

  const prev = () => {
    if (!isDesktop) {
      sliderRef.current?.scrollBy({
        left: -350,
        behavior: 'smooth',
      });
      return;
    }

    setStart((prev) =>
      prev === 0 ? Math.max(blogs.length - visibleCards, 0) : prev - 1,
    );
  };

  if (!blogs?.length) {
    return null;
  }

  return (
    <section className="bg-[#fdf9f6] py-20" aria-labelledby="blogs-heading">
      <div className="mx-auto max-w-[1400px] px-5">
        <div className="mb-12 flex items-center justify-between">
          <h2
            id="blogs-heading"
            className="font-serif text-4xl text-[#3b281f] md:text-6xl"
          >
            Tanker om <span className="italic font-normal">Roligt liv</span>
          </h2>

          <SliderControls prev={prev} next={next} />
        </div>

        <div className="xl:hidden">
          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
            role="region"
            aria-label="Blog articles slider"
          >
            {blogs.map((item: any, index: number) => (
              <div
                key={item.id || index}
                className="w-[85%] shrink-0 snap-center sm:w-[65%] md:w-[48%]"
              >
                <BlogCard {...item} />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden gap-6 xl:grid xl:grid-cols-4">
          {blogs
            .slice(start, start + visibleCards)
            .map((item: any, index: number) => (
              <BlogCard key={item.id || index} {...item} />
            ))}
        </div>

        <div className="mt-16 flex items-center justify-center gap-4">
          <span className="text-sm font-medium uppercase tracking-[0.35em] text-[#3b281f]">
            Se alle blogindlæg
          </span>

          <button
            type="button"
            aria-label="View all blog articles"
            title="View all blog articles"
            onClick={() => router.push('/blog')}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#3b281f] text-[#3b281f] transition hover:bg-[#3b281f] hover:text-white"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
