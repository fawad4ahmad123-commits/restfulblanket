import { GuidesHub } from '@/src/components/guide/guide-hub-page';
import { GuidePage } from '@/src/components/guide/GuidePage';
import { fetchGuidePageBySlug } from '@/src/lib/wp-api';
import { parseGuidePage, parseGuidesHubPage } from '@/src/lib/wp-parser';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    slug?: string[];
  }>;
}

function getPageSlug(slug?: string[]) {
  if (!slug || !Array.isArray(slug) || slug.length === 0) {
    return 'om-vores-dyner';
  }

  return slug.map((part) => decodeURIComponent(part)).join('/');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const pageSlug = getPageSlug(slug);

  const page = await fetchGuidePageBySlug(pageSlug);

  if (!page) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const guide = parseGuidePage(page);

  return {
    title: guide.title,
    openGraph: {
      title: guide.title,
      images: guide.heroImage ? [guide.heroImage.src] : undefined,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const pageSlug = getPageSlug(slug);

  if (pageSlug === 'om-vores-dyner') {
    const hubPage = await fetchGuidePageBySlug(pageSlug);

    if (!hubPage) {
      notFound();
    }

    const hub = parseGuidesHubPage(hubPage);

    return <GuidesHub hub={hub} />;
  }

  const page = await fetchGuidePageBySlug(pageSlug);

  if (!page) {
    notFound();
  }

  const guide = parseGuidePage(page);

  return <GuidePage guide={guide} />;
}
