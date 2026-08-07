'use client';

import Cookies from 'js-cookie';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import { CookieConsent, CookieContextType } from '@/src/types/cookie';

const defaultConsent: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

const CookieContext = createContext<CookieContextType | null>(null);

export function CookieProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  const [consent, setConsent] = useState<CookieConsent>(defaultConsent);

  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const saved = Cookies.get('rb_cookie_consent');

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        setConsent(parsed);
        setHasConsent(true);
      } catch {}
    }

    setLoaded(true);
  }, []);

  const updateConsent = (newConsent: CookieConsent) => {
    Cookies.set('rb_cookie_consent', JSON.stringify(newConsent), {
      expires: 180,
    });

    setConsent(newConsent);
    setHasConsent(true);

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: 'consent_update',
      analytics_storage: newConsent.analytics ? 'granted' : 'denied',
      ad_storage: newConsent.marketing ? 'granted' : 'denied',
      ad_user_data: newConsent.marketing ? 'granted' : 'denied',
      ad_personalization: newConsent.marketing ? 'granted' : 'denied',
    });
  };

  return (
    <CookieContext.Provider
      value={{
        consent,
        loaded,
        hasConsent,
        updateConsent,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieContext);

  if (!context) {
    throw new Error('useCookieConsent must be used within CookieProvider');
  }

  return context;
}
