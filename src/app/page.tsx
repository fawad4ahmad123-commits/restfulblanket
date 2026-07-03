import Landing from '../components/Home';
import { getBestSellers, getCategories, getPages } from '@/src/lib/products';

export default async function Home() {
  const [products, categories, pages] = await Promise.all([
    getBestSellers(),
    getCategories(),
    getPages(),
  ]);
  const homePage = pages.find((page: any) => page.slug === 'home');
  console.log('t3', { a: products[0].meta_data });
  return <Landing products={products} response_categories={categories} />;
}
