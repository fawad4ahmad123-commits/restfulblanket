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
      const cleanedAttrs = attrs.replace(/\sid="[^"]*"/gi, '');
      return `<${tag}${cleanedAttrs} id="${id}">${innerHtml}</${tag}>`;
    },
  );

  return { html: processedHtml, headings };
};
