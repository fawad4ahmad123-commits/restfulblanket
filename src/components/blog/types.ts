export interface TocItem {
  id: string;
  title: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  content: string[];
  list?: string[];
}

export interface FeaturedProduct {
  badge: string;
  image: string;
  title: string;
  description: string;
}

export interface ArticleData {
  intro: string[];
  sections: ArticleSection[];
  quote: {
    text: string;
    author: string;
  };
  highlight: {
    title: string;
    content: string;
  };
  toc: TocItem[];
  featuredProduct: FeaturedProduct;
}
