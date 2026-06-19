"use client";
import { useState } from "react";
import { Star, X } from "lucide-react";

interface ReviewFormProps {
  onClose: () => void;
}

const ReviewForm = ({ onClose }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="w-full rounded-2xl bg-[#F5F0EB] p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-serif text-2xl text-[#392A22]">Write a Review</h3>

        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 transition hover:bg-[#392A22]/10"
        >
          <X className="h-5 w-5 text-[#392A22]" />
        </button>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-[#392A22]">
          Overall Rating
        </label>

        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              type="button"
              key={i}
              onMouseEnter={() => setHovered(i + 1)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(i + 1)}
            >
              <Star
                className={`h-6 w-6 ${
                  i < (hovered || rating)
                    ? "fill-[#392A22] text-[#392A22]"
                    : "fill-transparent text-[#392A22]/30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-[#392A22]">
          Your Name
        </label>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full rounded-lg border border-[#392A22]/15 bg-white px-4 py-2.5 text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-[#392A22]">
          Review Title
          <span className="ml-1 font-normal text-[#392A22]/50">(Optional)</span>
        </label>

        <input
          type="text"
          placeholder="Summarize your experience"
          className="w-full rounded-lg border border-[#392A22]/15 bg-white px-4 py-2.5 text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-[#392A22]">
          Your Review
        </label>

        <textarea
          rows={4}
          placeholder="Share the details of your experience..."
          className="w-full resize-none rounded-lg border border-[#392A22]/15 bg-white px-4 py-2.5 text-sm"
        />
      </div>

      <div className="mb-5">
        <label className="mb-1 block text-sm font-medium text-[#392A22]">
          Your Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-lg border border-[#392A22]/15 bg-white px-4 py-2.5 text-sm"
        />
      </div>

      <label className="mb-5 flex cursor-pointer items-start gap-3 text-xs text-[#392A22]/70">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[#392A22]"
        />
        I confirm this is based on my own experience and I purchased this
        product.
      </label>

      <button
        type="submit"
        className="w-full rounded-full bg-[#392A22] py-3 text-sm font-medium text-white transition hover:bg-[#4A382E]"
      >
        Submit Review
      </button>
    </div>
  );
};

export default ReviewForm;
