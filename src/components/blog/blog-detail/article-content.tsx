'use client';

import ArticleQuote from './article-quote';
import ArticleHighlight from './article-highlight';
import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Minus, Plus } from 'lucide-react';

const BlogFaqAccordion = ({
  question,
  answerHTML,
}: {
  question: string;
  answerHTML: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white transition-shadow duration-200 hover:shadow-sm my-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between px-5 py-4 text-left md:px-6 md:py-5 cursor-pointer bg-transparent border-none"
      >
        <span className="pr-4 text-[17px] font-semibold leading-snug tracking-wide text-[#35281e]">
          {question}
        </span>
        <span className="flex-shrink-0 text-stone-500 transition-colors duration-150 group-hover:text-stone-800">
          {isOpen ? (
            <Minus className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-5 md:px-6 md:pb-6">
          <div className="mb-4 h-px bg-stone-100" />
          <div
            className="text-[15px] leading-[25px] text-[#4a4039] prose"
            dangerouslySetInnerHTML={{ __html: answerHTML }}
          />
        </div>
      </div>
    </div>
  );
};

export default function ArticleContent({ articleData }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphClass = 'text-[15px] leading-[25px] text-[#4A4039]';
  const renderHTML = (html: string) =>
    html ? { __html: html } : { __html: '' };

  useEffect(() => {
    if (!containerRef.current) return;

    const faqItems = containerRef.current.querySelectorAll(
      '.rank-math-faq-item',
    );

    faqItems.forEach((item) => {
      if (item.hasAttribute('data-faq-rendered')) return;
      item.setAttribute('data-faq-rendered', 'true');

      const questionEl = item.querySelector('.rank-math-question');
      const answerEl = item.querySelector('.rank-math-answer');

      if (questionEl && answerEl) {
        const questionText = questionEl.textContent || '';
        const answerHTML = answerEl.innerHTML || '';

        const mountNode = document.createElement('div');
        item.parentNode?.replaceChild(mountNode, item);

        const root = createRoot(mountNode);
        root.render(
          <BlogFaqAccordion question={questionText} answerHTML={answerHTML} />,
        );
      }
    });
  }, [articleData?.rawHtml]);

  if (articleData?.rawHtml) {
    return (
      <article className="w-full max-w-[760px] overflow-x-hidden px-4 sm:px-0">
        <div
          ref={containerRef}
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
