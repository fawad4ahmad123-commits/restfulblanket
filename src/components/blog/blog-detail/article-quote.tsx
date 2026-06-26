import { ARTICLE_DATA } from '../constants';

export default function ArticleQuote() {
  return (
    <blockquote className="my-10 border-l border-[#D7CEC7] pl-6">
      <p className="font-serif text-xl italic text-[#35281E]">
        "{ARTICLE_DATA.quote.text}"
      </p>

      <p className="mt-4 text-sm text-[#8A8078]">
        — {ARTICLE_DATA.quote.author}
      </p>
    </blockquote>
  );
}
