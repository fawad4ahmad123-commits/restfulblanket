import { formatArticleData } from '@/src/utilty/blog-detail-artical-formater';
import ArticleContent from './article-content';
import ArticleSidebar from './article-sidebar';

export default function ArticleLayout({ data }: any) {
  const articleData = formatArticleData(data);
  console.log('t7 prev', { test: data, articleData });

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
      <ArticleContent articleData={articleData} />
      <ArticleSidebar />
    </div>
  );
}
