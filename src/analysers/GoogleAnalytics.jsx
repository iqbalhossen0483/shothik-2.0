"use client";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { googlePageView } from "./googleConfiq";
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export default function GoogleAnalytics() {
  const router = usePathname();

  useEffect(() => {
    if (!GA_TRACKING_ID) return;
    googlePageView(router, GA_TRACKING_ID);
    console.log("Google Analytics: PageView");
  }, [router]);

  if (!GA_TRACKING_ID) return null;
  return (
    <>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
        }}
      />
    </>
  );
}
