import Landing from '../components/Home';
import { getBestSellers, getCategories } from '@/src/lib/products';
import { getBlogs } from '../lib/blog';
import { getRankMathSEO } from '@/src/lib/seo';

export async function generateMetadata() {
  const seo = await getRankMathSEO(`${process.env.NEXT_PUBLIC_SITE_URL}/`);

  const title = seo?.head?.match(/<title>(.*?)<\/title>/)?.[1] || 'Tap Book Me';

  const description =
    seo?.head?.match(/<meta name="description" content="(.*?)"/)?.[1] ||
    'Premium sleep products for better rest.';

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function Home() {
  const [products, categories, blogs] = await Promise.all([
    getBestSellers(),
    getCategories(),
    getBlogs(),
  ]);

  return (
    <Landing
      products={products}
      response_categories={categories}
      blogs={blogs}
    />
  );
}
