import type { WPGuidePage } from '../types/wp';

const WP_BASE_URL = 'https://tapbookme.com/wp-json/wp/v2';

export async function fetchGuidePageBySlug(
  slug: string,
): Promise<WPGuidePage | null> {
  const res = await fetch(
    `${WP_BASE_URL}/pages?slug=${encodeURIComponent(slug)}`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error(`WordPress API request failed with status ${res.status}`);
  }

  const data = (await res.json()) as WPGuidePage[];
  return data[0] ?? null;
}

export async function fetchAllGuidePages(
  guidesHubParentId?: number,
): Promise<WPGuidePage[]> {
  const params = new URLSearchParams({ per_page: '100' });
  if (guidesHubParentId) params.set('parent', String(guidesHubParentId));

  const res = await fetch(`${WP_BASE_URL}/pages?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`WordPress API request failed with status ${res.status}`);
  }

  return (await res.json()) as WPGuidePage[];
}
