import ExpertDetailPage from '@/src/components/expert/expert-detail/main';
import { getRankMathSEO } from '@/src/lib/seo';

export async function generateMetadata() {
  const seo = await getRankMathSEO(
    `${process.env.NEXT_PUBLIC_SITE_URL}/experts/john-doe`,
  );

  const title =
    seo?.head?.match(/<title>(.*?)<\/title>/)?.[1] ||
    'Sleep Expert | Restful Blanket';

  const description =
    seo?.head?.match(/<meta name="description" content="(.*?)"/)?.[1] ||
    'Learn more about our sleep expert and their professional experience.';

  return {
    title,
    description,
  };
}

export default function Page() {
  return <ExpertDetailPage />;
}
