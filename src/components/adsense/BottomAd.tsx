import AdSlot from "./AdSlot";

export default function BottomAd({ className = "" }: { className?: string }) {
  // Replace adSlot with your actual AdSense ad slot ID for Bottom
  return <AdSlot className={`w-full mt-8 ${className}`} adSlot="" />;
}
