'use client';

import { HelpCircle, Check, ArrowRight } from 'lucide-react';

type QuizIntroProps = {
  variant?: 'page' | 'card';
  title?: string;
  description?: string;
  onStart: () => void;
};

export default function QuizIntro({
  variant = 'page',
  title = 'Find din perfekte tyngdedyne',
  description = 'Svar på 5 korte spørgsmål, og vi finder det bedste match til dig, dit barn eller din hund.',
  onStart,
}: QuizIntroProps) {
  const features = [
    { label: '5 korte spørgsmål' },
    { label: 'Under 1 minut' },
    { label: 'Personlig anbefaling' },
  ];

  if (variant === 'card') {
    return (
      <div className="rounded-2xl border border-[#E5D9D1] bg-[#FDF9F6] p-6 md:p-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#392A22]">
              <HelpCircle size={24} className="text-[#392A22]" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#392A22] md:text-2xl">
                {title}
              </h3>
              <p className="mt-1 max-w-md text-sm text-[#7B7B7B] md:text-base">
                {description}
              </p>
            </div>
          </div>

          <button
            onClick={onStart}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-[#392A22] px-6 py-3.5 font-medium text-white transition hover:opacity-90"
          >
            Start quiz
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#E5D9D1] pt-5">
          {features.map((f) => (
            <span
              key={f.label}
              className="flex items-center gap-2 text-sm text-[#6D6D6D]"
            >
              <Check size={16} className="text-green-600" />
              {f.label}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#B8ACA2]">
        <HelpCircle size={32} className="text-[#392A22]" />
      </div>

      <h1 className="text-4xl font-semibold leading-tight text-[#392A22] md:text-5xl">
        {title}
      </h1>

      <p className="mt-6 max-w-lg text-lg text-[#7B7B7B]">{description}</p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {features.map((f) => (
          <span
            key={f.label}
            className="flex items-center gap-2 text-[#5B5B5B]"
          >
            <Check size={18} className="text-green-600" />
            {f.label}
          </span>
        ))}
      </div>

      <button
        onClick={onStart}
        className="mt-10 flex items-center gap-2 rounded-xl bg-[#392A22] px-10 py-4 text-lg font-medium text-white transition hover:opacity-90"
      >
        Start quiz
        <ArrowRight size={20} />
      </button>
    </section>
  );
}
