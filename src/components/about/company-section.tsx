'use client';
import { useAboutContext } from '@/src/core/context/about-context';
import { InfoCard } from './info-card';

export function CompanySection() {
  const { company } = useAboutContext();

  return (
    <section className="w-full bg-[#F5F1ED] py-5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_420px] lg:items-start">
          <div className="max-w-xl">
            <h2 className="mb-6 text-4xl leading-tight text-[#3b2c24] md:text-6xl">
              {company.heading || 'No heading available'}
            </h2>

            <p className="max-w-md text-sm leading-7 text-[#7b716a]">
              {company.description || 'No description available'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {company.facts && company.facts.length > 0 ? (
              company.facts.map((item) => (
                <InfoCard
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              ))
            ) : (
              <p className="col-span-2 text-center text-[#7b716a]">
                No company facts available
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
