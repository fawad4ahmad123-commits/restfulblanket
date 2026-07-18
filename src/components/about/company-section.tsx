'use client';
import { useAboutContext } from '@/src/core/context/about-context';
import { InfoCard } from './info-card';

export function CompanySection() {
  const { companyInfo } = useAboutContext();

  return (
    <section className="w-full bg-[#F5F1ED] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_420px] lg:items-start">
          <div className="max-w-xl">
            <h2 className="mb-6 text-4xl leading-tight text-[#3b2c24] md:text-6xl">
              {companyInfo.title.first}{' '}
              <span className="italic">{companyInfo.title.highlighted}</span>{' '}
              {companyInfo.title.second}
              <br />
              {companyInfo.title.third}{' '}
              <span className="italic">{companyInfo.title.fourth}</span>
            </h2>

            <p className="max-w-md text-sm leading-7 text-[#7b716a]">
              {companyInfo.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {companyInfo.stats.map((item) => (
              <InfoCard
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
