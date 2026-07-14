'use client';

import { useMemo } from 'react';
import ArticleContent from './article-content';
import ArticleSidebar from './article-sidebar';
import { injectHeadingIds } from '@/src/utilty/extract-headings';

export default function ArticleLayout({ data }: any) {
  const { html, headings } = useMemo(
    () => injectHeadingIds(data || ''),
    [data],
  );

  const articleData = { rawHtml: html };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px] lg:gap-12">
      <div className="order-2 min-w-0 lg:order-1">
        <ArticleContent articleData={articleData} />
      </div>
      <div className="order-1 lg:order-2">
        <ArticleSidebar headings={headings} />
      </div>
    </div>
  );
}
