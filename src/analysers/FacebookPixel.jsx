"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { initFacebookPixel } from "./fbconfig";

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export default function FacebookPixel() {
  const router = usePathname();

  useEffect(() => {
    if (!FB_PIXEL_ID) return;

    initFacebookPixel(FB_PIXEL_ID);
    window.fbq("track", "PageView");
    console.log("Facebook Pixel: PageView");
  }, [router]);

  if (!FB_PIXEL_ID) return null;
  return (
    <>
      <script
        async
        src={`https://connect.facebook.net/en_US/fbevents.js`}
      ></script>
      <noscript>
        <img
          height='1'
          width='1'
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
