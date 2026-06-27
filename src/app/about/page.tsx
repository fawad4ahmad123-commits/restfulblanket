import { AboutHero } from '@/src/components/about/about-hero';
import { AttemptsSection } from '@/src/components/about/attempts-section';
import { Certifications } from '@/src/components/about/certifications';
import { CompanySection } from '@/src/components/about/company-section';
import { CTASection } from '@/src/components/about/cta-section';
import { DocumentationSection } from '@/src/components/about/documentation-section';
import { FounderQuote } from '@/src/components/about/founder-quote';
import { FounderSection } from '@/src/components/about/founder-section';
import { ImpactSection } from '@/src/components/about/impact-section';
import { StatsBar } from '@/src/components/about/stats-bar';
import ProductCategories from '@/src/components/Home/product-categories';
import { getCategories } from '@/src/lib/products';

export default async function AboutPage() {
  const [categories] = await Promise.all([getCategories()]);

  return (
    <main className="bg-[#f8f5f2]">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <AboutHero />
        <AttemptsSection />
        <div className="container mx-auto">
          <CompanySection />
        </div>
        <ImpactSection />
        <Certifications />
        <DocumentationSection />
        <StatsBar />
        <FounderQuote />
        <FounderSection />
        <CTASection />
        <ProductCategories response_categories={categories} isCategory={true} />
      </div>
    </main>
  );
}
