import { notFound } from 'next/navigation';
import { getExperts } from '@/src/lib/expert';
import ForedragPage from '@/src/components/foredrag';

export default async function Page() {
  const slug = 'foredrag-ro-i-nervesystemet-og-bedre-soevn';
  const result = await getExperts(slug);
  const page = Array.isArray(result) ? result[0] : (result?.data ?? result);

  if (!page) return notFound();

  return <ForedragPage page={page} />;
}
