'use client';

import {
  Check,
  Leaf,
  Ruler,
  ShieldCheck,
  Truck,
  RotateCcw,
  Phone,
} from 'lucide-react';

type DogProduct = {
  name: string;
  slug: string;
  price: string;
  image?: { src: string };
  size: 'small' | 'large';
};

export default function DogRecommendation({
  product,
  restartHref = '/guides/produktfinder-quiz/',
}: {
  product: DogProduct | null;
  restartHref?: string;
}) {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h1 className="text-3xl font-semibold text-[#392A22] md:text-4xl">
          Her er det Rigtige Tyngdetæppe til Din Hund
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-[#6D6D6D]">
          Du leder efter hjælp til en urolig hund. Vores DoggyRo tyngdetæpper er
          specielt designet til hunde med angst, uanset om det er fyrværkeri,
          torden, separationsangst eller generel nervøsitet.
        </p>

        <div className="mx-auto mt-10 max-w-md rounded-3xl border border-[#E5D9D1] bg-[#FDF9F6] p-8">
          {product ? (
            <>
              {product.image?.src && (
                <img
                  src={product.image.src}
                  alt={product.name}
                  className="mx-auto mb-5 h-40 w-40 rounded-2xl object-cover"
                />
              )}
              <h2 className="text-xl font-semibold text-[#392A22]">
                {product.name}
              </h2>
              <p className="mt-1 text-[#6D6D6D]">Fra {product.price} kr.</p>

              <a
                href={`/produkt/${product.slug}`}
                className="mt-6 inline-block w-full rounded-xl bg-[#392A22] px-8 py-4 font-medium text-white transition hover:opacity-90"
              >
                Se produkt
              </a>
            </>
          ) : (
            <p className="text-[#6D6D6D]">
              Indlæser din personlige anbefaling...
            </p>
          )}
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-4 text-left sm:grid-cols-3">
          <FactItem
            icon={Leaf}
            text="Naturlige materialer – bomuld og rapsfrø"
          />
          <FactItem
            icon={Ruler}
            text="Small: 50x70 cm (2-3 kg) – fra 499 kr."
          />
          <FactItem
            icon={Ruler}
            text="Large: 70x100 cm (4-5 kg) – fra 649 kr."
          />
          <FactItem icon={Check} text="Vaskbar og holdbar" />
          <FactItem icon={Truck} text="Gratis levering i Danmark" />
        </div>
      </section>

      <section className="border-t border-[#F0E8E1] bg-[#FDF9F6]">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <h2 className="mb-4 text-2xl font-semibold text-[#392A22]">
            Hvorfor en tyngdedyne kan hjælpe
          </h2>
          <p className="text-[#6D6D6D]">
            Ligesom mennesker kan hunde have gavn af dyb trykstimulering.
            DoggyRo tyngdetæppet giver en beroligende, krammende fornemmelse,
            der kan hjælpe hunden med at finde ro. Tæppet er lavet af naturlige
            materialer og er let at vaske.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="mb-6 text-2xl font-semibold text-[#392A22]">
          Tips til at få mest ud af din tyngdedyne
        </h2>
        <ul className="space-y-4">
          {[
            'Introducer tæppet gradvist – lad hunden snuse og vænne sig til det',
            'Brug tæppet i hundens trygge zone (kurv, seng eller sofa)',
            'Perfekt til fyrværkeri, tordenvejr eller når hunden er alene',
            'Fås i to størrelser: small (50x70 cm) og large (70x100 cm)',
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-3">
              <Check size={18} className="mt-1 shrink-0 text-green-600" />
              <span className="text-[#392A22]">{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[#F0E8E1] bg-[#FDF9F6]">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <h2 className="mb-8 text-2xl font-semibold text-[#392A22]">
            Vores garantier
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <GuaranteeCard
              icon={RotateCcw}
              title="90 nætters prøveperiode"
              text="Prøv din tyngdedyne i op til 90 nætter. Er du ikke tilfreds, tager vi den retur."
            />
            <GuaranteeCard
              icon={RotateCcw}
              title="Gratis retur"
              text="Ikke tilfreds? Returner din tyngdedyne gratis og uden besvær."
            />
            <GuaranteeCard
              icon={Truck}
              title="Gratis levering"
              text="Gratis levering i hele Danmark. Hurtig afsendelse fra vores lager."
            />
            <GuaranteeCard
              icon={ShieldCheck}
              title="CE-mærket medicinsk udstyr"
              text="Alle vores tyngdedyner er CE-mærkede som medicinsk udstyr klasse 1."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h2 className="mb-3 text-2xl font-semibold text-[#392A22]">
          Ikke helt sikker endnu?
        </h2>
        <p className="mb-2 text-[#6D6D6D]">
          Tag quizzen igen eller kontakt os for personlig rådgivning. Vi hjælper
          dig gerne med at finde den perfekte tyngdedyne.
        </p>
        <p className="mb-8 flex items-center justify-center gap-2 text-[#6D6D6D]">
          <Phone size={16} />
          Ring til os på{' '}
          <a href="tel:+4529822973" className="font-medium text-[#392A22]">
            +45 29 82 29 73
          </a>{' '}
          – vi sidder klar til at hjælpe.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={restartHref}
            className="rounded-xl bg-[#392A22] px-8 py-4 font-medium text-white transition hover:opacity-90"
          >
            Tag quizzen igen
          </a>
          <a
            href="/kontakt-restfulblanket/"
            className="rounded-xl border border-[#392A22] px-8 py-4 font-medium text-[#392A22]"
          >
            Kontakt os
          </a>
        </div>
      </section>
    </main>
  );
}

function FactItem({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm text-[#392A22] shadow-sm">
      <Icon size={16} className="shrink-0 text-[#392A22]" />
      {text}
    </div>
  );
}

function GuaranteeCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F6EFE9]">
        <Icon size={20} className="text-[#392A22]" />
      </div>
      <h3 className="mb-2 font-semibold text-[#392A22]">{title}</h3>
      <p className="text-sm text-[#6D6D6D]">{text}</p>
    </div>
  );
}
