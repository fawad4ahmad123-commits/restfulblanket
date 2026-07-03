'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Star, X } from 'lucide-react';
import { createProductReview } from '@/src/lib/products';

interface ReviewFormProps {
  productId: number;
  onClose: () => void;
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
      toast.error('Bekræft venligst din købsoplevelse.');
      return;
    }

    if (!rating) {
      toast.error('Vælg venligst en bedømmelse.');
      return;
    }

    try {
      setLoading(true);
      await createProductReview({
        productId,
        reviewer: data.name,
        reviewerEmail: data.email,
        rating,
        reviewTitle: data.title,
        review: data.review,
      });

      toast.success('Anmeldelse indsendt!');

      reset();
      setRating(0);
      setHovered(0);
      setAgreed(false);
      await onReviewCreated();
      onClose();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.message || 'Noget gik galt under indsendelse af anmeldelsen',
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
        <h3 className="font-serif text-2xl text-[#392A22]">
          Skriv en anmeldelse
        </h3>

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
          Samlet bedømmelse
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
          Dit navn
        </label>

        <input
          {...register('name', {
            required: 'Navn er påkrævet',
          })}
          placeholder="Indtast dit navn"
          className="w-full rounded-lg border border-[#392A22]/15 bg-white px-4 py-2.5 text-sm"
        />

        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-[#392A22]">
          Anmeldelsestitel
        </label>

        <input
          {...register('title')}
          placeholder="Opsummer din oplevelse"
          className="w-full rounded-lg border border-[#392A22]/15 bg-white px-4 py-2.5 text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-[#392A22]">
          Din anmeldelse
        </label>

        <textarea
          rows={4}
          {...register('review', {
            required: 'Anmeldelse er påkrævet',
            minLength: {
              value: 10,
              message: 'Anmeldelsen skal være mindst 10 tegn',
            },
          })}
          placeholder="Del detaljerne om din oplevelse..."
          className="w-full resize-none rounded-lg border border-[#392A22]/15 bg-white px-4 py-2.5 text-sm"
        />

        {errors.review && (
          <p className="mt-1 text-xs text-red-500">{errors.review.message}</p>
        )}
      </div>

      <div className="mb-5">
        <label className="mb-1 block text-sm font-medium text-[#392A22]">
          Din e-mail
        </label>

        <input
          type="email"
          {...register('email', {
            required: 'E-mail er påkrævet',
          })}
          placeholder="Indtast din e-mail"
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
        Jeg bekræfter, at dette er baseret på min egen oplevelse, og at jeg har
        købt dette produkt.
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-[#392A22] py-3 text-sm font-medium text-white transition hover:bg-[#4A382E] disabled:opacity-50"
      >
        {loading ? 'Indsender...' : 'Indsend anmeldelse'}
      </button>
    </form>
  );
};

export default ReviewForm;
