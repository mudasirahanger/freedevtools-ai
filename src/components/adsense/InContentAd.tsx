import AdSlot from "./AdSlot";

export default function InContentAd({ className = "" }: { className?: string }) {
  // Replace adSlot with your actual AdSense ad slot ID for In-Content
  return <AdSlot className={`w-full my-8 ${className}`} adSlot="" adFormat="fluid" />;
}
