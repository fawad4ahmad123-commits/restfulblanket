'use client';

type FeatureCard = {
  icon?: string;
  title: string;
  text: string;
};

type CategoryFeatureCardsProps = {
  heading?: string;
  description?: string;
  cards?: FeatureCard[];
};

export default function CategoryFeatureCards({
  heading,
  description,
  cards = [],
}: CategoryFeatureCardsProps) {
  if (!cards.length) return null;

  return (
    <section className="mt-5">
      {heading && (
        <h2 className="mb-4 text-[36px] font-semibold text-[#35281E]">
          {heading}
        </h2>
      )}

      {description && (
        <p className="mb-10 max-w-4xl text-[#6B5B52]">{description}</p>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <div key={index} className="rounded-lg bg-[#F7F5F3] p-8 text-center">
            {card.icon && (
              <div className="mb-4 flex justify-center text-4xl">
                {card.icon}
              </div>
            )}

            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#35281E]">
              {card.title}
            </h3>

            <p className="text-sm leading-7 text-[#6B5B52]">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
