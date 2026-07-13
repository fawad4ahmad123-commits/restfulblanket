import { API_ENDPOINTS } from "./account-information";

export interface RankMathMeta {
    title: string | null;
    description: string | null;
    canonical: string | null;
    ogTitle: string | null;
    ogDescription: string | null;
    ogImage: string | null;
}

export async function fetchRankMathMeta(pageUrl: string): Promise<RankMathMeta> {
    const endpoint = `${API_ENDPOINTS.rankMathHead}?url=${encodeURIComponent(pageUrl)}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error('Could not load RankMath SEO data.');
    }

    const { head } = await response.json();
    return parseRankMathHead(head || '');
}

function parseRankMathHead(headHtml: string): RankMathMeta {
    if (typeof window === 'undefined' || !headHtml) {
        return emptyMeta();
    }

    const doc = new DOMParser().parseFromString(headHtml, 'text/html');
    const getMetaContent = (selector: string) =>
        doc.querySelector(selector)?.getAttribute('content') || null;

    return {
        title: doc.querySelector('title')?.textContent || null,
        description: getMetaContent('meta[name="description"]'),
        canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || null,
        ogTitle: getMetaContent('meta[property="og:title"]'),
        ogDescription: getMetaContent('meta[property="og:description"]'),
        ogImage: getMetaContent('meta[property="og:image"]'),
        // meta[name="robots"] is intentionally skipped — no index/noindex data.
    };
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