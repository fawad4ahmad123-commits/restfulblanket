import SleepQuiz from '@/src/components/quiz/sleep-quiz';
import { getBestSellers, getCategories } from '@/src/lib/products';

export default async function Page() {
  const [allProducts, categories] = await Promise.all([
    getBestSellers(),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-[#FDF9F6]">
      <SleepQuiz products={allProducts} categories={categories} />
    </main>
  );
}
