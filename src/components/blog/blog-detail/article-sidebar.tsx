import TableOfContents from './table-of-contents';
import ShareButtons from './share-buttons';
import FeaturedProductCard from './featured-product-card';

export default function ArticleSidebar({ articleData }: any) {
  return (
    <aside className="sticky top-10 space-y-4">
      <TableOfContents headings={articleData} />
      <ShareButtons />
      {/* <FeaturedProductCard /> */}
    </aside>
  );
}
