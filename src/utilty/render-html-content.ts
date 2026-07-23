import DOMPurify from 'dompurify';

export const renderHTMLContent = (html: string) => {
  if (!html) return '';

  // Sanitize the HTML to prevent XSS attacks
  const sanitizedHTML = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p',
      'a',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'blockquote',
      'strong',
      'em',
      'b',
      'i',
      'u',
      's',
      'br',
      'img',
      'figure',
      'figcaption',
      'div',
      'span',
      'section',
      'article',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'class', 'style'],
  });

  return sanitizedHTML;
};
