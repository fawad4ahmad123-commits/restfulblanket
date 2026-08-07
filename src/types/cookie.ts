export interface CookieConsent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface CookieContextType {
  consent: CookieConsent;
  loaded: boolean;
  hasConsent: boolean;
  updateConsent: (consent: CookieConsent) => void;
}
