"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, PenLine, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { REVIEWS } from "../constants";


function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-[#392A22] text-[#392A22]" />
      ))}
    </div>
  );
}

function WriteReviewModal({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-[520px] rounded-2xl bg-[#F5F0EB] p-8 shadow-xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#392A22]/10 text-[#392A22] hover:bg-[#392A22]/20 transition"
        >
          <X className="h-4 w-4" />
        </button>

        <h3 className="font-serif text-2xl text-[#392A22] mb-6">
          Write a Review
        </h3>

        {/* Overall Rating */}
        <div className="mb-4">
          <label className="text-sm text-[#392A22] font-medium mb-2 block">
            Overall Rating
          </label>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                onMouseEnter={() => setHovered(i + 1)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setRating(i + 1)}
              >
                <Star
                  className={`h-6 w-6 transition ${
                    i < (hovered || rating)
                      ? "fill-[#392A22] text-[#392A22]"
                      : "fill-transparent text-[#392A22]/30"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Your Name */}
        <div className="mb-4">
          <label className="text-sm text-[#392A22] font-medium mb-1 block">
            Your Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full rounded-lg border border-[#392A22]/15 bg-white px-4 py-2.5 text-sm text-[#392A22] placeholder:text-[#392A22]/40 focus:outline-none focus:ring-1 focus:ring-[#392A22]/30"
          />
        </div>

        {/* Review Title */}
        <div className="mb-4">
          <label className="text-sm text-[#392A22] font-medium mb-1 block">
            Review Title{" "}
            <span className="text-[#392A22]/50 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="Summarize your experience"
            className="w-full rounded-lg border border-[#392A22]/15 bg-white px-4 py-2.5 text-sm text-[#392A22] placeholder:text-[#392A22]/40 focus:outline-none focus:ring-1 focus:ring-[#392A22]/30"
          />
        </div>

        {/* Your Review */}
        <div className="mb-4">
          <label className="text-sm text-[#392A22] font-medium mb-1 block">
            Your Review
          </label>
          <textarea
            placeholder="Share the details of your experience..."
            rows={3}
            className="w-full rounded-lg border border-[#392A22]/15 bg-white px-4 py-2.5 text-sm text-[#392A22] placeholder:text-[#392A22]/40 focus:outline-none focus:ring-1 focus:ring-[#392A22]/30 resize-none"
          />
        </div>

        {/* Your Email */}
        <div className="mb-5">
          <label className="text-sm text-[#392A22] font-medium mb-1 block">
            Your Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border border-[#392A22]/15 bg-white px-4 py-2.5 text-sm text-[#392A22] placeholder:text-[#392A22]/40 focus:outline-none focus:ring-1 focus:ring-[#392A22]/30"
          />
        </div>

        {/* Checkbox */}
        <label className="mb-5 flex cursor-pointer items-start gap-3 text-xs text-[#392A22]/70">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#392A22]"
          />
          I confirm this is based on my own experience and I purchased this product.
        </label>

        {/* Submit */}
        <button className="w-full rounded-full bg-[#392A22] py-3 text-sm font-medium text-white hover:bg-[#4A382E] transition">
          Submit Review
        </button>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [animating, setAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = (dir: "prev" | "next") => {
    if (animating) return;
    setAnimating(true);
    setDirection(dir === "next" ? "left" : "right");

    setTimeout(() => {
      setCurrent((prev) =>
        dir === "next"
          ? (prev + 1) % REVIEWS.length
          : (prev - 1 + REVIEWS.length) % REVIEWS.length
      );
      setAnimating(false);
    }, 350);
  };

  const sideReviews = [
    REVIEWS[(current + 1) % REVIEWS.length],
    REVIEWS[(current + 2) % REVIEWS.length],
    REVIEWS[(current + 3) % REVIEWS.length],
  ];

  return (
    <section className="bg-[#F5F0EB] py-16 px-6">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-serif text-[36px] md:text-[48px] leading-tight text-[#392A22]">
            12,480 nights.{" "}
            <span className="italic font-normal">One verdict.</span>
          </h2>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowModal(true)}
              className="rounded-full border-[#392A22]/20 bg-[#fff9f5] px-4 text-sm text-[#392A22] hover:bg-[#392A22] hover:text-white gap-2"
            >
              <PenLine className="h-3.5 w-3.5" />
              Write a review
            </Button>

            <button
              onClick={() => navigate("prev")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#392A22]/20 bg-[#fff9f5] text-[#392A22] hover:bg-[#392A22] hover:text-white transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={() => navigate("next")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#392A22] text-white hover:bg-[#4A382E] transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Featured Review */}
          <div className="overflow-hidden rounded-2xl bg-white p-8 shadow-sm">
            <div
              key={current}
              className={`${
                animating
                  ? direction === "left"
                    ? "animate-[slideOutLeft_0.35s_ease_forwards]"
                    : "animate-[slideOutRight_0.35s_ease_forwards]"
                  : direction === "left"
                  ? "animate-[slideInRight_0.35s_ease_forwards]"
                  : "animate-[slideInLeft_0.35s_ease_forwards]"
              }`}
            >
              <StarRating count={REVIEWS[current].rating} />
              <blockquote className="mt-5 font-serif text-[22px] italic leading-relaxed text-[#392A22]">
                "{REVIEWS[current].review}"
              </blockquote>
              <div className="mt-8 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#392A22]/10 flex items-center justify-center text-[#392A22] font-semibold text-sm">
                  {REVIEWS[current].name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-[#392A22]">
                    {REVIEWS[current].name}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#392A22]/50">
                    {REVIEWS[current].location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Reviews */}
          <div className="flex flex-col gap-4">
            {sideReviews.map((review, i) => (
              <div
                key={`${current}-${i}`}
                className={`flex items-start gap-4 rounded-xl p-4 transition-all ${
                  i === 0 ? "bg-[#392A22] text-white" : "bg-white text-[#392A22]"
                } ${
                  animating
                    ? direction === "left"
                      ? "animate-[slideOutLeft_0.35s_ease_forwards]"
                      : "animate-[slideOutRight_0.35s_ease_forwards]"
                    : direction === "left"
                    ? "animate-[slideInRight_0.35s_ease_forwards]"
                    : "animate-[slideInLeft_0.35s_ease_forwards]"
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div
                  className={`h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-sm font-semibold ${
                    i === 0 ? "bg-white/20 text-white" : "bg-[#392A22]/10 text-[#392A22]"
                  }`}
                >
                  {review.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-sm font-medium truncate ${i === 0 ? "text-white" : "text-[#392A22]"}`}>
                      {review.name}
                    </span>
                    <div className="flex gap-0.5 shrink-0">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <Star
                          key={j}
                          className={`h-3 w-3 ${i === 0 ? "fill-white text-white" : "fill-[#392A22] text-[#392A22]"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className={`mt-1 text-xs leading-relaxed line-clamp-2 ${i === 0 ? "text-white/70" : "text-[#392A22]/60"}`}>
                    {review.review}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review Modal */}
      {showModal && <WriteReviewModal onClose={() => setShowModal(false)} />}

      <style jsx>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutLeft {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-60px); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(60px); }
        }
      `}</style>
    </section>
  );
}