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
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ExpertDetail from '@/src/components/expert/expert-detail';
import { getExperts } from '@/src/utilty/expert-formater';
import { Loader } from '@/src/components/loader';

const ExpertRichText = ({
  html,
  className = '',
}: {
  html: string;
  className?: string;
}) => (
  <div
    className={`expert-richtext text-sm leading-7 text-[#6F6258] [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:text-[#4F433B] [&_strong]:font-semibold [&_a]:text-[#7B6A5E] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#5F5148] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:mb-4 ${className}`}
    dangerouslySetInnerHTML={{ __html: html }}
  />
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
  <section className="mt-12">
    <h2 className="mb-4 font-serif text-xl text-[#736760]">{title}</h2>
    <div className="flex flex-col gap-6 md:flex-row md:items-start">
      <ExpertRichText html={html} className="flex-1 md:order-1" />
      {!!images?.length && (
        <div className="flex flex-shrink-0 flex-row gap-3 md:order-2 md:w-56 md:flex-col">
          {images.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl"
            >
              <Image
                src={img.src}
                alt={img.alt || title}
                fill
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
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="overflow-hidden rounded-xl border border-stone-200 bg-white transition-shadow duration-200 hover:shadow-sm">
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      className="group flex w-full items-center justify-between px-5 py-4 text-left md:px-6 md:py-5"
    >
      <span className="pr-4 text-sm font-medium leading-snug tracking-wide text-stone-800">
        {question}
      </span>
      <span className="flex-shrink-0 text-stone-500 transition-colors duration-150 group-hover:text-stone-800">
        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </span>
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="px-5 pb-5 md:px-6 md:pb-6">
        <div className="mb-4 h-px bg-stone-100" />
        <p className="text-sm leading-relaxed text-stone-500">{answer}</p>
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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    setLoading(true);
    getExperts(slug).then((data) => {
      if (!active) return;
      setExpertData(data);
      setLoading(false);
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

  if (!expertData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Expert not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf9f6]">
      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="text-xs text-[#736760]">
          Home &gt; om-os &gt; ekspertpanel &gt; {expertData.name}
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-4 md:py-8 lg:py-13">
        <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full md:h-20 md:w-20">
            <Image
              src={
                expertData.image ||
                expertData.author?.avatarUrl ||
                '/placeholder-avatar.png'
              }
              alt={expertData.name ?? 'Expert'}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="font-serif text-3xl text-[#35281E] md:text-4xl">
              {expertData.name}
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#736760] md:max-w-3xl">
              {expertData.title}
            </p>

            {!!expertData?.tags?.length && (
              <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
                {expertData.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#E9DDD4] bg-[#faf4ee] px-3 py-1.5 text-xs text-[#5F5148]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {(expertData.introductionHtml || expertData.introduction) && (
          <section className="mt-12">
            <h2 className="mb-4 font-serif text-xl text-[#736760]">
              Introduction
            </h2>

            {expertData.introductionHtml ? (
              <ExpertRichText html={expertData.introductionHtml} />
            ) : (
              <p className="text-sm leading-7 text-[#6F6258]">
                {expertData.introduction}
              </p>
            )}
          </section>
        )}

        {!!expertData?.professionalOverview?.length && (
          <section className="mt-12">
            <h2 className="mb-5 font-serif text-xl text-[#736760]">
              Professional overview
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {expertData.professionalOverview.map(
                (item: any, index: number) => {
                  const icons = [Heart, ShieldCheck, Lightbulb, Briefcase];
                  const Icon = icons[index % icons.length];

                  return (
                    <Card key={index} className="border-[#e9ddd4] bg-[#faf4ee]">
                      <CardContent className="p-5">
                        <Icon className="mb-3 h-6 w-6 text-[#7B6A5E]" />
                        <p className="text-sm text-[#7A6E65]">
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
          <section className="mt-12">
            <h2 className="mb-6 font-serif text-xl text-[#736760]">
              Education & Training
            </h2>

            {expertData.education.map((item: any, i: number) => (
              <div
                key={`${item.year}-${i}`}
                className="border-b border-[#e9ddd4] py-3"
              >
                <span className="text-sm text-[#8B7E74]">{item.year}</span>
                <p className="text-sm text-[#4F433B]">{item.title}</p>
              </div>
            ))}
          </section>
        )}

        {!!expertData?.focusAreas?.length && (
          <section className="mt-12">
            <h2 className="mb-6 font-serif text-xl text-[#736760]">
              Faglige fokusområder
            </h2>

            <div className="space-y-8">
              {expertData.focusAreas.map((area: any) => (
                <div key={area.title}>
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
          <section className="mt-12">
            <h2 className="mb-4 font-serif text-xl text-[#736760]">
              Arbejdsfilosofi
            </h2>
            <ExpertRichText html={expertData.workPhilosophyHtml} />
          </section>
        )}

        {expertData.vulnerableGroupsHtml && (
          <section className="mt-12">
            <h2 className="mb-4 font-serif text-xl text-[#736760]">
              Erfaring med sårbare grupper
            </h2>
            <ExpertRichText html={expertData.vulnerableGroupsHtml} />
          </section>
        )}

        {expertData.roleDescriptionHtml && (
          <section className="mt-12">
            <h2 className="mb-4 font-serif text-xl text-[#736760]">
              Rolle i RestfulBlanket
            </h2>
            <ExpertRichText html={expertData.roleDescriptionHtml} />

            {!!expertData?.reviewedArticles?.length && (
              <ul className="mt-2 space-y-2">
                {expertData.reviewedArticles.map((article: any) => (
                  <li key={article.url}>
                    <a
                      href={article.url}
                      className="text-sm font-semibold text-[#7B6A5E] underline underline-offset-2 hover:text-[#5F5148]"
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
          <section className="mt-12">
            <h2 className="mb-6 font-serif text-xl text-[#736760]">
              Ofte stillede spørgsmål
            </h2>

            <div className="flex flex-col gap-3">
              {expertData.faqs.map((faq: any, index: number) => (
                <FAQItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaqIndex === index}
                  onToggle={() => toggleFaq(index)}
                />
              ))}
            </div>
          </section>
        )}

        {expertData.disclaimerHtml && (
          <section className="mt-12 border-t border-[#e9ddd4] pt-8">
            <h2 className="mb-4 font-serif text-xl text-[#736760]">
              Afgrænsning
            </h2>
            <ExpertRichText html={expertData.disclaimerHtml} />
          </section>
        )}

        <section className="mt-12 border-t border-[#e9ddd4] pt-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            <div className="relative h-56 w-56 flex-shrink-0 overflow-hidden rounded-2xl md:h-64 md:w-64">
              <Image
                src={
                  expertData.image ||
                  expertData.author?.avatarUrl ||
                  '/placeholder-avatar.png'
                }
                alt={expertData.name ?? 'Expert'}
                fill
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
