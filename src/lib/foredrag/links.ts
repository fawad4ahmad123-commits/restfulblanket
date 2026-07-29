const INTERNAL_HOSTS = [
  'tapbookme.com',
  'www.tapbookme.com',
  'restfulblanket.dk',
  'www.restfulblanket.dk',
];

export function toInternalHref(href: string): string {
  if (!href) return href;
  try {
    const url = new URL(href, 'https://placeholder.local');
    if (INTERNAL_HOSTS.includes(url.hostname)) {
      const path = url.pathname.replace(/\/+$/, '');
      return (path || '/') + url.search + url.hash;
    }
    return href;
  } catch {
    return href;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rewriteLinks($: any, root: any) {
  root.find('a[href]').each((_: number, el: any) => {
    const $el = $(el);
    const href: string = $el.attr('href') || '';
    const isInternal = INTERNAL_HOSTS.some((h) => href.includes(h));
    $el.attr('href', toInternalHref(href));
    if (isInternal) {
      $el.removeAttr('target');
    } else if (href) {
      $el.attr('target', '_blank');
      $el.attr('rel', 'noopener noreferrer');
    }
  });
}
