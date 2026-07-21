import { KrisecenterContent } from '@/src/components/guide/project';
import { fetchGuidePageBySlug } from '@/src/lib/wp-api';
import { parseGuidePage } from '@/src/lib/wp-parser';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchGuidePageBySlug('krisecenter');
  if (!page) return { robots: { index: false, follow: false } };
  const guide = parseGuidePage(page);
  return {
    title: guide.title,
    openGraph: {
      title: guide.title,
      images: guide.heroImage ? [guide.heroImage.src] : undefined,
    },
  };
}

export default async function KrisecenterPage() {
  const page = await fetchGuidePageBySlug('krisecenter');
  if (!page) notFound();
  const guide = parseGuidePage(page);

  return (
    <main className="bg-[#fdf9f6] pb-20">
      <div className="mx-auto max-w-5xl px-4 pt-10">
        <h1 className="text-3xl font-bold mb-8">{guide.title}</h1>
        <KrisecenterContent html={page.content.rendered} />
      </div>
    </main>
  );
}
