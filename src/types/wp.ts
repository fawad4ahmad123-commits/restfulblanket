export interface WPRendered {
  rendered: string;
  protected?: boolean;
}

export interface WPGuidePage {
  id: number;
  date: string;
  date_gmt: string;
  guid: WPRendered;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  template: string;
}

export interface TocItem {
  id: string;
  label: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AuthorBio {
  name: string;
  image: { src: string; alt: string } | null;
  bioHtml: string;
  bioLinkHref: string;
  phone: string | null;
}

export interface ParsedGuidePage {
  id: number;
  slug: string;
  link: string;
  title: string;
  heroImage: { src: string; alt: string } | null;
  toc: TocItem[];
  faqs: FaqItem[];
  authorBio: AuthorBio | null;
  contentHtml: string;
}
