import { API_ENDPOINTS } from './account-information';

export interface RankMathMeta {
  title: string | null;
  description: string | null;
  canonical: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
}

export async function fetchRankMathMeta(
  pageUrl: string,
): Promise<RankMathMeta> {
  const endpoint = `${API_ENDPOINTS.rankMathHead}?url=${encodeURIComponent(
    pageUrl,
  )}`;

  console.log('RankMath URL:', pageUrl);
  console.log('RankMath Endpoint:', endpoint);

  const response = await fetch(endpoint);

  console.log('RankMath Status:', response.status);
  console.log('RankMath OK:', response.ok);

  if (!response.ok) {
    throw new Error('Could not load RankMath SEO data.');
  }

  const data = await response.json();

  console.log('RankMath Response:', data);
  console.log('RankMath Head:', data?.head);

  return parseRankMathHead(data?.head || '');
}

function parseRankMathHead(headHtml: string): RankMathMeta {
  console.log('RankMath Raw HTML:', headHtml);

  if (typeof window === 'undefined' || !headHtml) {
    console.log('RankMath Empty HTML or SSR');
    return emptyMeta();
  }

  const doc = new DOMParser().parseFromString(headHtml, 'text/html');

  const getMetaContent = (selector: string) =>
    doc.querySelector(selector)?.getAttribute('content') || null;

  const meta = {
    title: doc.querySelector('title')?.textContent || null,
    description: getMetaContent('meta[name="description"]'),
    canonical:
      doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || null,
    ogTitle: getMetaContent('meta[property="og:title"]'),
    ogDescription: getMetaContent('meta[property="og:description"]'),
    ogImage: getMetaContent('meta[property="og:image"]'),
  };

  console.log('RankMath Parsed Meta:', meta);

  return meta;
}

function emptyMeta(): RankMathMeta {
  return {
    title: null,
    description: null,
    canonical: null,
    ogTitle: null,
    ogDescription: null,
    ogImage: null,
  };
}
