import { notFound } from 'next/navigation';
import { getWpPageBySlug, stripHtml } from '@/src/lib/wp';
import { AboutHero } from '@/src/components/about/about-hero';
import { AttemptsSection } from '@/src/components/about/attempts-section';
import { CompanySection } from '@/src/components/about/company-section';
import { FounderSection } from '@/src/components/about/founder-section';
import ProductCategories from '@/src/components/Home/product-categories';
import { getCategories } from '@/src/lib/products';
import { formatAboutData } from '@/src/utilty/format-about-data';
import { AboutProvider } from '@/src/core/context/about-context';
import { WpPageProvider } from '@/src/core/context/wp-page-context';
import { WpTitle } from '@/src/components/about/wp-title';
import { WpHeroImage } from '@/src/components/about/wp-hero-image';
import { WpContent } from '@/src/components/about/wp-content';
import { parseWpPage } from '@/src/lib/parse-wp-about';
import ExpertSection from '@/src/components/expert';
import { getRankMathSEO } from '@/src/lib/seo';
import ExpertDetailPage from '@/src/components/expert-panel';

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

  if (segments[0] === 'ekspertpanel') {
    if (segments.length === 1) {
      const seo = await getRankMathSEO(
        `${process.env.NEXT_PUBLIC_SITE_URL}/om-os/ekspertpanel`,
      );

      const title =
        seo?.head?.match(/<title>(.*?)<\/title>/)?.[1] ||
        'Our Experts | Tap Book Me';

      const description =
        seo?.head?.match(/<meta name="description" content="(.*?)"/)?.[1] ||
        'Meet our sleep and wellness experts and learn more about their experience and expertise.';

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/om-os/ekspertpanel`,
        },
      };
    }

    return {};
  }

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

  if (segments[0] === 'ekspertpanel') {
    if (segments.length === 1) {
      return (
        <main className="min-h-screen bg-[#fff9f5] py-12">
          <ExpertSection />
        </main>
      );
    }

    const expertSlug = segments[1];
    if (!expertSlug) {
      notFound();
    }
    return <ExpertDetailPage slug={expertSlug} />;
  }

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
        <main className="bg-[#fdf9f6]">
          <div className="container mx-auto max-w-7xl px-6 py-16">
            <AboutHero />
            <AttemptsSection />
            <div className="container mx-auto">
              <CompanySection />
            </div>
            <FounderSection />
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
