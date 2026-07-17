import { GuideHero } from '@/src/components/guide/GuideHero';
import { GuideContent } from '@/src/components/guide/GuideContent';
import { GuidesGrid } from './GuidesGrid';
import { GuidesHubPage } from '@/src/types/wp';

interface GuidesHubPageProps {
  hub: GuidesHubPage;
}

export function GuidesHub({ hub }: GuidesHubPageProps) {
  return (
    <article className="bg-[#fdf9f6] pb-20">
      <GuideHero title={hub.title} heroImage={hub.heroImage} />
      <GuideContent html={hub.beforeGridHtml} />
      <GuidesGrid guides={hub.cards} />
      <GuideContent html={hub.afterGridHtml} />
    </article>
  );
}
