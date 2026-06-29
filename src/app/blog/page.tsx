import Blog from '@/src/components/blog';
import { getBlogs } from '@/src/lib/blog';
import { formatBlogs } from '@/src/utilty/blog-formater';

export default async function BlogPage() {
  const blog = await getBlogs();
  const response = formatBlogs(blog);
  console.log('t2 blog', { response });
  return (
    <main className="min-h-screen bg-[#F7F3EF]">
      <Blog blogs={response} />
    </main>
  );
}
