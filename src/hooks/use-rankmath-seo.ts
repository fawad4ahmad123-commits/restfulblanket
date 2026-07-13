import { useEffect, useState } from 'react';
import { fetchRankMathMeta, RankMathMeta } from '../lib/rankmath';

/**
 * Loads RankMath SEO meta for the given page URL and applies title,
 * description, and Open Graph tags to <head>. Robots/index directives are
 * never touched by this hook.
 */

export function useRankMathSeo(pageUrl: string) {
    const [meta, setMeta] = useState<RankMathMeta | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setIsLoading(true);
            try {
                const data = await fetchRankMathMeta(pageUrl);
                if (cancelled) return;
                setMeta(data);
                applyMetaToDocument(data);
            } catch (error) {
                console.error('RankMath SEO fetch failed:', error);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [pageUrl]);

    return { meta, isLoading };
}

function applyMetaToDocument(meta: RankMathMeta) {
    if (meta.title) document.title = meta.title;
    setMetaTag('name', 'description', meta.description);
    setMetaTag('property', 'og:title', meta.ogTitle);
    setMetaTag('property', 'og:description', meta.ogDescription);
    setMetaTag('property', 'og:image', meta.ogImage);
}

function setMetaTag(attr: 'name' | 'property', key: string, value: string | null) {
    if (!value) return;
    let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', value);
}