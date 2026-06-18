"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Link as LinkIcon } from "lucide-react";

export default function OpenGraphPreview() {
  const [title, setTitle] = useState("Open Graph Preview Tool");
  const [desc, setDesc] = useState("Preview how your website will look when shared on Facebook, Twitter, LinkedIn, and more.");
  const [image, setImage] = useState("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&h=630&q=80");
  const [url, setUrl] = useState("freedevtools.ai");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold border-b pb-2">Meta Information</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={90} />
          </div>
          
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} maxLength={200} className="h-20" />
          </div>
          
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
          </div>
          
          <div className="space-y-2">
            <Label>Domain / URL</Label>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="example.com" />
          </div>

          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => {
              setTitle(""); setDesc(""); setImage(""); setUrl("");
            }}
          >
            Clear Fields
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-lg font-semibold border-b pb-2">Social Previews</h3>
        
        {/* Facebook / LinkedIn Preview */}
        <div className="space-y-2">
          <span className="text-sm font-medium text-muted-foreground">Facebook / LinkedIn</span>
          <div className="border border-[#dadde1] bg-[#f2f3f5] rounded-lg overflow-hidden max-w-[500px]">
            <div className="w-full aspect-[1.91/1] bg-muted relative flex items-center justify-center">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt="OG Preview" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
              ) : (
                <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
              )}
            </div>
            <div className="p-3 bg-[#f2f3f5]">
              <div className="text-[12px] text-[#606770] uppercase uppercase tracking-wider font-semibold mb-1 truncate">
                {url.toUpperCase() || "EXAMPLE.COM"}
              </div>
              <div className="text-[16px] font-semibold text-[#1d2129] leading-tight mb-1 line-clamp-1">
                {title || "Page Title"}
              </div>
              <div className="text-[14px] text-[#606770] leading-snug line-clamp-1">
                {desc || "Description of the page goes here."}
              </div>
            </div>
          </div>
        </div>

        {/* Twitter Preview */}
        <div className="space-y-2">
          <span className="text-sm font-medium text-muted-foreground">Twitter (Summary Card with Large Image)</span>
          <div className="border border-[#e1e8ed] rounded-xl overflow-hidden max-w-[500px]">
            <div className="w-full aspect-[1.91/1] bg-muted relative flex items-center justify-center border-b border-[#e1e8ed]">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt="Twitter Preview" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
              ) : (
                <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
              )}
            </div>
            <div className="p-3 bg-white text-black">
              <div className="text-[15px] font-semibold leading-tight mb-[2px] line-clamp-1">
                {title || "Page Title"}
              </div>
              <div className="text-[15px] text-[#536471] leading-snug line-clamp-2 mb-[2px]">
                {desc || "Description of the page goes here."}
              </div>
              <div className="flex items-center text-[15px] text-[#536471] mt-1">
                <LinkIcon className="h-4 w-4 mr-1" />
                <span className="truncate">{url || "example.com"}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
