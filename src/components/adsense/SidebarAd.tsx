import AdSlot from "./AdSlot";

export default function SidebarAd({ className = "" }: { className?: string }) {
  // Replace adSlot with your actual AdSense ad slot ID for Sidebar
  return <AdSlot className={`w-full min-h-[600px] ${className}`} adSlot="" adFormat="vertical" />;
}
