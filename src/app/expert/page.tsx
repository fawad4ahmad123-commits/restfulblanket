import ExpertSection from '@/src/components/expert';
import { getRankMathSEO } from '@/src/lib/seo';

export async function generateMetadata() {
  const seo = await getRankMathSEO(
    `${process.env.NEXT_PUBLIC_SITE_URL}/experts`,
  );

  const title =
    seo?.head?.match(/<title>(.*?)<\/title>/)?.[1] ||
    'Our Experts | Tap Book Me';

  const description =
    seo?.head?.match(/<meta name="description" content="(.*?)"/)?.[1] ||
    'Meet our sleep and wellness experts and learn more about their experience and expertise.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/experts`,
    },
  };
}

const ExpertsPage = () => {
  return (
    <main className="min-h-screen bg-[#f7f4f1] py-12">
      <ExpertSection />
    </main>
  );
};

export default ExpertsPage;
