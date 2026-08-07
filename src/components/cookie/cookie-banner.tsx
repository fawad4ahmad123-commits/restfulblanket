'use client';

import { useState } from 'react';
import { Cookie, Minimize2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useCookieConsent } from '@/src/core/context/cookie-consent';

export default function CookieBanner() {
  const { loaded, hasConsent, consent, updateConsent } = useCookieConsent();

  const [showSettings, setShowSettings] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [localConsent, setLocalConsent] = useState(consent);

  if (!loaded || hasConsent) return null;

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#35281E] text-white shadow-xl transition hover:scale-105"
      >
        <Cookie className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-7xl">
      <div className="rounded-3xl border border-[#E9DDD4] bg-[#FFF9F5] shadow-2xl">
        <div className="relative p-6 md:p-8">
          <button
            onClick={() => setMinimized(true)}
            className="absolute right-4 top-2 rounded-lg p-2 text-[#35281E]/70 transition cursor-pointer hover:bg-[#F5EBDD]"
          >
            <Minimize2 className="h-5 w-5" />
          </button>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between py-2">
            <div className="max-w-4xl">
              <span className="inline-flex rounded-full bg-[#F5EBDD] px-3 py-1 text-xs font-medium text-[#35281E]">
                Privacy & Experience
              </span>

              <h3 className="mt-4 text-xl font-semibold text-[#35281E] md:text-2xl">
                We use cookies to improve your experience
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#35281E]/70 md:text-base">
                RestfulBlanket uses cookies to improve website performance,
                understand visitor behaviour and personalise content. Your
                choices help us create a better experience and continue
                improving our products and services.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:min-w-[240px]">
              <Button
                className="h-12 rounded-xl bg-[#35281E] text-white hover:bg-[#2B211A]"
                onClick={() =>
                  updateConsent({
                    necessary: true,
                    analytics: true,
                    marketing: true,
                    preferences: true,
                  })
                }
              >
                Accept All Cookies
              </Button>

              {!showSettings ? (
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-[#E6CFBB]"
                  onClick={() => setShowSettings(true)}
                >
                  Manage Preferences
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-[#E6CFBB]"
                  onClick={() => updateConsent(localConsent)}
                >
                  Save Preferences
                </Button>
              )}
            </div>
          </div>

          {showSettings && (
            <div className="mt-6 rounded-2xl border border-[#E9DDD4] bg-white p-5">
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-[#35281E]">
                      Necessary Cookies
                    </h4>
                    <p className="text-sm text-[#35281E]/60">
                      Required for security, checkout and basic website
                      functionality.
                    </p>
                  </div>

                  <Checkbox checked disabled />
                </div>

                <div className="flex items-start justify-between gap-4 border-t pt-4">
                  <div>
                    <h4 className="font-medium text-[#35281E]">
                      Analytics Cookies
                    </h4>
                    <p className="text-sm text-[#35281E]/60">
                      Help us understand how visitors use our website so we can
                      improve it.
                    </p>
                  </div>

                  <Checkbox
                    checked={localConsent.analytics}
                    onCheckedChange={(checked) =>
                      setLocalConsent({
                        ...localConsent,
                        analytics: Boolean(checked),
                      })
                    }
                  />
                </div>

                <div className="flex items-start justify-between gap-4 border-t pt-4">
                  <div>
                    <h4 className="font-medium text-[#35281E]">
                      Marketing Cookies
                    </h4>
                    <p className="text-sm text-[#35281E]/60">
                      Used to measure campaigns and show relevant advertising.
                    </p>
                  </div>

                  <Checkbox
                    checked={localConsent.marketing}
                    onCheckedChange={(checked) =>
                      setLocalConsent({
                        ...localConsent,
                        marketing: Boolean(checked),
                      })
                    }
                  />
                </div>

                <div className="flex items-start justify-between gap-4 border-t pt-4">
                  <div>
                    <h4 className="font-medium text-[#35281E]">
                      Preference Cookies
                    </h4>
                    <p className="text-sm text-[#35281E]/60">
                      Remember settings and personalise your browsing
                      experience.
                    </p>
                  </div>

                  <Checkbox
                    checked={localConsent.preferences}
                    onCheckedChange={(checked) =>
                      setLocalConsent({
                        ...localConsent,
                        preferences: Boolean(checked),
                      })
                    }
                  />
                </div>

                <div className="flex justify-end border-t pt-5">
                  <Button
                    variant="ghost"
                    className="text-[#35281E]"
                    onClick={() =>
                      updateConsent({
                        necessary: true,
                        analytics: false,
                        marketing: false,
                        preferences: false,
                      })
                    }
                  >
                    Necessary Only
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
