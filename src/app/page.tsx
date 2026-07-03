import Landing from '../components/Home';
import { getBestSellers, getCategories, getPages } from '@/src/lib/products';
import { getBlogs } from '../lib/blog';

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
