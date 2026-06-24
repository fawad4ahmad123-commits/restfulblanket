'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Star, X } from 'lucide-react';
import { createReview } from '@/src/lib/products';

interface ReviewFormProps {
  onClose: () => void;
  productId: number;
  onReviewCreated: () => void | Promise<void>;
}

interface ReviewFormValues {
  name: string;
  email: string;
  title: string;
  review: string;
}

const ReviewForm = ({
  onClose,
  productId,
  onReviewCreated,
}: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>();

  const onSubmit = async (data: ReviewFormValues) => {
    if (!agreed) {
      toast.error('Please confirm your purchase experience.');
      return;
    }

    if (!rating) {
      toast.error('Please select a rating.');
      return;
    }

    try {
      setLoading(true);

      await createReview({
        productId,
        reviewer: data.name,
        reviewerEmail: data.email,
        rating,
        reviewTitle: data.title,
        review: data.review,
      });

      toast.success('Review submitted successfully!');

      reset();
      setRating(0);
      setHovered(0);
      setAgreed(false);
      await onReviewCreated();
      onClose();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.message || 'Something went wrong while submitting review',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full rounded-2xl bg-[#F5F0EB] p-8 shadow-sm"
    >
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
                    ? 'fill-[#392A22] text-[#392A22]'
                    : 'fill-transparent text-[#392A22]/30'
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
          {...register('name', {
            required: 'Name is required',
          })}
          placeholder="Enter your name"
          className="w-full rounded-lg border border-[#392A22]/15 bg-white px-4 py-2.5 text-sm"
        />

        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-[#392A22]">
          Review Title
        </label>

        <input
          {...register('title')}
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
          {...register('review', {
            required: 'Review is required',
            minLength: {
              value: 10,
              message: 'Review must be at least 10 characters',
            },
          })}
          placeholder="Share the details of your experience..."
          className="w-full resize-none rounded-lg border border-[#392A22]/15 bg-white px-4 py-2.5 text-sm"
        />

        {errors.review && (
          <p className="mt-1 text-xs text-red-500">{errors.review.message}</p>
        )}
      </div>

      <div className="mb-5">
        <label className="mb-1 block text-sm font-medium text-[#392A22]">
          Your Email
        </label>

        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
          })}
          placeholder="Enter your email"
          className="w-full rounded-lg border border-[#392A22]/15 bg-white px-4 py-2.5 text-sm"
        />

        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
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
        disabled={loading}
        className="w-full rounded-full bg-[#392A22] py-3 text-sm font-medium text-white transition hover:bg-[#4A382E] disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
