'use client';

import { useMemo } from 'react';

interface WPContentProps {
  html: string;
  className?: string;
  pageTitle?: string;
}

export default function WPContent({
  html,
  className = '',
  pageTitle,
}: WPContentProps) {
  const cleanedHtml = useMemo(
    () => sanitizeWpHtml(html, pageTitle),
    [html, pageTitle],
  );

  return (
    <div className={`wp-content ${className}`}>
      <div dangerouslySetInnerHTML={{ __html: cleanedHtml }} />
      <style jsx global>{`
        .wp-content {
          background-color: #fdf9f6;
          color: #392a22;
          font-size: 1rem;
          line-height: 1.7;
        }

        .wp-content h1,
        .wp-content h2,
        .wp-content h3,
        .wp-content h4 {
          color: #392a22;
          font-weight: 700;
          line-height: 1.3;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }

        .wp-content h1 {
          font-size: 1.875rem;
        }
        .wp-content h2 {
          font-size: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e6cfba;
        }
        .wp-content h3 {
          font-size: 1.25rem;
        }
        .wp-content h4 {
          font-size: 1.1rem;
        }

        .wp-content p {
          margin: 0 0 1rem 0;
        }

        .wp-content a {
          color: #8a5a3b;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .wp-content a:hover {
          color: #392a22;
        }

        .wp-content strong {
          color: #392a22;
          font-weight: 700;
        }

        .wp-content ul,
        .wp-content ol {
          margin: 0 0 1.25rem 0;
          padding-left: 1.5rem;
        }

        .wp-content li {
          margin-bottom: 0.5rem;
        }

        .wp-content li::marker {
          color: #a9714c;
        }

        .wp-content hr {
          border: none;
          border-top: 1px solid rgba(57, 42, 34, 0.15);
          margin: 2rem 0;
        }

        .wp-content figure.wp-block-embed {
          display: flex;
          flex-direction: column;
          margin: 1.5rem 0;
        }

        .wp-content figure.wp-block-embed .wp-block-embed__wrapper {
          order: 1;
        }
        .wp-content figure.wp-block-embed figcaption {
          order: 2;
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: #6b5647;
          text-align: center;
        }

        .wp-content .wp-block-embed__wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 16 / 9;
          padding-top: 0 !important;
          border-radius: 0.5rem;
          background: #000;
        }

        .wp-content .wp-block-embed__wrapper iframe,
        .wp-content .wp-block-embed__wrapper video {
          position: absolute;
          inset: 0;
          width: 100% !important;
          height: 100% !important;
          border: 0;
          display: block;
        }

        .wp-content .wp-table-scroll {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin: 1.5rem 0;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(57, 42, 34, 0.08);
        }

        .wp-content table {
          width: 100%;
          min-width: 480px;
          border-collapse: collapse;
          margin: 0;
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .wp-content table th {
          background-color: #392a22 !important;
          color: #e6cfbb !important;
          font-weight: 600;
          text-align: left;
          padding: 0.75rem 1rem;
          white-space: nowrap;
        }

        .wp-content table td {
          background-color: #fdf9f6 !important;
          color: #392a22 !important;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(57, 42, 34, 0.12);
        }

        .wp-content table tr:last-child td {
          border-bottom: none;
        }

        @media (max-width: 640px) {
          .wp-content table th,
          .wp-content table td {
            padding: 0.6rem 0.75rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}

function sanitizeWpHtml(html: string, pageTitle?: string): string {
  if (!html) return html;

  let out = stripLeadingDuplicateHeading(html.trim(), pageTitle);

  out = out.replace(
    /(<div[^>]*class="[^"]*wp-block-embed__wrapper[^"]*"[^>]*style="[^"]*?)padding-top:\s*[\d.]+%;?/gi,
    '$1',
  );

  out = out.replace(
    /(<(?:table|thead|tbody|tr|th|td)[^>]*style=")([^"]*)(")/gi,
    (_match, prefix, styleBody, suffix) => {
      const cleaned = styleBody
        .replace(/background-color\s*:\s*[^;]+;?/gi, '')
        .replace(/(?<!background-)color\s*:\s*[^;]+;?/gi, '')
        .trim();
      return `${prefix}${cleaned}${suffix}`;
    },
  );

  out = wrapTablesForScroll(out);

  return out;
}

function wrapTablesForScroll(html: string): string {
  return html.replace(
    /<table([^>]*)>([\s\S]*?)<\/table>/gi,
    (match) => `<div class="wp-table-scroll">${match}</div>`,
  );
}

function stripLeadingDuplicateHeading(
  html: string,
  pageTitle?: string,
): string {
  if (!pageTitle) return html;

  const normalize = (s: string) =>
    s
      .replace(/<[^>]+>/g, '')
      .replace(/&[a-z0-9#]+;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();

  const target = normalize(pageTitle);
  if (!target) return html;

  return html.replace(
    /^(\s*)<(h[1-3])(?:\s[^>]*)?>([\s\S]*?)<\/\2>/i,
    (match, _lead, _tag, inner) => {
      const innerText = normalize(inner);
      if (innerText === target || innerText.startsWith(target)) {
        return '';
      }
      return match;
    },
  );
}
