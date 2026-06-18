"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function UtmBuilder() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");

  const buildUrl = () => {
    if (!url) return "";

    try {
      // Add https:// if no protocol provided for basic URL parsing
      let parsedUrlStr = url;
      if (!/^https?:\/\//i.test(url)) {
        parsedUrlStr = `https://${url}`;
      }
      
      const urlObj = new URL(parsedUrlStr);
      
      if (source) urlObj.searchParams.set("utm_source", source);
      if (medium) urlObj.searchParams.set("utm_medium", medium);
      if (campaign) urlObj.searchParams.set("utm_campaign", campaign);
      if (term) urlObj.searchParams.set("utm_term", term);
      if (content) urlObj.searchParams.set("utm_content", content);

      return urlObj.toString();
    } catch {
      return "Invalid URL format";
    }
  };

  const output = buildUrl();
  const isValidUrl = output && output !== "Invalid URL format";

  const handleCopy = () => {
    if (isValidUrl) {
      navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard");
    }
  };

  const handleReset = () => {
    setUrl("");
    setSource("");
    setMedium("");
    setCampaign("");
    setTerm("");
    setContent("");
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-destructive font-semibold">Website URL *</Label>
            <Input 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              placeholder="https://example.com" 
              className={!url ? "border-destructive/50" : ""}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Campaign Source (utm_source)</Label>
            <Input 
              value={source} 
              onChange={(e) => setSource(e.target.value)} 
              placeholder="e.g. google, newsletter, facebook" 
            />
            <p className="text-xs text-muted-foreground">The referrer (e.g. google, newsletter)</p>
          </div>
          
          <div className="space-y-2">
            <Label>Campaign Medium (utm_medium)</Label>
            <Input 
              value={medium} 
              onChange={(e) => setMedium(e.target.value)} 
              placeholder="e.g. cpc, banner, email" 
            />
            <p className="text-xs text-muted-foreground">Marketing medium (e.g. cpc, banner, email)</p>
          </div>
          
          <div className="space-y-2">
            <Label>Campaign Name (utm_campaign)</Label>
            <Input 
              value={campaign} 
              onChange={(e) => setCampaign(e.target.value)} 
              placeholder="e.g. spring_sale, promo_code" 
            />
            <p className="text-xs text-muted-foreground">Product, promo code, or slogan</p>
          </div>
          
          <div className="space-y-2">
            <Label>Campaign Term (utm_term) <span className="font-normal text-muted-foreground">(optional)</span></Label>
            <Input 
              value={term} 
              onChange={(e) => setTerm(e.target.value)} 
              placeholder="e.g. running+shoes" 
            />
            <p className="text-xs text-muted-foreground">Identify the paid keywords</p>
          </div>
          
          <div className="space-y-2">
            <Label>Campaign Content (utm_content) <span className="font-normal text-muted-foreground">(optional)</span></Label>
            <Input 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="e.g. logolink, textlink" 
            />
            <p className="text-xs text-muted-foreground">Use to differentiate ads</p>
          </div>

          <Button variant="outline" onClick={handleReset} className="w-full mt-4">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset Fields
          </Button>
        </div>

        <div className="bg-muted/30 p-6 rounded-xl border flex flex-col justify-center items-center text-center space-y-6">
          <h3 className="text-xl font-bold">Your Generated URL</h3>
          
          <div className="w-full bg-background border rounded-lg p-4 break-all text-left font-mono text-sm min-h-[100px] flex items-center shadow-inner">
            {output ? (
              <span className={!isValidUrl ? "text-destructive" : ""}>{output}</span>
            ) : (
              <span className="text-muted-foreground italic">Fill in the required fields to generate a URL</span>
            )}
          </div>
          
          <Button size="lg" onClick={handleCopy} disabled={!isValidUrl} className="w-full sm:w-auto">
            <Copy className="mr-2 h-5 w-5" /> Copy URL
          </Button>
        </div>
      </div>
    </div>
  );
}
