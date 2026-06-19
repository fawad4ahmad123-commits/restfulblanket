"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "/home/hero-img.jpg",
    title: "Sleep Better.",
    subtitle: "Live Better.",
    description:
      "Hand-crafted weighted blankets and duvets, shaped by Nordic calm. Designed in Stockholm to ease anxious nights and gently hold you into deeper rest.",
  },
  {
    image: "/home/hero-img-2.jpg",
    title: "Feel Calm.",
    subtitle: "Every Night.",
    description:
      "Premium weighted bedding created to reduce stress and help you fall asleep faster.",
  },
  {
    image: "/home/hero-img-3.jpg",
    title: "Wake Refreshed.",
    subtitle: "Every Morning.",
    description:
      "Experience Scandinavian comfort designed for deeper sleep and brighter mornings.",
  },
];

const AUTOPLAY_DELAY = 5000;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <Image
        src={slides[currentSlide].image}
        alt={slides[currentSlide].title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-5 md:px-6">
        <div className="flex flex-1 items-center md:items-start pt-[140px] sm:pt-[160px] md:pt-[220px]">
          <div className="max-w-[520px] text-[#fff9f5]">
            <h1 className="font-serif text-[44px] leading-[0.95] tracking-[-0.02em] md:text-[60px] lg:text-[72px]">
              {slides[currentSlide].title}
              <br />
              <span className="italic font-normal">
                {slides[currentSlide].subtitle}
              </span>
            </h1>

            <p className="mt-5 max-w-[460px] text-xs leading-6 text-[#fff9f5]/80 md:mt-8 md:text-sm md:leading-7">
              {slides[currentSlide].description}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="flex h-[52px] items-center justify-center gap-3 rounded-full bg-[#fff9f5] px-6 text-sm text-[#392a22] transition hover:bg-[#fff9f5]/90 md:h-[56px]"
              >
                <span>Shop Now</span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#392a22] text-[#fff9f5]">
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </span>
              </Link>

              <Button
                asChild
                variant="outline"
                className="h-[52px] rounded-full border-[#fff9f5] bg-transparent px-6 text-sm text-[#fff9f5] hover:bg-[#fff9f5] hover:text-black md:h-[56px]"
              >
                <Link href="/find-your-weight">
                  Find Your Perfect Weight
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex-1" />
        </div>

        <div className="pb-6 md:mb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="flex items-center gap-2 md:gap-3"
                >
                  <div className="relative h-[2px] w-10 overflow-hidden bg-[#fff9f5]/30 md:w-16">
                    {currentSlide === index && (
                      <div
                        key={`${currentSlide}-${index}`}
                        className="absolute left-0 top-0 h-full bg-[#fff9f5] animate-[progress_5s_linear_forwards]"
                      />
                    )}
                  </div>

                  <span
                    className={`text-xs transition-all duration-300 md:text-sm ${
                      currentSlide === index
                        ? "font-medium text-[#fff9f5]"
                        : "text-[#fff9f5]/50"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-8 md:grid md:grid-cols-4 md:gap-10">
              <div>
                <div className="text-[28px] text-[#fff9f5] md:text-[40px]">
                  4.9★
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#fff9f5]/60 md:text-xs">
                  12,480+ Reviews
                </div>
              </div>

              <div>
                <div className="text-[28px] text-[#fff9f5] md:text-[40px]">
                  184k
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#fff9f5]/60 md:text-xs">
                  Nights Of Better Sleep
                </div>
              </div>

              <div className="hidden md:block">
                <div className="text-[28px] text-[#fff9f5] md:text-[40px]">
                  30 Days
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#fff9f5]/60 md:text-xs">
                  Sleep Trial
                </div>
              </div>

              <div className="hidden md:block">
                <div className="text-[28px] text-[#fff9f5] md:text-[40px]">
                  Free
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#fff9f5]/60 md:text-xs">
                  Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}