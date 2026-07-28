import { WpPage } from '../lib/wp';

export type AboutContextData = {
  hero: {
    heading: string;
    description: string;
    image: string;
  };
  attempts: {
    heading: string;
    description: string;
    images: string[];
    links: {
      label: string;
      href: string;
    }[];
  };
  contentSections: {
    heading: string;
    description: string;
    images: string[];
  }[];
  company: {
    heading: string;
    description: string;
    facts: {
      label: string;
      value: string;
    }[];
  };
  expert: {
    image: string;
    name: string;
    title: string;
    description: string;
    documentation: string[];
    initiatives: string[];
  };
  certifications: {
    href: string;
    image: string;
  }[];
  documentLinks: {
    label: string;
    href: string;
  }[];
  raw: WpPage | null;
  ctaData: {
    title: string;
    highlight: string;
    description: string;
    buttonText: string;
  };
};

export type FormattedAboutData = AboutContextData;

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#8230;/g, '…')
    .replace(/&#8217;/g, '’')
    .replace(/&#8211;/g, '–')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractSections(html: string): { heading: string; html: string }[] {
  const parts = html.split(/<h2[^>]*>([\s\S]*?)<\/h2>/g);
  const sections: { heading: string; html: string }[] = [];

  sections.push({ heading: '', html: parts[0] ?? '' });

  for (let i = 1; i < parts.length; i += 2) {
    sections.push({
      heading: stripHtml(parts[i] ?? ''),
      html: parts[i + 1] ?? '',
    });
  }

  return sections;
}

function htmlToText(html: string): string {
  const withMarkdownLinks = html.replace(
    /<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi,
    (_match, href, inner) => {
      const label = stripHtml(inner);
      return label ? `[${label}](${href})` : '';
    },
  );

  return stripHtml(withMarkdownLinks);
}

function extractParagraphsFrom(html: string): string[] {
  return [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)]
    .map((m) => htmlToText(m[1]))
    .filter(Boolean);
}

function extractImagesFrom(html: string): string[] {
  const images: string[] = [];
  const regex = /<img[^>]*src="([^"]+)"[^>]*>/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    images.push(match[1]);
  }

  return images;
}

function extractLinksFrom(html: string): { label: string; href: string }[] {
  const links: { label: string; href: string }[] = [];
  const regex = /<a[^>]*href="([^"]+)"[^>]*>([^<]*)<\/a>/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    const href = match[1];
    const label = stripHtml(match[2]);

    if (label) {
      links.push({ label, href });
    }
  }

  return links;
}

function findSectionByKeywords(
  sections: { heading: string; html: string }[],
  keywords: RegExp[],
): { heading: string; html: string } | null {
  for (const section of sections) {
    for (const keyword of keywords) {
      if (keyword.test(section.heading)) {
        return section;
      }
    }
  }
  return null;
}

function extractFeaturedImage(page: any): string {
  const media = page?._embedded?.['wp:featuredmedia']?.[0];

  if (media?.source_url) return media.source_url;
  if (media?.media_details?.sizes?.full?.source_url) {
    return media.media_details.sizes.full.source_url;
  }
  if (media?.media_details?.sizes?.large?.source_url) {
    return media.media_details.sizes.large.source_url;
  }

  return '';
}

function extractHero(
  page: WpPage,
  sections: { heading: string; html: string }[],
): AboutContextData['hero'] {
  const heading = stripHtml(page.title.rendered);
  const description =
    sections.length > 0
      ? extractParagraphsFrom(sections[0].html).join('\n\n')
      : '';
  const image = extractFeaturedImage(page);

  return { heading, description, image };
}

function extractAttempts(
  sections: { heading: string; html: string }[],
): AboutContextData['attempts'] {
  const section = findSectionByKeywords(sections, [
    /testede|skraldespanden|forsøg|experiment|trial/i,
  ]);

  if (!section) {
    return { heading: '', description: '', images: [], links: [] };
  }

  const heading = section.heading;
  const description = extractParagraphsFrom(section.html).join(' ');
  const images = extractImagesFrom(section.html);
  const links = extractLinksFrom(section.html);

  return { heading, description, images, links };
}

function extractFactsFromHtml(
  fullHtml: string,
): { label: string; value: string }[] {
  const block = fullHtml.match(
    /<strong>Kort fakta<\/strong>:?([\s\S]*?)<\/p>/i,
  );
  if (!block) return [];

  const lines = block[1].split(/<br\s*\/?>/i);
  const facts: { label: string; value: string }[] = [];
  let pendingLabel: string | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const labelMatch = line.match(/^<strong>([^<]+)<\/strong>\s*([\s\S]*)$/i);

    if (labelMatch) {
      const label = stripHtml(labelMatch[1]).replace(/:$/, '').trim();
      const value = stripHtml(labelMatch[2]).trim();

      if (value) {
        facts.push({ label, value });
        pendingLabel = null;
      } else {
        pendingLabel = label;
      }
    } else if (pendingLabel) {
      const value = stripHtml(line).trim();
      if (value) {
        facts.push({ label: pendingLabel, value });
      }
      pendingLabel = null;
    }
  }

  return facts;
}

function extractCompany(
  sections: { heading: string; html: string }[],
  facts: { label: string; value: string }[],
): AboutContextData['company'] {
  const section = findSectionByKeywords(sections, [
    /i dag arbejder|virksomhed|company/i,
  ]);

  if (!section) {
    return { heading: '', description: '', facts };
  }

  const heading = section.heading;
  const paragraphs = extractParagraphsFrom(section.html);
  const description = paragraphs[0] || '';

  return { heading, description, facts };
}

function extractExpert(
  sections: { heading: string; html: string }[],
  fullHtml: string,
  facts: { label: string; value: string }[],
): AboutContextData['expert'] {
  const philosophySection = findSectionByKeywords(sections, [
    /social impact|stifter|founder|expert/i,
  ]);
  const introSection = sections.length > 0 ? sections[0] : null;

  let name = '';
  let title = '';
  let description = '';

  const signatureMatch = fullHtml.match(
    /<p[^>]*><strong>([^<]+)<\/strong>,\s*([^<]+)<\/p>/,
  );
  if (signatureMatch) {
    name = stripHtml(signatureMatch[1]);
    title = stripHtml(signatureMatch[2]);
  }

  if (philosophySection) {
    const paragraphs = extractParagraphsFrom(philosophySection.html);
    const philosophyParagraph = paragraphs.find((p) =>
      /ikke behandlende|ikke.*mirakler/i.test(p),
    );
    if (philosophyParagraph) {
      description = philosophyParagraph;
    }
  }

  if (!description && introSection) {
    const introParagraphs = extractParagraphsFrom(introSection.html);
    description =
      introParagraphs.find((p) => name && p.includes(name)) ||
      introParagraphs[0] ||
      '';
  }

  const docFact = facts.find((f) => /dokumentation/i.test(f.label));
  const initiativesFact = facts.find((f) => /indsatser/i.test(f.label));

  const documentation = docFact ? [docFact.value] : [];
  const initiatives = initiativesFact
    ? initiativesFact.value
        .split(/,| og /i)
        .map((n) => n.trim())
        .filter(Boolean)
    : [];

  return {
    image: '',
    name,
    title,
    description,
    documentation,
    initiatives,
  };
}

function extractContentSections(
  sections: { heading: string; html: string }[],
): AboutContextData['contentSections'] {
  return sections
    .slice(1)
    .filter((s) => !/presse.*dokumentation/i.test(s.heading))
    .map((s) => ({
      heading: s.heading,
      description: extractParagraphsFrom(s.html).join('\n\n'),
      images: extractImagesFrom(s.html),
    }))
    .filter((s) => s.heading || s.description || s.images.length > 0);
}

function extractCertifications(
  html: string,
): AboutContextData['certifications'] {
  const certifications: { href: string; image: string }[] = [];
  const regex =
    /<a href="([^"]+)"[^>]*class="rb-om-os-badges__item"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/g;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    certifications.push({
      href: match[1],
      image: match[2],
    });
  }

  return certifications;
}

function extractDocumentLinks(
  sections: { heading: string; html: string }[],
): AboutContextData['documentLinks'] {
  const section = findSectionByKeywords(sections, [
    /presse.*dokumentation|dokumentation|ressourcer|resources/i,
  ]);

  if (!section) {
    return [];
  }

  const links: { label: string; href: string }[] = [];
  const regex =
    /<a[^>]*href="([^"]+)"[^>]*>(?:<strong>)?([^<]+)(?:<\/strong>)?<\/a>/g;
  let match: RegExpExecArray | null;
  const seen = new Set<string>();

  while ((match = regex.exec(section.html)) !== null) {
    const href = match[1];
    const label = stripHtml(match[2]);

    if (label && !seen.has(href)) {
      seen.add(href);
      links.push({ label, href });
    }
  }

  return links;
}

export function formatAboutData(page: WpPage | null): AboutContextData {
  if (!page) {
    return {
      hero: { heading: '', description: '', image: '' },
      attempts: { heading: '', description: '', images: [], links: [] },
      contentSections: [],
      company: { heading: '', description: '', facts: [] },
      expert: {
        image: '',
        name: '',
        title: '',
        description: '',
        documentation: [],
        initiatives: [],
      },
      certifications: [],
      documentLinks: [],
      raw: null,
      ctaData: {
        title: '',
        highlight: '',
        description: '',
        buttonText: '',
      },
    };
  }

  const html = page.content.rendered;
  const sections = extractSections(html);
  const facts = extractFactsFromHtml(html);
  const expert = extractExpert(sections, html, facts);

  return {
    hero: extractHero(page, sections),
    attempts: extractAttempts(sections),
    contentSections: extractContentSections(sections),
    company: extractCompany(sections, facts),
    expert: extractExpert(sections, html, facts),
    certifications: extractCertifications(html),
    documentLinks: extractDocumentLinks(sections),
    raw: page,
    ctaData: {
      title: expert.name,
      highlight: expert.title,
      description: expert.description,
      buttonText: 'Læs mere',
    },
  };
}
