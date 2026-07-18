export interface WpPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  link: string;
  _embedded?: {
    'wp:featuredmedia'?: [
      {
        source_url: string;
        alt_text: string;
      },
    ];
  };
}

const WP_BASE_URL = 'https://tapbookme.com/wp-json/wp/v2';

export async function getWpPageBySlug(slug: string): Promise<WpPage | null> {
  const res = await fetch(`${WP_BASE_URL}/pages?slug=${slug}&_embed`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch WP page "${slug}": ${res.status}`);
  }

  const pages: WpPage[] = await res.json();
  return pages[0] ?? null;
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').trim();
}

export function getFeaturedImage(
  page: WpPage,
): { src: string; alt: string } | null {
  const media = page._embedded?.['wp:featuredmedia']?.[0];
  if (!media?.source_url) return null;

  return {
    src: media.source_url,
    alt: media.alt_text || '',
  };
}
