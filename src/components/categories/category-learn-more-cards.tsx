'use client';

type LearnMoreCard = {
  icon?: string;
  title: string;
  text: string;
  linkText?: string;
  href?: string;
};

type CategoryLearnMoreCardsProps = {
  heading?: string;
  description?: string;
  cards?: LearnMoreCard[];
};

export default function CategoryLearnMoreCards({
  heading = 'Vil du vide mere?',
  description,
  cards = [],
}: CategoryLearnMoreCardsProps) {
  if (!cards.length) return null;

  return (
    <section className="mt-16 border-t border-[#E9DDD4] pt-12">
      <h2 className="mb-3 text-[36px] font-semibold text-[#35281E]">
        {heading}
      </h2>

      {description && <p className="mb-8 text-[#6B5B52]">{description}</p>}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-lg border border-[#E9DDD4] bg-white p-6"
          >
            {card.icon && <div className="mb-4 text-3xl">{card.icon}</div>}

            <h3 className="mb-3 text-lg font-medium text-[#35281E]">
              {card.title}
            </h3>

            <p className="mb-4 text-sm leading-6 text-[#6B5B52]">{card.text}</p>

            {card.href && (
              <a
                href={card.href}
                className="font-medium text-[#35281E] hover:underline"
              >
                {card.linkText || 'Læs mere'} →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
