// formatArticleData.ts
//
// Fixes vs. the original:
// 1. The old code short-circuited on any HTML content and returned
//    empty intro/sections -> images, lists, and FAQ never rendered.
// 2. It never looked at `hero` (author / authorImage / category),
//    so "expert details" were always missing.
// 3. It never decoded HTML entities (&#8220; etc.) -> DOMParser's
//    `.textContent` does this for you automatically.
//
// NOTE: This uses `DOMParser`, which only exists in the browser.
// If this runs server-side (Next.js getServerSideProps / API route,
// SSR render, etc.), swap DOMParser for `node-html-parser` or
// `cheerio` — the parsing logic below stays basically the same,
// just the element-selection API differs slightly.

export interface ArticleImage {
  src: string;
  alt: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  content: string[];
  list: string[];
  images: ArticleImage[];
  /** Only present on the FAQ section, as {question, answer} pairs */
  faq?: { question: string; answer: string }[];
}

export interface ArticleExpert {
  name?: string;
  image?: string;
  category?: string;
  description?: string;
}

export interface ArticleData {
  intro: string[];
  sections: ArticleSection[];
  expert?: ArticleExpert;
  /** kept for fallback / debugging, e.g. dangerouslySetInnerHTML escape hatch */
  rawHtml?: string;
}

interface HeroLike {
  author?: string;
  authorImage?: string;
  category?: string;
  description?: string;
  title?: string;
}

export const formatArticleData = (
  content: string,
  hero?: HeroLike,
): ArticleData => {
  const expert: ArticleExpert | undefined = hero
    ? {
        name: hero.author,
        image: hero.authorImage,
        category: hero.category,
        description: hero.description,
      }
    : undefined;

  if (!content) {
    return { intro: [], sections: [], expert };
  }

  // ---- Plain markdown fallback (no HTML tags present) ----
  if (!content.includes('<')) {
    const lines = content.split('\n').filter((line) => line.trim());
    const sections: ArticleSection[] = [];
    let currentSection: ArticleSection | null = null;
    const intro: string[] = [];

    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        if (currentSection) sections.push(currentSection);
        currentSection = {
          id: `section-${sections.length + 1}`,
          title: line.replace('## ', '').trim(),
          content: [],
          list: [],
          images: [],
        };
      } else if (currentSection && line.startsWith('•')) {
        currentSection.list.push(line.replace('•', '').trim());
      } else if (currentSection) {
        currentSection.content.push(line.trim());
      } else {
        intro.push(line.trim());
      }
    });

    if (currentSection) sections.push(currentSection);
    return { intro, sections, expert };
  }

  // ---- Real HTML parsing (your actual case) ----
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    // Server-side fallback: don't lose the data, just return raw HTML
    // so the caller can render it directly (dangerouslySetInnerHTML)
    // until you swap in a server-safe HTML parser (cheerio / node-html-parser).
    return { intro: [], sections: [], expert, rawHtml: content };
  }

  const doc = new DOMParser().parseFromString(content, 'text/html');
  const nodes = Array.from(doc.body.children);

  const sections: ArticleSection[] = [];
  let currentSection: ArticleSection | null = null;
  const intro: string[] = [];

  const pushCurrent = () => {
    if (currentSection) sections.push(currentSection);
  };

  nodes.forEach((node) => {
    const tag = node.tagName.toLowerCase();

    if (tag === 'h2') {
      pushCurrent();
      currentSection = {
        id: `section-${sections.length + 1}`,
        title: node.textContent?.trim() || '',
        content: [],
        list: [],
        images: [],
      };
      return;
    }

    if (tag === 'h3') {
      const text = node.textContent?.trim();
      if (!text) return;
      // sub-heading inside a section (e.g. "Minut 0 til 2")
      const target = currentSection?.content ?? intro;
      target.push(`### ${text}`);
      return;
    }

    if (tag === 'figure') {
      const img = node.querySelector('img');
      if (!img) return;
      const image: ArticleImage = {
        src: img.getAttribute('src') || '',
        alt: img.getAttribute('alt') || '',
      };
      if (currentSection) {
        currentSection.images.push(image);
      } else {
        // image appeared before any h2 — stash it as its own intro section
        sections.unshift({
          id: 'section-intro-image',
          title: '',
          content: [],
          list: [],
          images: [image],
        });
      }
      return;
    }

    if (tag === 'p') {
      const text = node.textContent?.trim();
      if (!text) return;

      const target = currentSection ?? { list: intro, content: intro };

      if (text.startsWith('•')) {
        (currentSection ? currentSection.list : intro).push(
          text.replace('•', '').trim(),
        );
      } else {
        (currentSection ? currentSection.content : intro).push(text);
      }
      return;
    }

    if (
      tag === 'div' &&
      node.classList.contains('wp-block-rank-math-faq-block')
    ) {
      pushCurrent();
      const faqItems = Array.from(node.querySelectorAll('.rank-math-faq-item'));
      const faq = faqItems
        .map((item) => {
          const question = item
            .querySelector('.rank-math-question')
            ?.textContent?.trim();
          const answer = item
            .querySelector('.rank-math-answer')
            ?.textContent?.trim();
          return question && answer ? { question, answer } : null;
        })
        .filter((x): x is { question: string; answer: string } => !!x);

      currentSection = {
        id: `section-${sections.length + 1}`,
        title: 'Ofte stillede spørgsmål',
        content: [],
        list: [],
        images: [],
        faq,
      };
    }
    // any other tags (e.g. the trailing social-share div) are ignored
  });

  pushCurrent();

  return { intro, sections, expert, rawHtml: content };
};
