'use client';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import ExpertCard from '.';
import Heading from './heading';
import { EXPERTS } from '../constants';

const ExpertsSection = () => {
  const router = useRouter();

  return (
    <section className="bg-[#FAF4EE] py-20" aria-labelledby="experts-heading">
      <div className="mx-auto max-w-[1400px] px-5">
        <Heading />

        <div
          className="flex gap-5 overflow-x-auto pb-4 md:pb-0 xl:grid xl:grid-cols-4 xl:overflow-visible"
          role="region"
          aria-label="Expert profiles"
        >
          {EXPERTS.map((expert: any, index: number) => (
            <div
              key={`${expert.name}-${index}`}
              className="w-[85%] shrink-0 sm:w-[65%] md:w-[48%] xl:w-auto"
            >
              <ExpertCard expert={expert} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 px-5 sm:gap-5 md:flex-row md:gap-6">
        <p
          role="note"
          aria-label="Not sure which blanket suits your needs"
          className="w-full max-w-[520px] rounded-full bg-[#e5d8cb] px-4 py-3 text-center text-xs leading-relaxed text-[#3b281f] sm:px-6 sm:py-4 sm:text-sm"
        >
          Er du i tvivl om, hvilken dyne der passer til dine behov?
        </p>

        <button
          type="button"
          onClick={() => router.push('/expert')}
          aria-label="Book a free consultation"
          className="flex items-center justify-center gap-3 text-center text-sm font-medium text-[#3b281f] transition-opacity hover:opacity-80"
        >
          <span>Book en gratis konsultation</span>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#3b281f]/20">
            <ArrowRight size={14} />
          </span>
        </button>
      </div>
    </section>
  );
};

export default ExpertsSection;
