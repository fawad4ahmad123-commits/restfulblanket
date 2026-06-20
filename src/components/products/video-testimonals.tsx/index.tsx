"use client";

import { useRef, useState } from "react";
import { Play, Pause, ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "../contants";

export default function TestimonialVideoSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const playPromises = useRef<Record<number, Promise<void> | undefined>>({});

  const scrollNext = () => {
    sliderRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  const scrollPrev = () => {
    sliderRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const safePause = async (id: number) => {
    const video = videoRefs.current[id];
    if (!video) return;

    // wait for any in-flight play() to settle before pausing
    if (playPromises.current[id]) {
      try {
        await playPromises.current[id];
      } catch {
        // ignore — play was already interrupted/aborted
      }
    }

    if (!video.paused) {
      video.pause();
    }
  };

  const toggleVideo = async (id: number) => {
    const currentVideo = videoRefs.current[id];
    if (!currentVideo) return;

    if (activeVideo === id) {
      await safePause(id);
      setActiveVideo(null);
      return;
    }

    // pause all other videos safely (waits for their play() to settle first)
    await Promise.all(
      Object.keys(videoRefs.current)
        .map(Number)
        .filter((vid) => vid !== id)
        .map((vid) => safePause(vid))
    );

    try {
      const playPromise = currentVideo.play();
      playPromises.current[id] = playPromise;
      await playPromise;

      setActiveVideo(id);

      cardRefs.current[id]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    } catch (error) {
      // AbortError happens when play() is interrupted by pause() — expected, ignore it
      if ((error as DOMException)?.name !== "AbortError") {
        console.error(error);
      }
    } finally {
      playPromises.current[id] = undefined;
    }
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
              onClick={scrollPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8D1CB] bg-white transition hover:bg-[#3A2A21] hover:text-white"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              onClick={scrollNext}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3A2A21] text-white transition hover:opacity-80"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        >
          {testimonials.map((item) => {
            const isActive = activeVideo === item.id;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[item.id] = el;
                }}
                className={`
                  relative shrink-0 snap-start overflow-hidden rounded-[24px]
                  transition-all duration-500 ease-out
                  ${
                    isActive
                      ? "w-[85vw] sm:w-[320px] md:w-[340px] lg:w-[580px]"
                      : "w-[85vw] sm:w-[320px] md:w-[340px] lg:w-[290px]"
                  }
                `}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[item.id] = el;
                  }}
                  poster={item.poster}
                  playsInline
                  muted
                  preload="metadata"
                  onEnded={() => setActiveVideo(null)}
                  onPause={() => {
                    if (activeVideo === item.id) {
                      setActiveVideo(null);
                    }
                  }}
                  className="h-[520px] w-full object-cover"
                >
                  <source src={item.video} type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-xl font-medium text-white">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-white/70">{item.role}</p>
                    </div>

                    <button
                      onClick={() => toggleVideo(item.id)}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md"
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