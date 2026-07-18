import {
  ABOUT_DATA,
  ATTEMPTS,
  COMPANY_INFO,
  IMPACT_PROJECTS,
  CERTIFICATIONS,
  DOCUMENT_LINKS,
  STATS,
  FOUNDER_QUOTE,
  FOUNDER_INFO,
  CTA_DATA,
} from '@/src/components/about/contants';
import { WpPage } from '../lib/wp';

export type AboutContextData = {
  aboutData: typeof ABOUT_DATA;
  attempts: typeof ATTEMPTS;
  companyInfo: typeof COMPANY_INFO;
  impactProjects: typeof IMPACT_PROJECTS;
  certifications: typeof CERTIFICATIONS;
  documentLinks: typeof DOCUMENT_LINKS;
  stats: typeof STATS;
  founderQuote: typeof FOUNDER_QUOTE;
  founderInfo: typeof FOUNDER_INFO;
  ctaData: typeof CTA_DATA;
  raw: WpPage | null;
};

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractParagraphs(html: string) {
  return [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)]
    .map((m) => stripHtml(m[1]))
    .filter(Boolean);
}

function extractHeadings(html: string) {
  return [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)]
    .map((m) => stripHtml(m[1]))
    .filter(Boolean);
}

function extractCertifications(html: string): typeof CERTIFICATIONS {
  const found: typeof CERTIFICATIONS = [];

  const regex =
    /<a href="([^"]+)"[^>]*class="rb-om-os-badges__item"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/g;

  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    found.push({
      href: match[1],
      image: match[2],
    });
  }

  return found.length ? found : CERTIFICATIONS;
}

function extractFacts(html: string): typeof STATS {
  const factsBlock = html.match(/<strong>Kort fakta<\/strong>:[\s\S]*?<\/p>/i);

  if (!factsBlock) {
    return STATS;
  }

  const stats: typeof STATS = [];

  const regex = /<strong>([^<]+)<\/strong>\s*([^<]*)/g;

  let match: RegExpExecArray | null;

  while ((match = regex.exec(factsBlock[0])) !== null) {
    const label = stripHtml(match[1]).replace(':', '').trim();
    const value = stripHtml(match[2]);

    if (label && value) {
      stats.push({
        label,
        value,
      });
    }
  }

  return stats.length ? stats : STATS;
}

export function formatAboutData(page: WpPage | null): AboutContextData {
  if (!page) {
    return {
      aboutData: ABOUT_DATA,
      attempts: ATTEMPTS,
      companyInfo: COMPANY_INFO,
      impactProjects: IMPACT_PROJECTS,
      certifications: CERTIFICATIONS,
      documentLinks: DOCUMENT_LINKS,
      stats: STATS,
      founderQuote: FOUNDER_QUOTE,
      founderInfo: FOUNDER_INFO,
      ctaData: CTA_DATA,
      raw: null,
    };
  }

  const html = page.content.rendered;

  const paragraphs = extractParagraphs(html);
  const headings = extractHeadings(html);
  const stats = extractFacts(html);

  return {
    aboutData: {
      ...ABOUT_DATA,
      title: {
        first: page.title.rendered,
        highlighted: '',
        second: '',
      },
      description: paragraphs[0] ?? ABOUT_DATA.description,
    },

    attempts: ATTEMPTS,

    companyInfo: {
      ...COMPANY_INFO,
      description: paragraphs[6] ?? COMPANY_INFO.description,
      stats,
    },

    impactProjects: IMPACT_PROJECTS,

    certifications: extractCertifications(html),

    documentLinks: DOCUMENT_LINKS,

    stats,

    founderQuote: {
      ...FOUNDER_QUOTE,
      quote: paragraphs[paragraphs.length - 3] ?? FOUNDER_QUOTE.quote,
    },

    founderInfo: FOUNDER_INFO,

    ctaData: CTA_DATA,

    raw: page,
  };
}
