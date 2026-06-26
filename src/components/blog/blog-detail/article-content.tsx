import ArticleQuote from './article-quote';
import ArticleHighlight from './article-highlight';
import { ARTICLE_DATA } from '../constants';

export default function ArticleContent() {
  const paragraphClass = 'text-[15px] leading-[25px] text-[#4A4039]';

  return (
    <article className="max-w-[760px]">
      {ARTICLE_DATA.intro.map((paragraph, index) => (
        <p
          key={index}
          className={`mb-2 ${paragraphClass} ${
            index === 0
              ? 'first-letter:float-left first-letter:mr-2 first-letter:text-[60px] first-letter:font-serif first-letter:leading-none first-letter:text-[#35281E]'
              : ''
          }`}
        >
          {paragraph}
        </p>
      ))}
      <div className="mt-4">
        {ARTICLE_DATA.sections.map((section, index) => (
          <section
            id={section.id}
            key={section.id}
            className="mb-12 scroll-mt-24"
          >
            <h2 className="mb-5 font-serif text-[24px] text-[#35281E] mt-2">
              {section.title}
            </h2>

            {section.content.map((paragraph, idx) => (
              <p key={idx} className={`mb-4 ${paragraphClass}`}>
                {paragraph}
              </p>
            ))}

            {index === 1 && <ArticleQuote />}
            {index === 2 && <ArticleHighlight />}

            {section.list && (
              <ul className="mt-5 space-y-3 pl-5">
                {section.list.map((item) => (
                  <li key={item} className={`${paragraphClass} list-disc`}>
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
