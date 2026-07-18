import * as cheerio from 'cheerio';
import type { WpPage } from './wp';
import { getFeaturedImage } from './wp';

const LINK_COLOR = '#392A22';
const OLD_DOMAIN = 'https://tapbookme.com/';
const NEW_DOMAIN = 'https://restfulblanket.vercel.app/';

export interface WpHeroImage {
  src: string;
  alt: string;
}

export interface ParsedWpPage {
  raw: WpPage;
  title: string;
  heroImage: WpHeroImage | null;
  contentHtml: string;
}

export function parseWpPage(page: WpPage): ParsedWpPage {
  const $ = cheerio.load(page.content.rendered);

  const heroImage = getFeaturedImage(page);

  rewriteLinks($);
  styleHighlightBoxes($);

  return {
    raw: page,
    title: stripHtml(page.title.rendered),
    heroImage,
    contentHtml: $.root().html() ?? '',
  };
}

function rewriteLinks($: cheerio.CheerioAPI): void {
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
}

function styleHighlightBoxes($: cheerio.CheerioAPI): void {
  $('[class*="has-background"]').each((_, el) => {
    const $el = $(el);
    const existing = $el.attr('class') ?? '';
    $el.attr('class', `${existing} wp-highlight-box`.trim());
  });
}

function stripHtml(html: string): string {
  return cheerio.load(html).text().trim();
}
