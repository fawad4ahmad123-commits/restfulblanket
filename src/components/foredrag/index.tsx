import { parseForedragContent, type Section } from '@/src/lib/foredrag/parse';
import TicketCard from './TicketCard';
import SpeakerCard from './SpeakerCard';
import FAQAccordion from './FAQAccordion';

function ContentSection({ section }: { section: Section }) {
  if (section.speakers?.length) {
    return (
      <div>
        <h2
          className="mb-6 text-2xl text-[#392A22] md:text-3xl"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {section.heading}
        </h2>
        <div className="flex flex-col gap-6">
          {section.speakers.map((s) => (
            <SpeakerCard key={s.name} speaker={s} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2
        className="mb-4 text-2xl text-[#392A22] md:text-3xl"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        {section.heading}
      </h2>
      <div
        className="max-w-none break-words space-y-4 text-[15px] leading-relaxed text-[#392A22]/70
          [&_a]:text-[#392A22] [&_a]:underline [&_a]:decoration-[#392A22]/40 [&_a:hover]:opacity-80
          [&_ul]:list-none [&_ul]:space-y-2 [&_ul]:pl-0
          [&_li]:relative [&_li]:pl-6
          [&_li:before]:absolute [&_li:before]:left-0 [&_li:before]:top-[0.55em] [&_li:before]:h-1.5 [&_li:before]:w-1.5 [&_li:before]:rounded-full [&_li:before]:bg-[#392A22]/50
          [&_strong]:font-semibold [&_strong]:text-[#392A22]
          [&_h3]:mt-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#392A22]"
        dangerouslySetInnerHTML={{ __html: section.html }}
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ForedragPage({ page }: { page: any }) {
  const title: string = page?.title?.rendered ?? '';
  const rawHtml: string = page?.content?.rendered ?? '';
  const parsed = parseForedragContent(rawHtml, title);

  return (
    <main className="min-h-screen bg-[#fdf9f6]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-16 md:gap-16 md:px-8 md:py-20">
        <header>
          <h1
            className="text-3xl leading-tight text-[#392A22] break-words md:text-4xl"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {title}
          </h1>
          {parsed.introHtml && (
            <div
              className="mt-5 max-w-none break-words text-base leading-relaxed text-[#392A22]/70"
              dangerouslySetInnerHTML={{ __html: parsed.introHtml }}
            />
          )}
        </header>

        {parsed.ticket && <TicketCard ticket={parsed.ticket} />}

        {parsed.sections.map((section) => (
          <ContentSection key={section.heading} section={section} />
        ))}
      </div>

      <FAQAccordion faqs={parsed.faqs} />
    </main>
  );
}
