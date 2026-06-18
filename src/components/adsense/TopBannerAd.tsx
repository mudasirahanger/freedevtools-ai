import AdSlot from "./AdSlot";

export default function TopBannerAd({ className = "" }: { className?: string }) {
  // Replace adSlot with your actual AdSense ad slot ID for Top Banner
  return <AdSlot className={`w-full ${className}`} adSlot="" />;
}
