'use client';
import { useQuizResult } from '@/src/core/context/quiz-result-context';
import {
  ArrowRight,
  Shield,
  RotateCcw,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fraunces, Inter } from 'next/font/google';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

const BENEFIT_CHIPS = [
  'CE-mærket medicinsk udstyr klasse 1',
  'Stille – ingen forstyrrende plastlyde',
  'Vaskbar ved 60 grader',
  'Fri bytteordning på vægt',
  'Gratis levering i Danmark',
];

const TIPS = [
  'Lad barnet bruge tyngdedynen når angsten melder sig – ikke kun om natten',
  'Kombiner med beroligende aktiviteter som højtlæsning',
  'Tyngdedynen er et supplement til eventuel professionel hjælp',
  'Vores dyner er stille og uden forstyrrende lyde',
];

const GUARANTEES = [
  {
    icon: Shield,
    title: '90 nætters prøveperiode',
    text: 'Prøv dynen i op til 90 nætter. Er du ikke tilfreds, tager vi den retur.',
    url: '/handelsbetingelser#90-naetters-tryghed',
  },
  {
    icon: RotateCcw,
    title: 'Gratis retur',
    text: 'Ikke tilfreds? Returner din tyngdedyne gratis og uden besvær.',
    url: '/handelsbetingelser#returfragtomkostninger',
  },
  {
    icon: Truck,
    title: 'Gratis levering',
    text: 'Gratis levering med hurtig afsendelse fra vores lager.',
    url: '/handelsbetingelser#levering',
  },
  {
    icon: ShieldCheck,
    title: 'CE-mærket medicinsk udstyr',
    text: 'Alle vores tyngdedyner er CE-mærkede som medicinsk udstyr klasse 1.',
    url: '/om-vores-dyner/ce-maerkning-og-dokumentation',
  },
];
const DIAL_MAX_KG = 15;
function parseWeightKg(label?: string): number | null {
  if (!label) return null;
  const match = label.match(/(\d+(?:[.,]\d+)?)/);
  if (!match) return null;
  return parseFloat(match[1].replace(',', '.'));
}

export default function RecommendationCard() {
  const router = useRouter();
  const { result } = useQuizResult();

  if (!result) {
    return (
      <div
        className={`${fraunces.variable} ${inter.variable} max-w-6xl bg-white px-8 py-12 text-center font-[family-name:var(--font-body)]`}
      >
        <p className="text-[#33241C]">
          Vi kunne ikke finde et quizresultat. Tag quizzen for at få din
          personlige anbefaling.
        </p>
        <button
          onClick={() => router.push('/quiz')}
          className="mt-6 rounded-lg bg-[#33241C] px-8 py-4 font-medium text-white transition hover:opacity-90"
        >
          Tag quizzen
        </button>
      </div>
    );
  }

  const { productName, size, weightLabel, price, productSlug, ctaLabel } =
    result;

  const weightKg = parseWeightKg(weightLabel);
  const dialPct =
    weightKg !== null
      ? Math.min(100, Math.max(6, Math.round((weightKg / DIAL_MAX_KG) * 100)))
      : 50;

  return (
    <div
      className={`${fraunces.variable} ${inter.variable} max-w-6xl font-[family-name:var(--font-body)] text-[#33241C]`}
    >
      <div className="overflow-hidden rounded-[20px] border border-[#EDE4DA] bg-white shadow-[0_1px_2px_rgba(51,36,28,0.04),0_20px_40px_-20px_rgba(51,36,28,0.18)]">
        {/* Header band */}
        <div
          className="py-3.5 text-center"
          style={{
            backgroundColor: '#33241C',
            backgroundImage:
              'radial-gradient(circle at 6px 6px, rgba(255,255,255,0.06) 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px',
          }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F3E9DF]">
            DIN ANBEFALING
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 px-6 pb-2 pt-10 md:grid-cols-[1.3fr_1fr] md:px-10">
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#C1714A]">
              Baseret på dine svar
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-[#33241C] md:text-[32px]">
              {productName}
            </h2>

            <div className="mt-6 flex flex-wrap gap-7">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8A7C74]">
                  Størrelse
                </p>
                <p className="mt-1 text-lg font-semibold text-[#33241C]">
                  {size}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8A7C74]">
                  Pris fra
                </p>
                <p className="mt-1 text-lg font-semibold text-[#33241C]">
                  {price}
                </p>
              </div>
            </div>

            <a
              href={productSlug ? `/shop/${productSlug}` : '#'}
              className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-[#33241C] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#241914] hover:-translate-y-px"
            >
              {ctaLabel}
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="flex flex-col items-center justify-start gap-3.5 rounded-2xl bg-[#E4E9DC] px-5 py-6">
            <div
              className="relative flex h-[150px] w-[150px] items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#C1714A calc(${dialPct}*1%), #DCC9BB 0)`,
              }}
            >
              <div className="absolute inset-3 rounded-full bg-white" />
              <div className="relative z-10 text-center">
                <div className="font-[family-name:var(--font-display)] text-[26px] font-semibold leading-none text-[#33241C]">
                  {weightKg !== null ? weightKg : weightLabel}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wide text-[#8A7C74]">
                  kg anbefalet
                </div>
              </div>
            </div>
            <div className="text-center text-xs font-semibold tracking-wide text-[#71805F]">
              Gratis bytte på vægt
            </div>
          </div>
        </div>

        <div className="mx-6 mt-6 flex items-start gap-3.5 rounded-2xl border border-[#D8E1CC] bg-[#E4E9DC] px-5 py-4 md:mx-10">
          <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-[#71805F]" />
          <p className="text-[14.5px] leading-relaxed text-[#5A473E]">
            Baseret på dine svar anbefaler vi{' '}
            <strong className="font-semibold text-[#33241C]">
              {weightLabel}
            </strong>{' '}
            til dig. Husk: vi tilbyder en gratis bytteordning på vægt, så du
            altid kan bytte til en anden vægt helt gratis.
          </p>
        </div>

        <div className="space-y-9 px-6 py-9 md:px-10">
          <div className="flex flex-wrap gap-2.5">
            {BENEFIT_CHIPS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-full bg-[#EFD9CC] px-4 py-2.5 text-[13.5px] font-medium text-[#33241C]"
              >
                <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-[#C1714A] text-[10px] text-white">
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>

          <div>
            <h3 className="mb-3 font-[family-name:var(--font-display)] text-xl font-semibold text-[#33241C]">
              Hvorfor en tyngdedyne kan hjælpe
            </h3>
            <p className="text-sm leading-relaxed text-[#5A473E]">
              Børn med angst har ofte et nervesystem, der er i konstant
              alarmberedskab. Tyngdedynens jævne tryk sender et signal om
              tryghed til hjernen og kan hjælpe barnet med at slappe af. Det er
              det samme mekanisme, som gør, at børn ofte søger fysisk kontakt,
              når de er utrygge. Vores tyngdedyne til børn {size} er stille og
              uden forstyrrende plastiklyde.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-[family-name:var(--font-display)] text-xl font-semibold text-[#33241C]">
              Tips til at få mest ud af din tyngdedyne
            </h3>
            <div className="space-y-2">
              {TIPS.map((tip) => (
                <div
                  key={tip}
                  className="flex items-start gap-3 rounded-xl border border-[#EDE4DA] bg-[#FBF6F0] px-4 py-3 text-sm text-[#33241C]"
                >
                  <span className="mt-0.5 flex-none font-semibold text-[#C1714A]">
                    ✓
                  </span>
                  {tip}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-[family-name:var(--font-display)] text-xl font-semibold text-[#33241C]">
              Vores garantier
            </h3>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {GUARANTEES.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl p-4 transition hover:-translate-y-0.5 hover:bg-[#FBF6F0] cursor-pointer"
                    onClick={() => router.push(item.url)}
                  >
                    <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EFD9CC] text-[#C1714A]">
                      <Icon size={18} strokeWidth={2} />
                    </div>
                    <h4 className="font-semibold text-[#33241C]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#8A7C74]">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="mx-6 mb-9 rounded-[18px] px-6 py-11 text-center md:mx-10"
          style={{
            backgroundColor: '#33241C',
            backgroundImage:
              'radial-gradient(circle at 6px 6px, rgba(255,255,255,0.05) 1.5px, transparent 1.5px)',
            backgroundSize: '18px 18px',
          }}
        >
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
            Ikke helt sikker endnu?
          </h3>
          <p className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-[#D8C9BE]">
            Tag quizzen igen eller kontakt os for personlig rådgivning. Vi
            hjælper dig gerne med at finde den perfekte tyngdedyne.
          </p>
          <p className="mt-4 text-sm text-[#F3E9DF]">
            Ring til os på <strong>+45 29 82 29 73</strong> – vi sidder klar til
            at hjælpe.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              className="rounded-[9px] bg-[#F3E9DF] px-7 py-3.5 text-sm font-semibold text-[#33241C] transition hover:opacity-90"
              onClick={() => router.push('/guides/produktfinder-quiz')}
            >
              Tag quizzen igen
            </button>
            <button
              className="rounded-[9px] border border-[#6B584B] px-7 py-3.5 text-sm font-semibold text-[#F3E9DF] transition hover:bg-white/5"
              onClick={() => router.push('/kontakt-restfulblanket')}
            >
              Kontakt os
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
