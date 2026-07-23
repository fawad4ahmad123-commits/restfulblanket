import { GuidePage } from '@/src/components/guide/GuidePage';
import { fetchGuidePageBySlug } from '@/src/lib/wp-api';
import { parseGuidePage } from '@/src/lib/wp-parser';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Handelsbetingelser',
    description: '',
  };
}

export default async function Page() {
  const page = await fetchGuidePageBySlug('handelsbetingelser');

  if (!page) {
    notFound();
  }

  const guide = parseGuidePage(page);

  return <GuidePage guide={guide} />;
}
