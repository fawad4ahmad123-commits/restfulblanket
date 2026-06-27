import { BlanketHeader } from '@/src/components/categories/blanket-header';
import { CategoryTabs } from '@/src/components/categories/category-tabs';
import ComparisonSection from '@/src/components/categories/comparison-section';
import { ProductGrid } from '@/src/components/categories/product-grid';
import { FAQSection } from '@/src/components/expert/expert-detail/faq-Section';
import ProductCategories from '@/src/components/Home/product-categories';
import TestimonialVideoSlider from '@/src/components/products/video-testimonals.tsx';
import { getCategories } from '@/src/lib/products';

export default async function BlanketsPage() {
  const [categories] = await Promise.all([getCategories()]);
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <BlanketHeader />

      <div className="mt-8">
        <CategoryTabs />
      </div>

      <div className="mt-10 mb-10">
        <ProductGrid />
      </div>
      <TestimonialVideoSlider isCategory={true} />
      <ComparisonSection />
      <FAQSection />
      <ProductCategories response_categories={categories} isCategory={true} />
    </main>
  );
}
