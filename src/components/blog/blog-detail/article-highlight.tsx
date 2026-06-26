import { Lightbulb } from 'lucide-react';
import { ARTICLE_DATA } from '../constants';

export default function ArticleHighlight() {
  return (
    <div className="my-10 rounded-2xl border border-[#E5DDD7] bg-[#F5EFEA] p-5">
      <div className="flex gap-3">
        <Lightbulb className="mt-1 h-5 w-5" />

        <div>
          <h4 className="font-medium">{ARTICLE_DATA.highlight.title}</h4>

          <p className="mt-2 text-sm text-[#736760]">
            {ARTICLE_DATA.highlight.content}
          </p>
        </div>
      </div>
    </div>
  );
}
