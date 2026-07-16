import { GuidePage } from '@/src/components/guide/GuidePage';
import { fetchGuidePageBySlug } from '@/src/lib/wp-api';
import { parseGuidePage } from '@/src/lib/wp-parser';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    slug?: string[];
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const pageSlug = slug?.length ? slug.join('/') : 'guides';

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
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: guide.title,
      images: guide.heroImage ? [guide.heroImage.src] : undefined,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const pageSlug = slug?.length ? slug.join('/') : 'guides';

  const page = await fetchGuidePageBySlug(pageSlug);

  if (!page) {
    notFound();
  }

  const guide = parseGuidePage(page);

  return <GuidePage guide={guide} />;
}
