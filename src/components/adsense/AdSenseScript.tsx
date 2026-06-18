"use client";

import Script from "next/script";
import { ADSENSE_CLIENT_ID } from "@/lib/constants";

export default function AdSenseScript() {
  if (!ADSENSE_CLIENT_ID) {
    return null;
  }

  // Once Adsense is approved, auto ads can be enabled here using this script.
  // The data-ad-client attribute specifies the publisher ID.
  return (
    <Script
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  );
}
