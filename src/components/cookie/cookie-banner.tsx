'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { Checkbox } from '@/components/ui/checkbox';
import { useCookieConsent } from '@/src/core/context/cookie-consent';

export default function CookieBanner() {
  const { loaded, hasConsent, consent, updateConsent } = useCookieConsent();

  const [showSettings, setShowSettings] = useState(false);

  const [localConsent, setLocalConsent] = useState(consent);

  if (!loaded || hasConsent) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] p-4 md:p-6">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#E6CFBB] bg-[#FFF9F5]/95 shadow-[0_20px_60px_rgba(53,40,30,0.18)] backdrop-blur-xl">
        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <span className="mb-3 inline-flex rounded-full border border-[#E6CFBB] bg-white px-3 py-1 text-xs font-medium text-[#35281E]">
                Privacy & Experience
              </span>

              <h3 className="text-xl font-semibold text-[#35281E] md:text-2xl">
                We use cookies to improve your experience
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#35281E]/70 md:text-base">
                RestfulBlanket uses cookies to improve website performance,
                understand visitor behaviour and personalise content. Your
                choices help us create a better experience and continue
                improving our products and services.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:min-w-[220px]">
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
