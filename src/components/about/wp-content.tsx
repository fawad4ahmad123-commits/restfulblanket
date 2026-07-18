'use client';

import { useWpPage } from '@/src/core/context/wp-page-context';
import sanitizeHtml from 'sanitize-html';
import styles from './wp-content.module.css';

export function WpContent({ className }: { className?: string }) {
  const page = useWpPage();
  if (!page) return null;

  const clean = sanitizeHtml(page.contentHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img',
      'figure',
      'figcaption',
      'hr',
      'h1',
      'h2',
      'h3',
      'h4',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['class', 'style', 'id'],
      img: [
        'src',
        'alt',
        'width',
        'height',
        'loading',
        'decoding',
        'srcset',
        'sizes',
      ],
      a: ['href', 'target', 'rel', 'data-type', 'data-id', 'aria-label'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowVulnerableTags: true,
  });

  return (
    <div
      className={`${styles.content} ${className ?? ''}`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
