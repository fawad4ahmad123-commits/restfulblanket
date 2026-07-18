import { notFound } from 'next/navigation';
import { getWpPageBySlug, stripHtml } from '@/src/lib/wp';
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
import { formatAboutData } from '@/src/utilty/format-about-data';
import { AboutProvider } from '@/src/core/context/about-context';
import { WpPageProvider } from '@/src/core/context/wp-page-context';
import { WpTitle } from '@/src/components/about/wp-title';
import { WpHeroImage } from '@/src/components/about/wp-hero-image';
import { WpContent } from '@/src/components/about/wp-content';
import { parseWpPage } from '@/src/lib/parse-wp-about';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: Promise<{ slug?: string[] }>;
}

const SLUG_MAP: Record<string, string> = {
  'restfulblanket-rsv': 'restfulblanket-rsv',
  'presse-og-mediekit': 'presse-og-mediekit',
  'verdensmaal-baeredygtighed': 'verdensmaal-baeredygtighed',
  anmeldelser: 'anmeldelser',
};

function resolveWpSlug(segments: string[]) {
  const routeSlug = segments.join('/');
  return SLUG_MAP[routeSlug] ?? routeSlug;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const segments = slug ?? [];
  const wpSlug = segments.length ? resolveWpSlug(segments) : 'om-os';

  const page = await getWpPageBySlug(wpSlug);
  if (!page) return {};

  return {
    title: stripHtml(page.title.rendered),
    description: stripHtml(page.excerpt?.rendered || '').slice(0, 160),
  };
}

export default async function AboutCatchAllPage({ params }: Props) {
  const { slug } = await params;
  const segments = slug ?? [];

  if (segments.length === 0) {
    const [categories, wpPage] = await Promise.all([
      getCategories(),
      getWpPageBySlug('om-os'),
    ]);

    if (!wpPage) {
      notFound();
    }

    const aboutContextData = formatAboutData(wpPage);

    return (
      <AboutProvider data={aboutContextData}>
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
            <ProductCategories
              response_categories={categories}
              isCategory={true}
            />
          </div>
        </main>
      </AboutProvider>
    );
  }

  const wpSlug = resolveWpSlug(segments);

  if (!wpSlug) {
    notFound();
  }

  const rawPage = await getWpPageBySlug(wpSlug);

  if (!rawPage) {
    notFound();
  }

  const parsedPage = parseWpPage(rawPage);

  return (
    <WpPageProvider page={parsedPage}>
      <main className="bg-[#f8f5f2]">
        <div className="container mx-auto max-w-6xl px-6 py-16">
          <WpTitle className="mb-8 text-4xl leading-tight text-[#3d2f27] md:text-5xl" />
          <WpHeroImage />
          <WpContent />
        </div>
      </main>
    </WpPageProvider>
  );
}
