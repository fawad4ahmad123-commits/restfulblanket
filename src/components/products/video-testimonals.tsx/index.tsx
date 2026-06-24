'use client';

import { useRef, useState } from 'react';
import { Play, Pause, ArrowLeft, ArrowRight } from 'lucide-react';
import { testimonials } from '../contants';

const getYoutubeEmbedUrl = (youtubeId: string) =>
  `https://www.youtube.com/embed/${youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&controls=1`;

const getYoutubeThumbnail = (youtubeId: string) =>
  `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

export default function TestimonialVideoSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const scrollNext = () => {
    sliderRef.current?.scrollBy({ left: 350, behavior: 'smooth' });
  };

  const scrollPrev = () => {
    sliderRef.current?.scrollBy({ left: -350, behavior: 'smooth' });
  };

  const toggleVideo = (id: number) => {
    if (activeVideo === id) {
      setActiveVideo(null);
      return;
    }

    setActiveVideo(id);

    cardRefs.current[id]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  return (
    <section className="bg-[#FFF9F5] py-16">
      <div className="mx-auto max-w-[1400px] px-5">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="font-serif text-3xl text-[#3A2A21] md:text-5xl">
            Trusted by <em>partners</em> worldwide.
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
          {testimonials.map((item) => {
            const isActive = activeVideo === item.id;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[item.id] = el;
                }}
                className="relative shrink-0 snap-start overflow-hidden rounded-[24px] w-[85vw] sm:w-[320px] md:w-[340px] lg:w-[290px]"
              >
                {isActive ? (
                  <iframe
                    className="h-[520px] w-full"
                    src={getYoutubeEmbedUrl(item.youtubeId)}
                    title={`Testimonial video from ${item.name}`}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={getYoutubeThumbnail(item.youtubeId)}
                    alt={`Testimonial from ${item.name}`}
                    className="h-[520px] w-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-xl font-medium text-white">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-white/70">{item.role}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleVideo(item.id)}
                      aria-label={
                        isActive
                          ? `Close testimonial video from ${item.name}`
                          : `Play testimonial video from ${item.name}`
                      }
                      aria-pressed={isActive}
                      title={
                        isActive
                          ? `Close testimonial video from ${item.name}`
                          : `Play testimonial video from ${item.name}`
                      }
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      {isActive ? (
                        <Pause size={18} className="text-white" />
                      ) : (
                        <Play size={18} className="ml-0.5 text-white" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
