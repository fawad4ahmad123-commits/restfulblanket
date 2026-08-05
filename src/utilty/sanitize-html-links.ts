/**
 * Cleans HTML content coming from the old WordPress-based API so links work
 * correctly on the new deployed domain.
 *
 * - Any <a href="https://restfulblanket.dk/..."> gets rewritten to a relative
 *   path (e.g. "/produktfinder-quiz/") so it opens on the CURRENT deployment
 *   domain instead of the old site.
 * - Any link pointing to tapbookme.com/wp-json (internal API url, should
 *   never appear in rendered content) is stripped out — the <a> tag is
 *   unwrapped and only its inner text is kept.
 */

const OLD_CONTENT_DOMAINS = ['restfulblanket.dk'];
const API_DOMAINS_TO_STRIP = ['tapbookme.com/wp-json', 'tapbookme.com'];

export const sanitizeHtmlLinks = (html: string): string => {
  if (!html) return html;

  let cleaned = html;
  cleaned = cleaned.replace(
    /<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi,
    (match, href, innerText) => {
      const isApiLink = API_DOMAINS_TO_STRIP.some((domain) =>
        href.includes(domain),
      );

      if (isApiLink) {
        return innerText;
      }

      return match;
    },
  );

  OLD_CONTENT_DOMAINS.forEach((domain) => {
    const regex = new RegExp(
      `href=["']https?:\\/\\/(?:www\\.)?${domain.replace('.', '\\.')}(\\/[^"']*)?["']`,
      'gi',
    );

    cleaned = cleaned.replace(regex, (_match, path) => {
      const relativePath = path && path.length > 0 ? path : '/';
      return `href="${relativePath}"`;
    });
  });

  return cleaned;
};
