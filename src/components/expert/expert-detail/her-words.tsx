import { EXPERENCE } from '../contants';

export function ConsultationCard() {
  return (
    <section className="mt-12 pb-16 md:mt-5 md:pb-20">
      <h2 className="mb-6 font-serif text-xl text-[#736760] md:mb-8 md:text-2xl">
        Professional experience
      </h2>

      <div className="space-y-4 md:space-y-6">
        {EXPERENCE.map((item) => (
          <div
            key={item.year}
            className="flex flex-col gap-1 border-b border-[#e9ddd4] sm:grid sm:grid-cols-[100px_1fr] sm:gap-8"
          >
            <div className="text-sm font-medium text-[#35281E] sm:font-normal">
              {item.year}
            </div>

            <div className="w-full text-sm text-[#4F433B]">
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
