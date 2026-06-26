'use client';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button
          type="button"
          aria-label="Not sure which blanket suits your needs"
          className="rounded-full bg-[#e5d8cb] px-4 py-4 text-sm text-[#3b281f] hover:bg-[#e5d8cb] hover:text-[#3b281f] hover:shadow-none"
        >
          Not sure which blanket suits your needs?
        </Button>
        <p
          aria-label="Book a free consultation"
          title="Book a free consultation"
          className="flex items-center gap-2 text-sm font-medium text-[#3b281f]"
        >
          Book a free consultation
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#3b281f]/20 cursor-pointer">
            <ArrowRight
              aria-hidden="true"
              size={14}
              onClick={() => router.push('/expert')}
            />
          </span>
        </p>
      </div>
    </section>
  );
};

export default ExpertsSection;
