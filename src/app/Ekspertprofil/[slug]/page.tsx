import Image from 'next/image';
import { Heart, ShieldCheck, Lightbulb, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ExpertDetail from '@/src/components/expert/expert-detail';
import { getExperts } from '@/src/utilty/expert-formater';

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

const ExpertDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const experts = await getExperts(slug);

  const expertData = experts;

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
          Home &gt; Shop experts &gt; {expertData.name}
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-4 md:py-8 lg:py-13">
        <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full md:h-20 md:w-20">
            <Image
              src={expertData.image || '/placeholder-avatar.png'}
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

        {/* Introduction — supports both plain-text (`introduction`) and
            rich-HTML (`introductionHtml`) shapes so this works for every expert. */}
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

        {/* Focus areas — optional, only present on richer profiles */}
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

        {!!expertData?.faqs?.length && (
          <section className="mt-12">
            <h2 className="mb-6 font-serif text-xl text-[#736760]">
              Ofte stillede spørgsmål
            </h2>

            <div className="space-y-5">
              {expertData.faqs.map((faq: any) => (
                <div
                  key={faq.question}
                  className="border-b border-[#e9ddd4] pb-5"
                >
                  <h3 className="mb-2 text-sm font-semibold text-[#4F433B]">
                    {faq.question}
                  </h3>
                  <p className="text-sm leading-6 text-[#6F6258]">
                    {faq.answer}
                  </p>
                </div>
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

        <ExpertDetail professional={expertData.professionalOverview} />
      </div>
    </div>
  );
};

export default ExpertDetailPage;
