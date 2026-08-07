import { trackEvent } from './gtag';

export function trackNewsletterSignup() {
  trackEvent('generate_lead', {
    lead_type: 'newsletter',
  });
}

export function trackContactFormSubmission() {
  trackEvent('generate_lead', {
    lead_type: 'contact',
  });
}

export function trackB2BEnquiry() {
  trackEvent('generate_lead', {
    lead_type: 'b2b',
  });
}
