'use client';

type CcfCard = {
  icon?: string;
  title: string;
  text: string;
};

type CcfExpert = {
  imageUrl?: string;
  text?: string;
};

type CategoryCcfSectionProps = {
  cards?: CcfCard[];
  expert?: CcfExpert;
};

export default function CategoryCcfSection({
  cards = [],
  expert,
}: CategoryCcfSectionProps) {
  const hasCards = cards.length > 0;
  const hasExpert = !!(expert?.imageUrl || expert?.text);

  if (!hasCards && !hasExpert) return null;

  return (
    <section className="mt-16">
      {hasCards && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[#E9DDD4] p-6 text-center"
            >
              {card.icon && (
                <div className="mb-3 text-3xl leading-none">{card.icon}</div>
              )}
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#35281E]">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#6B5B52]">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {hasExpert && (
        <div className="mt-12 flex flex-col items-start gap-8 rounded-2xl bg-[#F7F3EE] p-8 md:flex-row">
          {expert?.imageUrl && (
            <div className="w-full flex-shrink-0 overflow-hidden rounded-2xl md:w-64">
              <img
                src={expert.imageUrl}
                alt="Ekspert"
                className="h-auto w-full object-cover"
              />
            </div>
          )}
          {expert?.text && (
            <div className="text-[#35281E]">
              <p className="whitespace-pre-line leading-relaxed">
                {expert.text}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
