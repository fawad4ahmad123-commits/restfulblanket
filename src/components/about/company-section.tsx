import { COMPANY_INFO } from './contants';
import { InfoCard } from './info-card';

export function CompanySection() {
  return (
    <section className="w-full bg-[#F5F1ED] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_420px] lg:items-start">
          {/* Left Content */}
          <div className="max-w-xl">
            <h2 className="mb-6 text-4xl leading-tight text-[#3b2c24] md:text-6xl">
              {COMPANY_INFO.title.first}{' '}
              <span className="italic">{COMPANY_INFO.title.highlighted}</span>{' '}
              {COMPANY_INFO.title.second}
              <br />
              {COMPANY_INFO.title.third}{' '}
              <span className="italic">{COMPANY_INFO.title.fourth}</span>
            </h2>

            <p className="max-w-md text-sm leading-7 text-[#7b716a]">
              {COMPANY_INFO.description}
            </p>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {COMPANY_INFO.stats.map((item) => (
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
