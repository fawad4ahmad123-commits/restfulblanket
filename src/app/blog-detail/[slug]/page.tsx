import Article from '@/src/components/blog/blog-detail';
import { getBlogBySlug } from '@/src/lib/blog';
import { getRankMathSEO } from '@/src/lib/seo';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  const seo = await getRankMathSEO(
    `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
  );

  const title =
    seo?.head?.match(/<title>(.*?)<\/title>/)?.[1] ||
    blog?.title?.rendered ||
    'Blog Article';

  const description =
    seo?.head?.match(/<meta name="description" content="(.*?)"/)?.[1] ||
    blog?.excerpt?.rendered?.replace(/<[^>]+>/g, '').slice(0, 160) ||
    '';

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  return <Article blog={blog} />;
}
