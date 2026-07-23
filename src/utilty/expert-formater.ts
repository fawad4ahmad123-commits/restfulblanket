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

export interface AdditionalSection {
  title: string;
  html: string;
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
  additionalSections: AdditionalSection[];
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

const KNOWN_KEYS: string[] = Object.values(SECTION);

const normalize = (text: string) => text.trim().toLowerCase();

type Group = { heading: string | null; els: any[] };

/**
 * Picks the best available headshot from the page content itself.
 * Prefers images whose alt/src hints at a portrait/headshot, then falls
 * back to the largest image found (by declared width attribute), so we
 * never accidentally pick a tiny icon/avatar-sized image.
 */
function pickBestContentImage(
  $: cheerio.CheerioAPI,
  root: cheerio.Cheerio<any>,
): string {
  const candidates = root
    .find('figure img')
    .toArray()
    .map((img) => {
      const $img = $(img);
      const src = $img.attr('src') || '';
      const alt = $img.attr('alt') || '';
      const width = parseInt($img.attr('width') || '0', 10) || 0;
      return { src, alt, width };
    })
    .filter((c) => !!c.src);

  if (candidates.length === 0) return '';

  const portrait = candidates.find((c) =>
    /headshot|portrait|profile/i.test(`${c.alt} ${c.src}`),
  );
  if (portrait) return portrait.src;

  // Fall back to the widest image (avoids picking a small inline icon).
  const widest = candidates.reduce((best, c) =>
    c.width > best.width ? c : best,
  );
  return widest.src || candidates[0].src;
}

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
      // separators are dropped, don't start a new group on their own
    } else {
      current.els.push(el);
    }
  });
  groups.push(current);

  // "includes" matching so trailing punctuation/whitespace on a heading
  // (e.g. "Rolle i RestfulBlanket:" ) doesn't silently break detection.
  const findGroup = (key: string) =>
    groups.find((g) => g.heading && normalize(g.heading).includes(key));

  const isFigure = (el: any) => el.tagName?.toLowerCase() === 'figure';

  const groupHtml = (
    group: Group | undefined,
    filter?: (el: any) => boolean,
  ) => {
    if (!group) return '';
    const els = filter ? group.els.filter(filter) : group.els;
    return els.map((el) => $.html(el)).join('\n');
  };

  // --- TITLE ---
  // Only take the FIRST element before the first <h2> as the title, not the
  // whole lead group. Pages without an early <h2> (e.g. long personal bios)
  // would otherwise dump their entire intro into `title`.
  const leadGroup = groups.find((g) => g.heading === null);
  const leadEls = leadGroup?.els ?? [];
  const titleEl = leadEls.find((el) => !isFigure(el));
  const title = titleEl ? $(titleEl).text().trim() : '';

  // Any leftover lead content becomes a fallback intro when there's no
  // "Kort profil" section.
  const leadRestHtml = leadEls
    .filter((el) => el !== titleEl && !isFigure(el))
    .map((el) => $.html(el))
    .join('\n');

  const profileGroup = findGroup(SECTION.PROFILE);
  const introductionHtml = profileGroup
    ? groupHtml(profileGroup, (el) => !isFigure(el))
    : leadRestHtml;

  // --- ROLE ---
  let role = '';
  const roleSourceEls = profileGroup?.els ?? leadEls;
  roleSourceEls.forEach((el) => {
    const text = $(el).text();
    if (!role && /restfulblanket/i.test(text)) role = text.trim();
  });
  if (!role) {
    root.find('p').each((_, p) => {
      if (role) return;
      const text = $(p).text();
      if (/restfulblanket/i.test(text)) role = text.trim();
    });
  }

  // --- FOCUS AREAS ---
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
  backgroundGroup?.els.forEach((el) => {
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

  // --- ADDITIONAL SECTIONS ---
  // Any <h2> group whose heading doesn't match a known template section is
  // preserved here instead of being silently dropped (rescues pages like a
  // founder bio that uses its own heading vocabulary).
  const additionalSections: AdditionalSection[] = groups
    .filter((g) => {
      if (!g.heading) return false;
      const n = normalize(g.heading);
      return !KNOWN_KEYS.some((key) => n.includes(key));
    })
    .map((g) => ({
      title: g.heading!.trim(),
      html: groupHtml(g, (el) => !isFigure(el)),
    }));

  // --- IMAGE ---
  // Prefer the WP featured media (requires the fetch to have used &_embed
  // and the page to actually have a featured_media set). Fall back to
  // scanning the content for the best portrait-like image, avoiding small
  // icons/avatars.
  const embeddedMedia = page?._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const image = embeddedMedia || pickBestContentImage($, root) || '';

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
    additionalSections,
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
