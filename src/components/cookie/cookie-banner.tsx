'use client';

import { useState } from 'react';


import {
    Button,
} from '@/components/ui/button';

import {
    Checkbox,
} from '@/components/ui/checkbox';
import { useCookieConsent } from '@/src/core/context/cookie-consent';

export default function CookieBanner() {
    const {
        loaded,
        hasConsent,
        consent,
        updateConsent,
    } = useCookieConsent();

    const [showSettings, setShowSettings] =
        useState(false);

    const [localConsent, setLocalConsent] =
        useState(consent);

    if (!loaded || hasConsent)
        return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-[#E9DDD4] bg-[#FFF9F5] p-5 shadow-2xl">
            <div className="mx-auto max-w-7xl">
                <h3 className="mb-2 text-lg font-semibold text-[#35281E]">
                    We use cookies
                </h3>

                <p className="text-sm text-[#35281E]/70">
                    We use cookies to improve
                    your experience, analyse
                    traffic and personalise
                    marketing.
                </p>

                {showSettings && (
                    <div className="mt-5 space-y-4 rounded-xl border border-[#E9DDD4] bg-white p-4">
                        <div className="flex items-center gap-3">
                            <Checkbox checked disabled />
                            <span>
                                Necessary Cookies
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Checkbox
                                checked={
                                    localConsent.analytics
                                }
                                onCheckedChange={(
                                    checked
                                ) =>
                                    setLocalConsent({
                                        ...localConsent,
                                        analytics:
                                            Boolean(
                                                checked
                                            ),
                                    })
                                }
                            />

                            <span>
                                Analytics Cookies
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Checkbox
                                checked={
                                    localConsent.marketing
                                }
                                onCheckedChange={(
                                    checked
                                ) =>
                                    setLocalConsent({
                                        ...localConsent,
                                        marketing:
                                            Boolean(
                                                checked
                                            ),
                                    })
                                }
                            />

                            <span>
                                Marketing Cookies
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Checkbox
                                checked={
                                    localConsent.preferences
                                }
                                onCheckedChange={(
                                    checked
                                ) =>
                                    setLocalConsent({
                                        ...localConsent,
                                        preferences:
                                            Boolean(
                                                checked
                                            ),
                                    })
                                }
                            />

                            <span>
                                Preference Cookies
                            </span>
                        </div>
                    </div>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                    <Button
                        onClick={() =>
                            updateConsent({
                                necessary: true,
                                analytics: true,
                                marketing: true,
                                preferences: true,
                            })
                        }
                        className="bg-[#35281E]"
                    >
                        Accept All
                    </Button>

                    <Button
                        variant="outline"
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

                    {!showSettings ? (
                        <Button
                            variant="ghost"
                            onClick={() =>
                                setShowSettings(true)
                            }
                        >
                            Cookie Settings
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            onClick={() =>
                                updateConsent(
                                    localConsent
                                )
                            }
                        >
                            Save Preferences
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}