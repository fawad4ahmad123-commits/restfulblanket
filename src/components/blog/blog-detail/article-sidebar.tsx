'use client';

import ShareButtons from './share-buttons';
import TableOfContents from './table-of-contents';

export default function ArticleSidebar({ headings }: any) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-10">
      <TableOfContents headings={headings} />
      <ShareButtons />
    </aside>
  );
}
