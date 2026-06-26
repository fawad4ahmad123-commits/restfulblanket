import { EXPERENCE } from '../contants';

export function ExperienceSection() {
  return (
    <section className="mt-3 pb-16 md:mt-7 md:pb-20">
      <h2 className="mb-6 font-serif text-xl text-[#736760] md:mb-8 md:text-2xl">
        Education & Training
      </h2>

      <div className="space-y-4 md:space-y-6">
        {EXPERENCE.map((item) => (
          <div
            key={item.year}
            className="flex flex-col items-center justify-center gap-1 border-b border-[#e9ddd4] sm:grid sm:grid-cols-[100px_1fr] sm:gap-8"
          >
            <div className="text-center text-sm font-medium text-[#35281E] sm:font-normal">
              {item.year}
            </div>

            <div className="text-center text-sm text-[#4F433B] sm:text-left">
              <div>{item.role}</div>
              {item.organization && <div>{item.organization}</div>}
              {item.details && <div>{item.details}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
