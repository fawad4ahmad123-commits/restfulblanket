import ArticleQuote from './article-quote';
import ArticleHighlight from './article-highlight';

export default function ArticleContent({ articleData }: any) {
  const paragraphClass = 'text-[15px] leading-[25px] text-[#4A4039]';

  const author = articleData?.intro?.[0]?.startsWith('Forfatter:')
    ? articleData.intro[0]
    : null;

  const introParagraphs = author
    ? articleData.intro.slice(1)
    : articleData.intro || [];
  console.log('t7 next', { articleData });
  return (
    <article className="max-w-[760px]">
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
        {articleData.sections.map((section: any, index: number) => (
          <section
            key={section.id}
            id={section.id}
            className="mb-12 scroll-mt-24"
          >
            <h2 className="mb-5 mt-2 font-serif text-[24px] text-[#35281E]">
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
