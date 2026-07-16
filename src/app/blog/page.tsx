import Blog from '@/src/components/blog';
import { getBlogs } from '@/src/lib/blog';
import { formatBlogs } from '@/src/utilty/blog-formater';
import { getRankMathSEO } from '@/src/lib/seo';

export async function generateMetadata() {
  const seo = await getRankMathSEO(`${process.env.NEXT_PUBLIC_SITE_URL}/blog`);

  const title =
    seo?.head?.match(/<title>(.*?)<\/title>/)?.[1] || 'Blog | Tap Book Me';

  const description =
    seo?.head?.match(/<meta name="description" content="(.*?)"/)?.[1] ||
    'Read our latest articles and guides.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    },
  };
}

export default async function BlogPage() {
  const blog = await getBlogs();
  const response = formatBlogs(blog);

  return (
    <main className="min-h-screen bg-[#fff9f5]">
      <Blog blogs={response} />
    </main>
  );
}
