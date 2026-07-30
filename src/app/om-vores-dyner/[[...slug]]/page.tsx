import { GuidesHub } from '@/src/components/guide/guide-hub-page';
import { GuidePage } from '@/src/components/guide/GuidePage';
import { fetchGuidePageBySlug } from '@/src/lib/wp-api';
import { parseGuidePage, parseGuidesHubPage } from '@/src/lib/wp-parser';
import WPContent from '@/src/utilty/om-vores-dyner';
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

function getWpSlug(pageSlug: string) {
  const parts = pageSlug.split('/');
  return parts[parts.length - 1];
}

const CUSTOM_GUIDE_SLUGS = new Set<string>(['vaske-tyngdedyne']);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const pageSlug = getPageSlug(slug);

  const page = await fetchGuidePageBySlug(getWpSlug(pageSlug));

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

  const page = await fetchGuidePageBySlug(getWpSlug(pageSlug));

  if (!page) {
    notFound();
  }

  if (CUSTOM_GUIDE_SLUGS.has(getWpSlug(pageSlug))) {
    const plainTitle = page.title.rendered.replace(/<[^>]+>/g, '').trim();

    return (
      <div style={{ backgroundColor: '#fdf9f6' }} className="min-h-screen">
        <div className="px-4 py-3 text-center sm:py-16">
          <h1
            className="mx-auto max-w-6xl text-3xl font-bold sm:text-4xl"
            style={{ color: '#392a22' }}
            dangerouslySetInnerHTML={{ __html: page.title.rendered }}
          />
        </div>

        <article className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <div>
            <WPContent html={page.content.rendered} pageTitle={plainTitle} />
          </div>
        </article>
      </div>
    );
  }

  const guide = parseGuidePage(page);

  return <GuidePage guide={guide} />;
}
