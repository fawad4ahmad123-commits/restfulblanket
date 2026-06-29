export const formatArticleData = (html: string) => {
  if (typeof window === 'undefined') {
    return {
      toc: [],
      intro: [],
      sections: [],
    };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const toc: any[] = [];
  const intro: string[] = [];
  const sections: any[] = [];

  const nodes = Array.from(doc.body.children);

  let currentSection: any = null;
  let foundFirstHeading = false;

  nodes.forEach((node) => {
    const tag = node.tagName.toLowerCase();

    if (tag === 'h2') {
      foundFirstHeading = true;

      const title = node.textContent?.trim() || '';

      const id = title
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');

      toc.push({
        id,
        title,
      });

      currentSection = {
        id,
        title,
        content: [],
        list: [],
      };

      sections.push(currentSection);
      return;
    }

    if (!foundFirstHeading && tag === 'p') {
      const text = node.textContent?.trim();

      if (text) {
        intro.push(text);
      }

      return;
    }

    if (!currentSection) return;

    if (tag === 'p') {
      const text = node.textContent?.trim();

      if (!text) return;

      if (text.startsWith('•')) {
        currentSection.list.push(text.replace(/^•\s*/, ''));
      } else {
        currentSection.content.push(text);
      }
    }
  });

  return {
    toc,
    intro,
    sections,

    quote: {
      text: '',
      author: '',
    },

    highlight: {
      title: '',
      content: '',
    },

    featuredProduct: {
      badge: 'BEST SELLER',
      image: '/product/bestselller.png',
      title: 'Nord Classic Weighted Blanket',
      description:
        'Our most-loved blanket, hand-finished with glass-bead fill.',
    },
  };
};
