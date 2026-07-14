// src/utilty/extract-headings.ts

export interface HeadingItem {
  id: string;
  title: string;
  level: number;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9æøåäöü\s-]/gi, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * Injects a matching `id` attribute into every h2/h3/h4 inside the HTML
 * AND returns the list of headings for the TOC — so both always match.
 */
export const injectHeadingIds = (
  html: string,
): { html: string; headings: HeadingItem[] } => {
  if (!html) return { html: '', headings: [] };

  const headings: HeadingItem[] = [];
  const seen: Record<string, number> = {};
  let autoIndex = 0;

  const processedHtml = html.replace(
    /<(h[2-4])([^>]*)>([\s\S]*?)<\/\1>/gi,
    (match, tag: string, attrs: string, innerHtml: string) => {
      const plainText = innerHtml.replace(/<[^>]*>/g, '').trim();
      if (!plainText) return match;

      let id = slugify(plainText) || `heading-${autoIndex++}`;

      // avoid duplicate ids (e.g. two headings with same text)
      if (seen[id] !== undefined) {
        seen[id] += 1;
        id = `${id}-${seen[id]}`;
      } else {
        seen[id] = 0;
      }

      headings.push({
        id,
        title: plainText,
        level: parseInt(tag.replace('h', ''), 10),
      });

      // if heading already has an id attr, replace it; else add one
      const cleanedAttrs = attrs.replace(/\sid="[^"]*"/gi, '');
      return `<${tag}${cleanedAttrs} id="${id}">${innerHtml}</${tag}>`;
    },
  );

  return { html: processedHtml, headings };
};
