'use client';

import { useState } from 'react';
import { Fraunces } from 'next/font/google';
import { EXPERTS } from '../Home/constants';
import ExpertCard from '../Home/expert-review';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const FILTERS = ['Alle', 'Læge', 'Psykoterapeut', 'Ergoterapeut', 'Konsulent'];

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400'],
});

interface ExpertSectionProps {
  isAllExpert?: boolean;
}

const ExpertSection = ({ isAllExpert = true }: ExpertSectionProps) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const router = useRouter();

  const filteredExperts = isAllExpert
    ? activeFilter === 'Alle'
      ? EXPERTS
      : EXPERTS.filter((expert: any) => {
          if (activeFilter === 'Læge') {
            return expert.profession === 'Læge';
          }

          if (activeFilter === 'Psykoterapeut') {
            return expert.profession === 'Psykoterapeut';
          }

          if (activeFilter === 'Ergoterapeut') {
            return expert.profession === 'Ergoterapeut';
          }

          if (activeFilter === 'Konsulent') {
            return expert.profession.includes('Konsulent');
          }

          return true;
        })
    : EXPERTS;

  return (
    <section className="container mx-auto max-w-7xl px-6">
      <div className="mb-8 text-xs text-muted-foreground">
        <button
          onClick={() => router.push('/')}
          className="cursor-pointer transition hover:text-[#35281E]"
        >
          Home
        </button>
        <span> &gt; Sleep experts</span>
      </div>

      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2
          className={`${fraunces.className} text-[36px] leading-tight text-[#392A22] md:text-[48px]`}
        >
          Vores søvn
          <span className="font-light italic"> eksperter.</span>
        </h2>
      </div>

      {isAllExpert && (
        <div className="mb-10 flex flex-wrap gap-3">
          <div className="mb-10 flex flex-wrap gap-3">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  backgroundColor:
                    activeFilter === filter ? '#35281E' : '#E9DDD4',
                  borderColor: activeFilter === filter ? '#E9DDD4' : '#E9DDD4',
                  color: activeFilter === filter ? '#FFFFFF' : '#35281E',
                }}
                className="rounded-full border px-5 py-2 text-sm"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {filteredExperts.map((expert: any, index: number) => (
          <ExpertCard
            key={index}
            expert={expert}
            isExpert={true}
            onClick={() => router.push(`/Ekspertprofil/${expert.name}`)}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button
          type="button"
          aria-label="Not sure which blanket suits your needs"
          className="rounded-full bg-[#e5d8cb] px-4 py-4 text-sm text-[#3b281f] hover:bg-[#e5d8cb] hover:text-[#3b281f] hover:shadow-none"
        >
          Ikke sikker på hvilken tyngdedyne der passer til dig?
        </Button>

        <p
          aria-label="Book a free consultation"
          title="Book a free consultation"
          className="flex items-center gap-2 text-sm font-medium text-[#3b281f]"
        >
          Book en gratis konsultation
          <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#3b281f]/20">
            <ArrowRight aria-hidden="true" size={14} />
          </span>
        </p>
      </div>
    </section>
  );
};

export default ExpertSection;
