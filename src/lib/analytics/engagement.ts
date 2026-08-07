import { trackEvent } from './gtag';

export function trackSearch(searchTerm: string) {
  if (!searchTerm) return;

  trackEvent('search', {
    search_term: searchTerm,
  });
}
