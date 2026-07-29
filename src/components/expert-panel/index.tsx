'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import {
  Heart,
  ShieldCheck,
  Lightbulb,
  Briefcase,
  Minus,
  Plus,
  Check,
  Sparkles,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ExpertDetail from '@/src/components/expert/expert-detail';
import { getExperts } from '@/src/utilty/expert-formater';
import { Loader } from '@/src/components/loader';

const FALLBACK_AVATAR = '/placeholder-avatar.png';

const ICON_TONES = [
  { bg: 'bg-[#7B6A5E]/10', ring: 'ring-[#7B6A5E]/20', fg: 'text-[#7B6A5E]' },
  { bg: 'bg-[#8B7E74]/10', ring: 'ring-[#8B7E74]/20', fg: 'text-[#8B7E74]' },
  { bg: 'bg-[#5F5148]/10', ring: 'ring-[#5F5148]/20', fg: 'text-[#5F5148]' },
  { bg: 'bg-[#4F433B]/10', ring: 'ring-[#4F433B]/20', fg: 'text-[#4F433B]' },
];

const resolveAvatar = (expert: any) =>
  expert?.image || expert?.author?.avatarUrl || FALLBACK_AVATAR;

const ExpertRichText = ({
  html,
  className = '',
}: {
  html: string;
  className?: string;
}) => (
  <div
    className={`expert-richtext text-[15px] leading-7 text-[#6F6258] [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:text-[#4F433B] [&_strong]:font-semibold [&_a]:text-[#7B6A5E] [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-[#e9ddd4] [&_a]:transition-colors hover:[&_a]:text-[#5F5148] focus-visible:[&_a]:outline-none focus-visible:[&_a]:ring-2 focus-visible:[&_a]:ring-[#7B6A5E]/40 focus-visible:[&_a]:rounded-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:mb-4 ${className}`}
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

const SectionHeading = ({
  eyebrow,
  children,
}: {
  eyebrow?: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6 flex items-start gap-4">
    <span
      aria-hidden="true"
      className="mt-1.5 h-6 w-1 flex-shrink-0 rounded-full bg-gradient-to-b from-[#7B6A5E] to-[#7B6A5E]/30"
    />
    <div>
      {eyebrow && (
        <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#8B7E74]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-2xl leading-tight text-[#4F433B]">
        {children}
      </h2>
    </div>
  </div>
);

const GenericSection = ({
  title,
  html,
  images,
}: {
  title: string;
  html: string;
  images: { src: string; alt: string }[];
}) => (
  <section className="mt-16">
    <SectionHeading>{title}</SectionHeading>
    <div className="flex flex-col gap-6 md:flex-row md:items-start">
      <ExpertRichText html={html} className="flex-1 md:order-1" />
      {!!images?.length && (
        <div className="flex flex-shrink-0 flex-row gap-3 md:order-2 md:w-56 md:flex-col">
          {images.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#faf4ee] shadow-sm ring-1 ring-[#e9ddd4]"
            >
              <Image
                src={img.src}
                alt={img.alt || title}
                fill
                sizes="(min-width: 768px) 224px, 100vw"
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);

const FAQItem = ({
  question,
  answer,
  isOpen,
  onToggle,
  panelId,
  buttonId,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  panelId: string;
  buttonId: string;
}) => (
  <div
    className={`overflow-hidden rounded-2xl border bg-white transition-all duration-200 ${
      isOpen
        ? 'border-[#d8c9bb] shadow-md'
        : 'border-stone-200 hover:border-[#e2d5c8] hover:shadow-sm'
    }`}
  >
    <h3>
      <button
        id={buttonId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#7B6A5E]/50 focus-visible:ring-inset"
      >
        <span className="text-[15px] font-medium leading-snug tracking-wide text-stone-800">
          {question}
        </span>
        <span
          aria-hidden="true"
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-colors duration-150 ${
            isOpen
              ? 'border-[#7B6A5E] bg-[#7B6A5E] text-white'
              : 'border-stone-200 text-stone-500 group-hover:border-[#e9ddd4] group-hover:text-stone-800'
          }`}
        >
          {isOpen ? (
            <Minus className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </span>
      </button>
    </h3>
    <div
      id={panelId}
      role="region"
      aria-labelledby={buttonId}
      hidden={!isOpen}
      className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}
    >
      <div className="overflow-hidden">
        <div className="px-6 pb-6">
          <div className="mb-4 h-px bg-stone-100" />
          <p className="text-sm leading-relaxed text-stone-500">{answer}</p>
        </div>
      </div>
    </div>
  </div>
);

interface ExpertDetailPageProps {
  slug?: string;
}

const ExpertDetailPage = ({ slug: slugProp }: ExpertDetailPageProps) => {
  const params = useParams<{ slug: string }>();
  const slug = slugProp ?? (params?.slug as string);

  const [expertData, setExpertData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    setLoading(true);
    setNotFound(false);

    getExperts(slug)
      .then((data) => {
        if (!active) return;
        if (!data) {
          setNotFound(true);
        } else {
          setExpertData(data);
        }
      })
      .catch(() => {
        if (active) setNotFound(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  if (loading) {
    return <Loader />;
  }

  if (notFound || !expertData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-[#fdf9f6] px-4 text-center">
        <p className="font-serif text-2xl text-[#35281E]">
          Vi kunne ikke finde denne ekspert
        </p>
        <p className="text-sm text-[#736760]">
          Profilen findes muligvis ikke længere, eller linket er forkert.
        </p>
      </div>
    );
  }

  const avatarSrc = resolveAvatar(expertData);

  return (
    <div className="min-h-screen bg-[#fdf9f6]">
      <nav aria-label="Brødkrumme" className="mx-auto max-w-7xl px-4 py-5">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-[#736760]">
          <li>Home</li>
          <li aria-hidden="true">&gt;</li>
          <li>om-os</li>
          <li aria-hidden="true">&gt;</li>
          <li>ekspertpanel</li>
          <li aria-hidden="true">&gt;</li>
          <li aria-current="page" className="text-[#4F433B]">
            {expertData.name}
          </li>
        </ol>
      </nav>

      <div className="container mx-auto max-w-7xl px-4 pb-16">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-[2rem] border border-[#e9ddd4] bg-gradient-to-br from-[#faf4ee] via-[#fdf9f6] to-[#f6ece1] px-6 py-10 md:px-14 md:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#7B6A5E]/[0.06] blur-2xl md:h-72 md:w-72"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-[#8B7E74]/[0.06] blur-2xl"
          />

          <div className="relative flex flex-col items-center gap-7 text-center md:flex-row md:items-center md:gap-10 md:text-left">
            <div className="relative h-36 w-36 flex-shrink-0 md:h-48 md:w-48">
              <div className="absolute -inset-2 rounded-full border border-[#7B6A5E]/15" />
              <div className="relative h-full w-full overflow-hidden rounded-full ring-4 ring-white shadow-xl">
                <Image
                  src={avatarSrc}
                  alt={
                    expertData.name
                      ? `Portræt af ${expertData.name}`
                      : 'Ekspert'
                  }
                  fill
                  sizes="(min-width: 768px) 192px, 144px"
                  priority
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            <div className="flex-1">
              {expertData.role && (
                <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#8B7E74]">
                  <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                  Ekspertpanel
                </p>
              )}
              <h1 className="font-serif text-4xl leading-tight text-[#35281E] md:text-5xl">
                {expertData.name}
              </h1>

              <p className="mt-3 text-[15px] leading-6 text-[#736760] md:max-w-2xl">
                {expertData.title}
              </p>

              {!!expertData?.tags?.length && (
                <ul className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                  {expertData.tags.map((tag: string, i: number) => (
                    <li
                      key={`${tag}-${i}`}
                      className="rounded-full border border-[#E9DDD4] bg-white/70 px-3.5 py-1.5 text-xs font-medium text-[#5F5148] shadow-sm transition-colors hover:bg-white"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {(expertData.introductionHtml || expertData.introduction) && (
          <section className="mt-16">
            <SectionHeading eyebrow="Om eksperten">Introduction</SectionHeading>

            {expertData.introductionHtml ? (
              <ExpertRichText html={expertData.introductionHtml} />
            ) : (
              <p className="text-[15px] leading-7 text-[#6F6258]">
                {expertData.introduction}
              </p>
            )}
          </section>
        )}

        {!!expertData?.professionalOverview?.length && (
          <section className="mt-16">
            <SectionHeading>Professional overview</SectionHeading>

            <div className="grid gap-5 sm:grid-cols-2">
              {expertData.professionalOverview.map(
                (item: any, index: number) => {
                  const icons = [Heart, ShieldCheck, Lightbulb, Briefcase];
                  const Icon = icons[index % icons.length];
                  const tone = ICON_TONES[index % ICON_TONES.length];

                  return (
                    <Card
                      key={index}
                      className="group relative overflow-hidden border-[#e9ddd4] bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#7B6A5E] to-[#7B6A5E]/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      />
                      <CardContent className="p-6">
                        <span
                          className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${tone.bg} ${tone.ring}`}
                        >
                          <Icon
                            aria-hidden="true"
                            className={`h-6 w-6 ${tone.fg}`}
                          />
                        </span>
                        <p className="text-sm leading-6 text-[#7A6E65]">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                },
              )}
            </div>
          </section>
        )}

        {!!expertData?.education?.length && (
          <section className="mt-16">
            <SectionHeading>Education &amp; Training</SectionHeading>

            <ul className="overflow-hidden rounded-2xl border border-[#e9ddd4] bg-white">
              {expertData.education.map((item: any, i: number) => (
                <li
                  key={`${item.title}-${i}`}
                  className="flex items-start gap-3 border-b border-[#e9ddd4] px-5 py-4 last:border-b-0"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#7B6A5E]/10">
                    <Check
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-[#7B6A5E]"
                    />
                  </span>
                  {item.year && item.year !== '—' && (
                    <span className="text-sm text-[#8B7E74]">{item.year}</span>
                  )}
                  <p className="text-sm text-[#4F433B]">{item.title}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {!!expertData?.focusAreas?.length && (
          <section className="mt-16">
            <SectionHeading>Faglige fokusområder</SectionHeading>

            <div className="space-y-8">
              {expertData.focusAreas.map((area: any) => (
                <div
                  key={area.title}
                  className="rounded-2xl border border-[#e9ddd4] bg-white p-6"
                >
                  <h3 className="mb-2 font-serif text-lg text-[#4F433B]">
                    {area.title}
                  </h3>
                  <ExpertRichText html={area.contentHtml} />
                </div>
              ))}
            </div>
          </section>
        )}

        {expertData.workPhilosophyHtml && (
          <section className="mt-16">
            <SectionHeading>Arbejdsfilosofi</SectionHeading>
            <ExpertRichText html={expertData.workPhilosophyHtml} />
          </section>
        )}

        {expertData.vulnerableGroupsHtml && (
          <section className="mt-16">
            <SectionHeading>Erfaring med sårbare grupper</SectionHeading>
            <ExpertRichText html={expertData.vulnerableGroupsHtml} />
          </section>
        )}

        {expertData.roleDescriptionHtml && (
          <section className="mt-16">
            <SectionHeading>Rolle i RestfulBlanket</SectionHeading>
            <ExpertRichText html={expertData.roleDescriptionHtml} />

            {!!expertData?.reviewedArticles?.length && (
              <ul className="mt-3 space-y-2">
                {expertData.reviewedArticles.map((article: any) => (
                  <li key={article.url}>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#7B6A5E] underline underline-offset-2 transition-colors hover:text-[#5F5148] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B6A5E]/40 focus-visible:rounded-sm"
                    >
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {expertData.furtherReadingHtml && (
              <ExpertRichText
                html={expertData.furtherReadingHtml}
                className="mt-4"
              />
            )}
          </section>
        )}

        {!!expertData?.additionalSections?.length &&
          expertData.additionalSections.map((section: any) => (
            <GenericSection
              key={section.title}
              title={section.title}
              html={section.html}
              images={section.images}
            />
          ))}

        {!!expertData?.faqs?.length && (
          <section className="mt-16">
            <SectionHeading>Ofte stillede spørgsmål</SectionHeading>

            <div className="flex flex-col gap-3">
              {expertData.faqs.map((faq: any, index: number) => (
                <FAQItem
                  key={`${faq.question}-${index}`}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaqIndex === index}
                  onToggle={() => toggleFaq(index)}
                  buttonId={`faq-button-${index}`}
                  panelId={`faq-panel-${index}`}
                />
              ))}
            </div>
          </section>
        )}

        {expertData.disclaimerHtml && (
          <section className="mt-16 border-t border-[#e9ddd4] pt-10">
            <SectionHeading>Afgrænsning</SectionHeading>
            <ExpertRichText html={expertData.disclaimerHtml} />
          </section>
        )}

        <section
          aria-label={`Kontakt ${expertData.name}`}
          className="relative mt-16 overflow-hidden rounded-[2rem] border border-[#e9ddd4] bg-gradient-to-br from-[#faf4ee] to-[#fdf9f6] p-6 shadow-sm md:p-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-[#7B6A5E]/[0.05] blur-2xl"
          />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center">
            <div className="relative mx-auto h-64 w-64 flex-shrink-0 overflow-hidden rounded-3xl shadow-xl ring-4 ring-white md:mx-0 md:h-80 md:w-80">
              <Image
                src={avatarSrc}
                alt={expertData.name ? `Foto af ${expertData.name}` : 'Ekspert'}
                fill
                sizes="(min-width: 768px) 320px, 256px"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex-1">
              <ExpertDetail professional={expertData.professionalOverview} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExpertDetailPage;
