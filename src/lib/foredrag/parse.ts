import * as cheerio from 'cheerio';
import { rewriteLinks, toInternalHref } from './links';

export type TicketInfo = {
  title: string;
  image?: string;
  price?: string;
  stock?: string;
  productUrl?: string;
};

export type FaqItem = { question: string; answerHtml: string };

export type SpeakerInfo = {
  name: string;
  imageUrl?: string;
  bioHtml: string;
  profileUrl?: string;
};

export type Section = {
  heading: string;
  html: string;
  speakers?: SpeakerInfo[];
};

export type ParsedForedrag = {
  introHtml: string;
  ticket?: TicketInfo;
  sections: Section[];
  faqs: FaqItem[];
};

function extractSpeakers($$: cheerio.CheerioAPI): SpeakerInfo[] {
  const speakers: SpeakerInfo[] = [];
  $$.root()
    .children('h3')
    .each((_, h3) => {
      const $h3 = $$(h3);
      const name = $h3.text().trim();
      const link = $h3.find('a').attr('href');
      let node = $h3.next();
      let imageUrl: string | undefined;
      const bioParts: string[] = [];

      while (node.length && !node.is('h3')) {
        if (node.is('figure')) {
          imageUrl = node.find('img').attr('src');
        } else if (!node.hasClass('wp-block-kadence-spacer')) {
          const html = $$.html(node);
          if (html) bioParts.push(html);
        }
        node = node.next();
      }

      if (name) {
        speakers.push({
          name,
          imageUrl,
          bioHtml: bioParts.join('\n'),
          profileUrl: link ? toInternalHref(link) : undefined,
        });
      }
    });
  return speakers;
}

export function parseForedragContent(
  rawHtml: string,
  pageTitle: string,
): ParsedForedrag {
  const $ = cheerio.load(rawHtml, {}, false);

  let ticket: TicketInfo | undefined;
  const productBlock = $(
    '[data-block-name="woocommerce/single-product"]',
  ).first();
  if (productBlock.length) {
    const img = productBlock.find('img').first().attr('src');
    const price = productBlock
      .find('.woocommerce-Price-amount')
      .first()
      .text()
      .trim();
    const stock = productBlock.find('.stock').first().text().trim();
    const link = productBlock.find('a[href]').first().attr('href');
    const title =
      productBlock.find('.wp-block-post-title').first().text().trim() ||
      pageTitle;

    ticket = {
      title,
      image: img,
      price: price || undefined,
      stock: stock || undefined,
      productUrl: link ? toInternalHref(link) : undefined,
    };
    productBlock.remove();
  }

  const faqs: FaqItem[] = [];
  $('.rank-math-faq-item').each((_, el) => {
    const $el = $(el);
    const question = $el.find('.rank-math-question').first().text().trim();
    const answerEl = $el.find('.rank-math-answer').first();
    rewriteLinks($, answerEl);
    const answerHtml = answerEl.html()?.trim() || '';
    if (question) faqs.push({ question, answerHtml });
  });
  $('.wp-block-rank-math-faq-block').remove();

  rewriteLinks($, $.root());

  const introNodes: string[] = [];
  const sections: Section[] = [];
  let current: Section | null = null;

  $.root()
    .children()
    .each((_, el) => {
      const $el = $(el);
      const tag = (el as { tagName?: string }).tagName?.toLowerCase();
      if (tag === 'h2') {
        if (current) sections.push(current);
        current = { heading: $el.text().trim(), html: '' };
      } else {
        const outer = $.html(el) || '';
        if (current) current.html += outer;
        else introNodes.push(outer);
      }
    });
  if (current) sections.push(current);

  for (const section of sections) {
    if (/<h3[\s>]/.test(section.html) && /<figure/.test(section.html)) {
      const $$ = cheerio.load(section.html, {}, false);
      const speakers = extractSpeakers($$);
      if (speakers.length) section.speakers = speakers;
    }
  }

  return { introHtml: introNodes.join('\n'), ticket, sections, faqs };
}
