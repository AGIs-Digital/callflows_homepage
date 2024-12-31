"use client";

import Script from "next/script";

export function Analytics() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  const TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

  if (!TRACKING_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${TRACKING_ID}');
        `}
      </Script>
    </>
  );
}