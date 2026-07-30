'use client';

import { useMemo } from 'react';

interface WPContentProps {
  html: string;
  className?: string;
}

export default function WPContent({ html, className = '' }: WPContentProps) {
  const cleanedHtml = useMemo(() => sanitizeWpHtml(html), [html]);

  return (
    <div className={`wp-content ${className}`}>
      <div dangerouslySetInnerHTML={{ __html: cleanedHtml }} />
      <style jsx global>{`
        /* ---------- Video / embed blocks ---------- */
        .wp-content figure.wp-block-embed {
          margin: 0 0 1.5rem 0;
        }

        .wp-content .wp-block-embed__wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 16 / 9;
          /* WordPress' old "padding-top: 56.25%" hack is stripped in
             sanitizeWpHtml() below; aspect-ratio replaces it. Forcing
             padding-top to 0 here is a safety net in case any inline
             padding slips through. */
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

        /* ---------- Tables ---------- */
        .wp-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .wp-content table th {
          background-color: #392a22 !important;
          color: #e6cfbb !important;
          font-weight: 600;
          text-align: left;
          padding: 0.75rem 1rem;
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
      `}</style>
    </div>
  );
}

function sanitizeWpHtml(html: string): string {
  if (!html) return html;

  let out = html;

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

  return out;
}
