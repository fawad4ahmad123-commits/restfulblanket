import Article from '@/src/components/blog/blog-detail';
import { getBlogBySlug } from '@/src/lib/blog';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  return <Article blog={blog} />;
}
