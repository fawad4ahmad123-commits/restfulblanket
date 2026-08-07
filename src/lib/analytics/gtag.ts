import { GA_ID } from './config';

export function trackEvent(
  eventName: string,
  parameters?: Record<string, unknown>,
) {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) {
    return;
  }

  window.gtag('event', eventName, parameters);
}
