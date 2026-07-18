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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (!slug?.length) {
    return {
      title: 'Vores Projekter — RestfulBlanket',
    };
  }

  const pageSlug = slug.join('/');
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

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  if (!slug?.length) {
    const hubPage = await fetchGuidePageBySlug('social-projekter');

    if (!hubPage) {
      notFound();
    }

    const hub = parseGuidesHubPage(hubPage);

    return <GuidesHub hub={hub} />;
  }

  const pageSlug = slug.join('/');
  const page = await fetchGuidePageBySlug(pageSlug);

  if (!page) {
    notFound();
  }

  const guide = parseGuidePage(page);

  return <GuidePage guide={guide} />;
}
