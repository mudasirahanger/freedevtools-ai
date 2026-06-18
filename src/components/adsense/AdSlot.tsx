"use client";

import { useEffect, useState } from "react";
import { ADSENSE_CLIENT_ID } from "@/lib/constants";

interface AdSlotProps {
  className?: string;
  adSlot?: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
}

export default function AdSlot({
  className = "",
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
}: AdSlotProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && ADSENSE_CLIENT_ID && adSlot) {
      try {
        // @ts-expect-error - adsbygoogle is added by the AdSense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error", err);
      }
    }
  }, [isMounted, adSlot]);

  if (!isMounted) return null;

  // Development Placeholder
  if (!ADSENSE_CLIENT_ID || !adSlot) {
    return (
      <div
        className={`bg-muted flex items-center justify-center text-muted-foreground text-sm border border-dashed rounded-md p-4 min-h-[100px] ${className}`}
      >
        AdSense Placeholder
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}
