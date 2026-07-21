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

// group >2 consecutive image figures into a gallery grid
const wrapConsecutiveImageFigures = (container: HTMLElement) => {
  const isPlainImageFigure = (el: Element) =>
    el.tagName === 'FIGURE' &&
    el.classList.contains('wp-block-image') &&
    !el.closest('.wp-block-gallery') &&
    !el.hasAttribute('data-gallery-wrapped');

  const children = Array.from(container.children);
  let i = 0;
  while (i < children.length) {
    if (isPlainImageFigure(children[i])) {
      const run: Element[] = [];
      let j = i;
      while (j < children.length && isPlainImageFigure(children[j])) {
        run.push(children[j]);
        j++;
      }
      if (run.length > 2) {
        const grid = document.createElement('div');
        grid.className = 'image-gallery-grid';
        const firstEl = run[0];
        firstEl.parentNode?.insertBefore(grid, firstEl);
        run.forEach((figure) => {
          figure.setAttribute('data-gallery-wrapped', 'true');
          grid.appendChild(figure);
        });
      } else {
        run.forEach((figure) =>
          figure.setAttribute('data-gallery-wrapped', 'true'),
        );
      }
      i = j;
    } else {
      i++;
    }
  }
};

// wrap every table in a collapsible <details>, styled consistently
const wrapTablesCollapsible = (container: HTMLElement) => {
  const tables = container.querySelectorAll(
    'table:not([data-collapsible-wrapped])',
  );
  tables.forEach((table) => {
    table.setAttribute('data-collapsible-wrapped', 'true');
    const target = table.closest('figure.wp-block-table') || table;

    const details = document.createElement('details');
    details.className = 'collapsible-table';
    const summary = document.createElement('summary');
    summary.textContent = 'Vis tabel';
    details.appendChild(summary);

    const scrollWrap = document.createElement('div');
    scrollWrap.className = 'collapsible-table-scroll';

    target.parentNode?.insertBefore(details, target);
    scrollWrap.appendChild(target);
    details.appendChild(scrollWrap);
  });
};

// NEW: only rewrite <a href> links, never touch img src — fixes broken images
const swapLinkDomains = (container: HTMLElement) => {
  const anchors = container.querySelectorAll(
    'a[href^="https://tapbookme.com/"]',
  );
  anchors.forEach((a) => {
    const href = a.getAttribute('href') || '';
    a.setAttribute(
      'href',
      href.replace(
        'https://tapbookme.com/',
        'https://restfulblanket.vercel.app/',
      ),
    );
  });
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

    wrapConsecutiveImageFigures(containerRef.current);
    wrapTablesCollapsible(containerRef.current);
    swapLinkDomains(containerRef.current);
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
          /* Author bio block */
          .article-content .wp-block-columns {
            display: flex !important;
            align-items: flex-start;
            gap: 24px;
            margin: 32px 0;
            max-width: 100%;
          }

          .article-content .wp-block-columns .wp-block-column:first-child {
            flex: 0 0 280px !important;
            width: 280px !important;
            max-width: 280px !important;
            height: 280px !important;
            border-radius: 16px;
            overflow: hidden;
            margin-top: -2rem;
          }

          .article-content .wp-block-columns .wp-block-column:first-child img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            border-radius: 16px;
            margin: 0;
          }

          .article-content .wp-block-columns .wp-block-column:last-child {
            flex: 1 1 0%;
            min-width: 0;
          }

          .article-content .wp-block-columns .wp-block-column:last-child h3 {
            margin: 0 0 12px 0 !important;
            font-size: 20px !important;
            font-weight: 700 !important;
            line-height: 1.35 !important;
            color: #35281e;
          }

          .article-content .wp-block-columns .wp-block-column:last-child p {
            margin: 0 !important;
            font-size: 15px;
            line-height: 25px;
            overflow-wrap: break-word;
            word-break: break-word;
          }

          .article-content
            .wp-block-columns
            .wp-block-column:last-child
            br:first-child {
            display: none;
          }
          /* 📱 Small devices */
          @media (max-width: 640px) {
            .article-content .wp-block-columns {
              flex-direction: column;
              gap: 16px;
            }
            .article-content .wp-block-columns .wp-block-column:first-child {
              flex: 0 0 auto !important;
              width: 100% !important;
              max-width: 100% !important;
              height: 300px !important;
            }
            .article-content .wp-block-columns .wp-block-column:last-child h3 {
              font-size: 17px !important;
            }
          }

          /* image gallery grid (>2 consecutive images) */
          .article-content .image-gallery-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin: 1.5rem 0;
          }
          .article-content .image-gallery-grid figure {
            margin: 0;
          }
          .article-content .image-gallery-grid img {
            width: 100%;
            height: 220px;
            object-fit: cover;
          }
          @media (min-width: 640px) {
            .article-content .image-gallery-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          .article-content .wp-block-gallery {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          @media (min-width: 640px) {
            .article-content .wp-block-gallery {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          .article-content .wp-block-gallery figure {
            margin: 0;
          }

          /* collapsible tables — clean, responsive, dark header */
          .article-content details.collapsible-table {
            margin: 1.5rem 0;
            border: 1px solid #e7e0d8;
            border-radius: 16px;
            padding: 1rem 1.25rem 1.25rem;
            background: #fff;
          }
          .article-content details.collapsible-table summary {
            cursor: pointer;
            font-weight: 600;
            color: #35281e;
            font-size: 15px;
            list-style: none;
          }
          .article-content
            details.collapsible-table
            summary::-webkit-details-marker {
            display: none;
          }
          .article-content details.collapsible-table summary::before {
            content: '+ ';
          }
          .article-content details.collapsible-table[open] summary::before {
            content: '– ';
          }
          .article-content .collapsible-table-scroll {
            margin-top: 1rem;
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
          .article-content .collapsible-table-scroll figure.wp-block-table {
            margin: 0;
          }
          .article-content table {
            width: 100%;
            min-width: 420px;
            border-collapse: collapse;
            border-radius: 12px;
            overflow: hidden;
          }
          .article-content table thead th {
            background: #392a22;
            color: #fdf9f6;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            padding: 14px 16px;
            white-space: nowrap;
          }
          .article-content table tbody td {
            text-align: center;
            font-size: 14px;
            color: #4a4039;
            padding: 14px 16px;
            border-bottom: 1px solid #efe8e0;
            border-right: 1px solid #efe8e0;
          }
          .article-content table tbody td:last-child {
            border-right: none;
          }
          .article-content table tbody tr:last-child td {
            border-bottom: none;
          }

          /* button-style links (wp-block-button) */
          .article-content .wp-block-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin: 1.5rem 0;
          }
          .article-content .wp-block-button__link {
            display: inline-block;
            background-color: #392a22;
            color: #fdf9f6 !important;
            text-decoration: none !important;
            font-weight: 600;
            font-size: 15px;
            padding: 12px 24px;
            border-radius: 999px;
            transition: opacity 0.15s ease;
          }
          .article-content .wp-block-button__link:hover {
            opacity: 0.9;
            color: #fdf9f6 !important;
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
