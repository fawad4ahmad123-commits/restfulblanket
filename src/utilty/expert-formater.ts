import * as cheerio from 'cheerio';

export interface FocusArea {
  title: string;
  contentHtml: string;
}

export interface ReviewedArticle {
  title: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EducationItem {
  year: string;
  title: string;
}

export interface ProfessionalOverviewItem {
  title: string;
  description: string;
}

export interface FormattedExpert {
  slug: string;
  name: string;
  image: string;
  title: string;
  tags: string[];
  introductionHtml: string;
  role: string;
  professionalOverview: ProfessionalOverviewItem[];
  education: EducationItem[];
  focusAreas: FocusArea[];
  workPhilosophyHtml: string;
  vulnerableGroupsHtml: string;
  roleDescriptionHtml: string;
  reviewedArticles: ReviewedArticle[];
  disclaimerHtml: string;
  faqs: FaqItem[];
  link: string;
}

const SECTION = {
  PROFILE: 'kort profil',
  BACKGROUND: 'professionel baggrund',
  SPECIALIZATION: 'supplerende specialisering',
  FOCUS_AREAS: 'faglige fokusområder',
  PHILOSOPHY: 'arbejdsfilosofi',
  VULNERABLE_GROUPS: 'erfaring med sårbare grupper',
  ROLE: 'rolle i restfulblanket',
  BOUNDARIES: 'afgrænsning',
} as const;

const normalize = (text: string) => text.trim().toLowerCase();

type Group = { heading: string | null; els: any[] };

export function formatExpertData(page: any): any {
  const html: string = page?.content?.rendered ?? '';
  const $ = cheerio.load(html);
  const root: cheerio.Cheerio<any> = $('body').length
    ? $('body')
    : ($.root() as any);
  const nodes = root.children().toArray();

  const groups: Group[] = [];
  let current: Group = { heading: null, els: [] };

  nodes.forEach((el: any) => {
    const tag = el.tagName?.toLowerCase();
    if (tag === 'h2') {
      groups.push(current);
      current = { heading: $(el).text(), els: [] };
    } else if (tag === 'hr') {
    } else {
      current.els.push(el);
    }
  });
  groups.push(current);

  const findGroup = (key: string) =>
    groups.find((g) => g.heading && normalize(g.heading) === key);
  const isFigure = (el: any) => el.tagName?.toLowerCase() === 'figure';

  const groupHtml = (
    group: Group | undefined,
    filter?: (el: any) => boolean,
  ) => {
    if (!group) return '';
    const els = filter ? group.els.filter(filter) : group.els;
    return els.map((el) => $.html(el)).join('\n');
  };

  const leadGroup = groups.find((g) => g.heading === null);
  const title = leadGroup
    ? $(leadGroup.els.map((el) => $.html(el)).join(''))
        .text()
        .trim()
    : '';

  const profileGroup = findGroup(SECTION.PROFILE);
  const introductionHtml = groupHtml(profileGroup, (el) => !isFigure(el));

  let role = '';
  profileGroup?.els.forEach((el) => {
    const text = $(el).text();
    if (!role && /restfulblanket/i.test(text)) role = text.trim();
  });

  const focusGroup = findGroup(SECTION.FOCUS_AREAS);
  const focusAreas: FocusArea[] = [];
  if (focusGroup) {
    let area: FocusArea | null = null;
    focusGroup.els.forEach((el) => {
      if (el.tagName?.toLowerCase() === 'h3') {
        if (area) focusAreas.push(area);
        area = { title: $(el).text().trim(), contentHtml: '' };
      } else if (area && !isFigure(el)) {
        area.contentHtml += $.html(el);
      }
    });
    if (area) focusAreas.push(area);
  }

  const sectionHtml = (key: string) =>
    groupHtml(findGroup(key), (el) => !isFigure(el));
  const workPhilosophyHtml = sectionHtml(SECTION.PHILOSOPHY);
  const vulnerableGroupsHtml = sectionHtml(SECTION.VULNERABLE_GROUPS);
  const disclaimerHtml = sectionHtml(SECTION.BOUNDARIES);
  const specializationGroup = findGroup(SECTION.SPECIALIZATION);
  const education: EducationItem[] = [];
  const firstList = specializationGroup?.els.find(
    (el) => el.tagName?.toLowerCase() === 'ul',
  );
  if (firstList) {
    $(firstList)
      .find('> li')
      .each((_, li) => {
        const t = $(li).text().trim();
        if (t) education.push({ year: '—', title: t });
      });
  }

  const backgroundGroup = findGroup(SECTION.BACKGROUND);
  const professionalOverview: ProfessionalOverviewItem[] = [];
  backgroundGroup?.els.forEach((el, i) => {
    if (el.tagName?.toLowerCase() === 'p') {
      const text = $(el).text().trim();
      if (text && professionalOverview.length < 4) {
        professionalOverview.push({
          title: `Baggrund ${professionalOverview.length + 1}`,
          description: text,
        });
      }
    }
  });

  const roleGroup = findGroup(SECTION.ROLE);
  const reviewedArticles: ReviewedArticle[] = [];
  let roleDescriptionHtml = '';
  roleGroup?.els.forEach((el) => {
    if (isFigure(el)) return;
    const $el = $(el);
    const links = $el.find('a');
    if (
      links.length === 1 &&
      $el.text().trim() === links.first().text().trim()
    ) {
      reviewedArticles.push({
        title: links.first().text().trim(),
        url: links.first().attr('href') || '',
      });
    } else {
      roleDescriptionHtml += $.html(el);
    }
  });
  const faqs: FaqItem[] = [];
  root
    .find('.wp-block-rank-math-faq-block .rank-math-faq-item')
    .each((_, item) => {
      const $item = $(item);
      faqs.push({
        question: $item.find('.rank-math-question').first().text().trim(),
        answer: $item.find('.rank-math-answer').first().text().trim(),
      });
    });

  const embeddedMedia = page?._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const allImgs = root.find('figure img').toArray();
  const headshotImg = allImgs.find((img) => {
    const $img = $(img);
    return /headshot|portrait|profile/i.test(
      `${$img.attr('alt') || ''} ${$img.attr('src') || ''}`,
    );
  });
  const image =
    embeddedMedia ||
    (headshotImg && $(headshotImg).attr('src')) ||
    (allImgs[0] && $(allImgs[0]).attr('src')) ||
    '';
  const tags = focusAreas
    .slice(0, 4)
    .map((a) => a.title.split(/,| og /i)[0].trim());

  return {
    slug: page?.slug ?? '',
    name: page?.title?.rendered ?? '',
    image,
    title,
    tags: tags ?? [],
    introductionHtml,
    role,
    professionalOverview: professionalOverview ?? [],
    education: education ?? [],
    focusAreas: focusAreas ?? [],
    workPhilosophyHtml,
    vulnerableGroupsHtml,
    roleDescriptionHtml,
    reviewedArticles: reviewedArticles ?? [],
    disclaimerHtml,
    faqs: faqs ?? [],
    link: page?.link ?? '',
  };
}

export async function getExperts(slug?: string): Promise<any | null> {
  const base = 'https://tapbookme.com/wp-json/wp/v2/pages';

  const url = slug
    ? `${base}?slug=${encodeURIComponent(slug)}&_embed`
    : `${base}?_embed&per_page=100`;

  const res = await fetch(url);

  if (!res.ok) return null;

  const pages = await res.json();

  if (slug) {
    const page = pages[0];
    return page ? formatExpertData(page) : null;
  }

  return pages.map(formatExpertData);
}
