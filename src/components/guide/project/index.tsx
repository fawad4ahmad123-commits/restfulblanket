// src/components/guide/project/KrisecenterContent.tsx
'use client';

import { extractEmbeddedDocument } from '@/src/utilty/extractEmbeddedDocument';
import { useEffect, useRef, useState } from 'react';

interface KrisecenterContentProps {
  html: string;
}

const KRISECENTER_STYLES = `
.krisecenter-content {
  font-family: inherit;
  color: #392A22;
  line-height: 1.7;
}

.krisecenter-content .wp-block-kadence-column {
  min-width: 0;
}

.krisecenter-content > div > .wp-block-kadence-column,
.krisecenter-content .kt-inside-inner-col > .wp-block-kadence-column {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: flex-start;
}

.krisecenter-content .wp-block-kadence-column > .kt-inside-inner-col {
  flex: 1 1 300px;
  min-width: 0;
}

.krisecenter-content h2[style*="background-color"] {
  padding: 14px 28px !important;
  display: inline-block;
  font-size: 22px;
  margin: 24px 0 16px;
}

.krisecenter-content h2:not([style*="background-color"]) {
  font-size: 26px;
  margin: 32px 0 12px;
  font-weight: 700;
}

.krisecenter-content p {
  margin-bottom: 16px;
}

.krisecenter-content ul {
  margin: 12px 0 16px 20px;
  list-style: disc;
}

.krisecenter-content ul li {
  margin-bottom: 6px;
}

.krisecenter-content img {
  max-width: 100%;
  height: auto;
  display: block;
}

.krisecenter-content figure {
  margin: 0;
}

.krisecenter-content hr,
.krisecenter-content .kt-divider {
  border: none;
  border-top: 1px solid #e0d9cf;
  margin: 24px 0;
}

@media (max-width: 767px) {
  .krisecenter-content .wp-block-kadence-column > .kt-inside-inner-col {
    flex: 1 1 100%;
  }
}
`;

export function KrisecenterContent({ html }: KrisecenterContentProps) {
  const { before, embeddedDoc, after } = extractEmbeddedDocument(html);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(400);

  useEffect(() => {
    if (!embeddedDoc) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    const resize = () => {
      const doc = iframe.contentDocument;
      if (doc?.body) {
        setIframeHeight(doc.body.scrollHeight + 20);
      }
    };

    iframe.addEventListener('load', resize);
    return () => iframe.removeEventListener('load', resize);
  }, [embeddedDoc]);

  return (
    <div className="krisecenter-content">
      <style dangerouslySetInnerHTML={{ __html: KRISECENTER_STYLES }} />

      <div dangerouslySetInnerHTML={{ __html: before }} />

      {embeddedDoc && (
        <iframe
          ref={iframeRef}
          srcDoc={embeddedDoc}
          style={{
            width: '100%',
            border: 'none',
            height: iframeHeight,
            display: 'block',
          }}
          title="Projektoverblik"
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: after }} />
    </div>
  );
}
