"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function XmlSitemapGenerator() {
  const [urls, setUrls] = useState("");

  const generateSitemap = () => {
    if (!urls.trim()) return "";

    const urlList = urls.split('\n').map(u => u.trim()).filter(Boolean);
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    urlList.forEach(url => {
      // Basic validation and formatting
      let cleanUrl = url;
      if (!cleanUrl.startsWith('http')) {
        cleanUrl = `https://${cleanUrl}`;
      }
      // Escape ampersands and other XML entities
      cleanUrl = cleanUrl.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      xml += `  <url>\n`;
      xml += `    <loc>${cleanUrl}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  };

  const output = generateSitemap();

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Label>List of URLs (one per line)</Label>
          <Textarea 
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            placeholder={`https://example.com/\nhttps://example.com/about\nhttps://example.com/contact`}
            className="h-[300px]"
          />
          <Button variant="outline" onClick={() => setUrls("")} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" /> Clear URLs
          </Button>
        </div>

        <div className="space-y-2 h-full flex flex-col">
          <Label>Generated XML Sitemap</Label>
          <Textarea
            readOnly
            className="flex-1 min-h-[300px] font-mono text-sm bg-muted/50"
            value={output}
          />
          <Button variant="secondary" onClick={handleCopy} className="w-full mt-2" disabled={!output}>
            <Copy className="mr-2 h-4 w-4" /> Copy XML
          </Button>
        </div>
      </div>
    </div>
  );
}
