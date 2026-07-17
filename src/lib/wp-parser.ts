import * as cheerio from 'cheerio';
import type {
  AuthorBio,
  FaqItem,
  GuideCard,
  GuidesHubPage,
  ParsedGuidePage,
  TocItem,
  WPGuidePage,
} from '../types/wp';

const LINK_COLOR = '#392A22';

const OLD_DOMAIN = 'https://tapbookme.com/';
const NEW_DOMAIN = 'https://restfulblanket.vercel.app/';
const AUTHOR_PROFILE_URL =
  'https://restfulblanket.vercel.app/Ekspertprofil/zafir-baek';

export function parseGuidePage(page: WPGuidePage): ParsedGuidePage {
  const $ = cheerio.load(page.content.rendered);

  const heroImage = extractHeroImage($);
  const toc = extractToc($);
  const faqs = extractFaqs($);
  const authorBio = extractAuthorBio($);

  $('.toc-container').remove();
  $('.wp-block-rank-math-faq-block').remove();

  $('a').each((_, el) => {
    const $el = $(el);

    const href = $el.attr('href');
    if (href?.startsWith(OLD_DOMAIN)) {
      $el.attr('href', href.replace(OLD_DOMAIN, NEW_DOMAIN));
    }

    if ($el.hasClass('wp-block-button__link')) {
      $el.removeAttr('style');
      $el.attr('class', 'wp-block-button__link');
      return;
    }

    const existing = $el.attr('class') ?? '';
    $el.attr(
      'class',
      `${existing} text-[${LINK_COLOR}] underline underline-offset-2 hover:opacity-80`.trim(),
    );
  });

  return {
    id: page.id,
    slug: page.slug,
    link: page.link,
    title: stripHtml(page.title.rendered),
    heroImage,
    toc,
    faqs,
    authorBio,
    contentHtml: $.root().html() ?? '',
  };
}

function extractHeroImage(
  $: cheerio.CheerioAPI,
): { src: string; alt: string } | null {
  const firstH2 = $('h2').first();
  const allImages = $('img');
  if (allImages.length === 0) return null;

  let img = allImages.first();

  if (firstH2.length > 0) {
    const allNodes = $.root().find('*').toArray();
    const h2Index = allNodes.indexOf(firstH2.get(0)!);
    const introImage = allImages
      .toArray()
      .find((el) => allNodes.indexOf(el) < h2Index);

    if (!introImage) return null;
    img = $(introImage);
  }

  if (!img || img.length === 0) return null;

  return {
    src: img.attr('src') ?? '',
    alt: img.attr('alt') ?? '',
  };
}

function extractToc($: cheerio.CheerioAPI): TocItem[] {
  const items: TocItem[] = [];

  $('h2[id]').each((_, el) => {
    const $el = $(el);
    const id = $el.attr('id');

    if (!id) return;

    items.push({
      id,
      label: $el.text().trim(),
    });
  });

  return items;
}

function extractFaqs($: cheerio.CheerioAPI): FaqItem[] {
  const items: FaqItem[] = [];

  $('.rank-math-faq-item').each((_, el) => {
    const $el = $(el);

    const question = $el.find('.rank-math-question').first().text().trim();
    const answer = $el.find('.rank-math-answer').first().html()?.trim() ?? '';

    if (question) {
      items.push({
        question,
        answer,
      });
    }
  });

  return items;
}

function extractAuthorBio($: cheerio.CheerioAPI): AuthorBio | null {
  const bioLink = $('a[href*="om-zafir-baek"]').first();

  if (bioLink.length === 0) return null;

  const bioParagraph = bioLink.closest('p');

  let image: AuthorBio['image'] = null;

  const img = $('img[src*="zafir"]').first();

  if (img.length > 0) {
    image = {
      src: img.attr('src') ?? '',
      alt: img.attr('alt') ?? '',
    };
  }

  const phoneLink = $('a[href^="callto:"], a[href^="tel:"]').first();
  const phone = phoneLink.length > 0 ? phoneLink.text().trim() : null;

  bioLink.attr('href', AUTHOR_PROFILE_URL);

  const bioHtml = bioParagraph.html()?.trim() ?? '';

  const figure = img.length > 0 ? img.closest('figure') : $();
  const phoneParagraph = phoneLink.length > 0 ? phoneLink.closest('p') : $();
  const signOffParagraph = $('p:contains("Restful hilsner")').first();
  const newsletterHeading = $('h5:contains("nyhedsbrevet")').first();

  figure.remove();
  phoneParagraph.remove();
  signOffParagraph.remove();
  newsletterHeading.remove();
  bioParagraph.remove();

  return {
    name: 'Zafir Bæk',
    image,
    bioHtml,
    bioLinkHref: AUTHOR_PROFILE_URL,
    phone,
  };
}

function stripHtml(html: string): string {
  return cheerio.load(html).text().trim();
}

const HUB_SLUG_PATTERNS: { pattern: RegExp; slug: string }[] = [
  { pattern: /angst/i, slug: 'angst' },
  { pattern: /ptsd/i, slug: 'ptsd' },
  { pattern: /adhd/i, slug: 'adhd' },
  { pattern: /søvn|sovn/i, slug: 'soevn' },
];

export function parseGuidesHubPage(hubPage: WPGuidePage): GuidesHubPage {
  const $ = cheerio.load(hubPage.content.rendered);
  const $container = $('body');

  $container.find('a').each((_, el) => {
    const $el = $(el);
    const href = $el.attr('href');
    if (href?.startsWith(OLD_DOMAIN)) {
      $el.attr('href', href.replace(OLD_DOMAIN, NEW_DOMAIN));
    }

    if ($el.hasClass('wp-block-button__link')) {
      $el.removeAttr('style');
      $el.attr('class', 'wp-block-button__link');
      return;
    }

    const existing = $el.attr('class') ?? '';
    $el.attr(
      'class',
      `${existing} text-[${LINK_COLOR}] underline underline-offset-2 hover:opacity-80`.trim(),
    );
  });

  const h1 = $container.find('h1').first();
  const title =
    h1.length > 0 ? h1.text().trim() : stripHtml(hubPage.title.rendered);
  h1.remove();

  const heroImg = $container.find('img').first();
  let heroImage: GuidesHubPage['heroImage'] = null;
  if (heroImg.length > 0) {
    heroImage = {
      src: heroImg.attr('src') ?? '',
      alt: heroImg.attr('alt') ?? '',
    };
    heroImg.closest('figure').remove();
  }

  const columns = $container.find('.wp-block-columns').first();
  const cards: GuideCard[] = [];

  if (columns.length > 0) {
    columns.find('h2, h3').each((_, heading) => {
      const $heading = $(heading);
      const headingTitle = $heading.text().trim();
      const match = HUB_SLUG_PATTERNS.find(({ pattern }) =>
        pattern.test(headingTitle),
      );
      if (!match) return;

      const $following = $heading.nextUntil('h2, h3');

      let description = '';
      $following.filter('p').each((_, p) => {
        const text = $(p).text().trim();
        if (!description && text && !/lærer du/i.test(text)) {
          description = text;
        }
      });

      const bullets: string[] = [];
      $following.find('li').each((_, li) => {
        bullets.push($(li).text().trim());
      });
      cards.push({
        slug: match.slug,
        title: headingTitle,
        description,
        bullets,
        href: `/guides/${match.slug}`,
      });
    });
  }

  const allNodes = $container.contents().toArray();
  const columnsNode = columns.get(0);
  const splitIndex = columnsNode ? allNodes.indexOf(columnsNode) : -1;

  let beforeGridHtml = '';
  let afterGridHtml = '';

  if (splitIndex === -1) {
    beforeGridHtml = $container.html() ?? '';
  } else {
    const beforeNodes = allNodes.slice(0, splitIndex);
    const afterNodes = allNodes.slice(splitIndex + 1);
    beforeGridHtml = beforeNodes.map((el) => $.html(el)).join('');
    afterGridHtml = afterNodes.map((el) => $.html(el)).join('');
  }

  return { title, heroImage, cards, beforeGridHtml, afterGridHtml };
}
