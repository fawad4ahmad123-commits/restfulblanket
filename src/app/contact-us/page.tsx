import { ContactSection } from '@/src/components/contactus';
import { getRankMathSEO } from '@/src/lib/seo';

export async function generateMetadata() {
  const seo = await getRankMathSEO(
    `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
  );

  const title =
    seo?.head?.match(/<title>(.*?)<\/title>/)?.[1] ||
    'Contact Us | Tap Book Me';

  const description =
    seo?.head?.match(/<meta name="description" content="(.*?)"/)?.[1] ||
    'Contact Tap Book Me for support, product questions, and customer service.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
    },
  };
}

export default function ContactPage() {
  return <ContactSection />;
}
