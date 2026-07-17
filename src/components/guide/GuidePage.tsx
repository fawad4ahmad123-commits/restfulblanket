import { ParsedGuidePage } from '@/src/types/wp';
import { GuideHero } from './GuideHero';
import { GuideTableOfContents } from './GuideTableOfContents';
import { GuideContent } from './GuideContent';
import { GuideFaq } from './GuideFaq';
import { GuideAuthorBio } from './GuideAuthorBio';

interface GuidePageProps {
  guide: ParsedGuidePage;
}

export function GuidePage({ guide }: GuidePageProps) {
  return (
    <article className="bg-[#fdf9f6] pb-20">
      <GuideHero title={guide.title} heroImage={guide.heroImage} />
      <GuideTableOfContents items={guide.toc} />
      <GuideContent html={guide.contentHtml} />
      {guide.authorBio && <GuideAuthorBio authorBio={guide.authorBio} />}
      <GuideFaq items={guide.faqs} />
    </article>
  );
}
