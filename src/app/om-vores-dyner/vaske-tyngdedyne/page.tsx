import { fetchGuidePageBySlug } from '@/src/lib/wp-api';
import WPContent from '@/src/utilty/om-vores-dyner';
import { notFound } from 'next/navigation';

interface GuidePageProps {
  params: { slug: string };
}

export default async function Vsketyngdedyne({ params }: GuidePageProps) {
  const page = await fetchGuidePageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1
        className="mb-6 text-3xl font-bold"
        dangerouslySetInnerHTML={{ __html: page.title.rendered }}
      />

      <WPContent html={page.content.rendered} />
    </article>
  );
}
