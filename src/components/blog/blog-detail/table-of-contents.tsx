import { ARTICLE_DATA } from '../constants';

export default function TableOfContents() {
  return (
    <div className="rounded-2xl border border-[#E5DDD7] bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-[#35281E]">
        On This Page
      </h3>

      <div className="space-y-3">
        {ARTICLE_DATA.toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="block text-xs text-[#6F6259] transition hover:text-[#35281E]"
          >
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
}
