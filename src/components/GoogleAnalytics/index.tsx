'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { GA_ID } from '@/src/lib/analytics/config';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID || !window.gtag) return;

    const queryString = searchParams?.toString();

    const pagePath = pathname + (queryString ? `?${queryString}` : '');

    window.gtag('config', GA_ID, {
      page_path: pagePath,
    });
  }, [pathname, searchParams]);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            window.dataLayer.push(arguments);
          }

          window.gtag = gtag;

          gtag('js', new Date());

          gtag('config', '${GA_ID}', {
            send_page_view: false
          });
        `}
      </Script>
    </>
  );
}
