'use client';

import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { testimonials } from '../contants';

export default function TestimonialVideoSlider({
  isCategory,
}: {
  isCategory?: boolean;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const scrollNext = () => {
    sliderRef.current?.scrollBy({
      left: 350,
      behavior: 'smooth',
    });
  };

  const scrollPrev = () => {
    sliderRef.current?.scrollBy({
      left: -350,
      behavior: 'smooth',
    });
  };

  return (
    <section className={`${isCategory ? '' : 'bg-[#FFF9F5]'} py-16`}>
      <div className="mx-auto max-w-[1400px] px-5">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="font-serif text-3xl text-[#3A2A21] md:text-5xl">
            Betroet af <em>partnere</em> verden over.
          </h2>

          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              title="Previous testimonial"
              onClick={scrollPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8D1CB] bg-white transition hover:bg-[#3A2A21] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A2A21]"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              aria-label="Next testimonial"
              title="Next testimonial"
              onClick={scrollNext}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3A2A21] text-white transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A2A21]"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          role="region"
          aria-label="Customer testimonial videos"
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scrollbar-hide"
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[item.id] = el;
              }}
              className="relative w-[85vw] shrink-0 snap-start overflow-hidden rounded-[24px] sm:w-[320px] md:w-[340px] lg:w-[290px]"
            >
              <div className="relative h-[520px] overflow-hidden rounded-[24px]">
                <LiteYouTubeEmbed
                  id={item.youtubeId}
                  title={`Testimonial video from ${item.name}`}
                  poster="hqdefault"
                  webp
                  noCookie
                  iframeClass="!absolute inset-0 !h-full !w-full"
                  wrapperClass="yt-lite absolute inset-0 !h-full !w-full"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute right-0 bottom-0 left-0 p-5">
                  <h3 className="text-xl font-medium text-white">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-white/70">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
