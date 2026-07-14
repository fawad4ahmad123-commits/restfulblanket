'use client';

import ArticleQuote from './article-quote';
import ArticleHighlight from './article-highlight';

export default function ArticleContent({ articleData }: any) {
  const paragraphClass = 'text-[15px] leading-[25px] text-[#4A4039]';
  const renderHTML = (html: string) =>
    html ? { __html: html } : { __html: '' };

  if (articleData?.rawHtml) {
    return (
      <article className="w-full max-w-[760px] overflow-x-hidden px-4 sm:px-0">
        <div
          className="article-content"
          dangerouslySetInnerHTML={renderHTML(articleData.rawHtml)}
        />
        <style jsx global>{`
          .article-content {
            width: 100%;
            overflow-wrap: break-word;
            word-break: break-word;
          }
          .article-content h1,
          .article-content h2,
          .article-content .wp-block-heading {
            font-family: serif;
            font-size: 28px;
            font-weight: 700;
            color: #35281e;
            margin-top: 2rem;
            margin-bottom: 1.25rem;
            scroll-margin-top: 6rem;
            line-height: 1.3;
          }
          .article-content h3 {
            font-family: serif;
            font-size: 22px;
            font-weight: 600;
            color: #35281e;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
            scroll-margin-top: 6rem;
            line-height: 1.3;
          }
          .article-content h4 {
            font-family: serif;
            font-size: 18px;
            font-weight: 600;
            color: #35281e;
            margin-top: 1.25rem;
            margin-bottom: 0.75rem;
            scroll-margin-top: 6rem;
          }
          .article-content p,
          .article-content .wp-block-paragraph {
            margin-bottom: 1rem;
            font-size: 15px;
            line-height: 25px;
            color: #4a4039;
          }
          .article-content a {
            color: #35281e;
            text-decoration: underline;
            font-weight: 500;
            word-break: break-word;
          }
          .article-content a:hover {
            color: #6b4f3a;
          }
          .article-content strong {
            font-weight: 600;
            color: #35281e;
          }
          .article-content figure {
            margin: 1.5rem 0;
            max-width: 100%;
          }
          .article-content img {
            max-width: 100%;
            height: auto;
            border-radius: 20px;
            display: block;
          }
          .article-content iframe,
          .article-content video,
          .article-content embed {
            max-width: 100%;
          }
          .article-content table {
            display: block;
            max-width: 100%;
            overflow-x: auto;
            border-collapse: collapse;
          }
          .article-content ul,
          .article-content ol {
            margin-top: 0.75rem;
            margin-bottom: 1rem;
            padding-left: 1.5rem;
          }
          .article-content li {
            margin-bottom: 0.5rem;
            font-size: 15px;
            line-height: 25px;
            color: #4a4039;
            list-style: disc;
          }
          .article-content .rank-math-faq-item {
            margin: 1.5rem 0;
            border: 1px solid #e5dcd6;
            border-radius: 12px;
            padding: 1.25rem;
          }
          .article-content .rank-math-question {
            font-weight: 600;
            font-size: 17px;
            color: #35281e;
            margin-bottom: 0.5rem;
          }

          /* 📱 Small devices */
          @media (max-width: 640px) {
            .article-content h1,
            .article-content h2,
            .article-content .wp-block-heading {
              font-size: 22px;
              margin-top: 1.5rem;
              margin-bottom: 1rem;
            }
            .article-content h3 {
              font-size: 18px;
              margin-top: 1.25rem;
            }
            .article-content h4 {
              font-size: 16px;
            }
            .article-content p,
            .article-content .wp-block-paragraph,
            .article-content li {
              font-size: 14px;
              line-height: 22px;
            }
            .article-content figure,
            .article-content img {
              border-radius: 12px;
            }
          }
        `}</style>
      </article>
    );
  }

  // fallback structured content...
  const author = articleData?.intro?.[0]?.startsWith('Forfatter:')
    ? articleData.intro[0]
    : null;
  const introParagraphs = author
    ? articleData.intro.slice(1)
    : articleData?.intro || [];

  return (
    <article className="w-full max-w-[760px] px-4 sm:px-0">
      {author && <p className="mb-6 text-[14px] text-[#4A4039]">{author}</p>}
      {introParagraphs.map((paragraph: string, index: number) => (
        <p
          key={index}
          className="mb-4 text-[15px] leading-[25px] text-[#4A4039]"
        >
          {paragraph}
        </p>
      ))}
      <div className="mt-6">
        {articleData?.sections?.map((section: any, index: number) => (
          <section
            key={section.id}
            id={section.id}
            className="mb-12 scroll-mt-24"
          >
            <h2 className="mb-5 mt-2 font-serif text-[20px] sm:text-[24px] text-[#35281E]">
              {section.title}
            </h2>
            {section.content?.map((paragraph: string, idx: number) => (
              <p key={idx} className={`mb-4 ${paragraphClass}`}>
                {paragraph}
              </p>
            ))}
            {index === 1 && <ArticleQuote />}
            {index === 2 && <ArticleHighlight />}
            {section.list?.length > 0 && (
              <ul className="mt-5 space-y-3 pl-5">
                {section.list.map((item: string, idx: number) => (
                  <li
                    key={`${item}-${idx}`}
                    className={`${paragraphClass} list-disc`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
