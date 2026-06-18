"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState("rgb(59, 130, 246)");
  const [hsl, setHsl] = useState("hsl(217, 91%, 60%)");
  
  // A generic way to represent current color for the preview box
  const [preview, setPreview] = useState("#3b82f6");

  const hexToRgb = (h: string) => {
    let r = 0, g = 0, b = 0;
    if (h.length === 4) {
      r = parseInt(h[1] + h[1], 16);
      g = parseInt(h[2] + h[2], 16);
      b = parseInt(h[3] + h[3], 16);
    } else if (h.length === 7) {
      r = parseInt(h[1] + h[2], 16);
      g = parseInt(h[3] + h[4], 16);
      b = parseInt(h[5] + h[6], 16);
    }
    return [r, g, b];
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
  };

  const parseRgb = (str: string) => {
    const match = str.match(/\d+/g);
    if (match && match.length >= 3) {
      return [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])];
    }
    return null;
  };

  const parseHsl = (str: string) => {
    const match = str.match(/\d+/g);
    if (match && match.length >= 3) {
      return [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])];
    }
    return null;
  };

  const handleHexChange = (val: string) => {
    setHex(val);
    if (/^#([0-9A-F]{3}){1,2}$/i.test(val)) {
      setPreview(val);
      const [r, g, b] = hexToRgb(val);
      setRgb(`rgb(${r}, ${g}, ${b})`);
      const [h, s, l] = rgbToHsl(r, g, b);
      setHsl(`hsl(${h}, ${s}%, ${l}%)`);
    }
  };

  const handleRgbChange = (val: string) => {
    setRgb(val);
    const parsed = parseRgb(val);
    if (parsed) {
      const [r, g, b] = parsed;
      if (r <= 255 && g <= 255 && b <= 255) {
        const hexVal = rgbToHex(r, g, b);
        setHex(hexVal);
        setPreview(hexVal);
      }
    }
  };

  const handleHslChange = (val: string) => {
    setHsl(val);
    const parsed = parseHsl(val);
    if (parsed) {
      const [h, s, l] = parsed;
      if (h <= 360 && s <= 100 && l <= 100) {
        const [r, g, b] = hslToRgb(h, s, l);
        const hexVal = rgbToHex(r, g, b);
        setHex(hexVal);
        setPreview(hexVal);
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${text} copied to clipboard`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>HEX</Label>
          <div className="flex gap-2">
            <Input 
              value={hex} 
              onChange={(e) => handleHexChange(e.target.value)} 
              placeholder="#000000" 
              className="font-mono text-lg uppercase"
            />
            <Button variant="outline" size="icon" onClick={() => copyToClipboard(hex)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>RGB</Label>
          <div className="flex gap-2">
            <Input 
              value={rgb} 
              onChange={(e) => handleRgbChange(e.target.value)} 
              placeholder="rgb(0, 0, 0)" 
              className="font-mono text-lg"
            />
            <Button variant="outline" size="icon" onClick={() => copyToClipboard(rgb)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>HSL</Label>
          <div className="flex gap-2">
            <Input 
              value={hsl} 
              onChange={(e) => handleHslChange(e.target.value)} 
              placeholder="hsl(0, 0%, 0%)" 
              className="font-mono text-lg"
            />
            <Button variant="outline" size="icon" onClick={() => copyToClipboard(hsl)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 p-6 rounded-xl border flex flex-col items-center justify-center space-y-6 h-full min-h-[300px]">
        <h3 className="text-xl font-bold">Color Preview</h3>
        <div 
          className="w-48 h-48 rounded-2xl shadow-inner border-4 border-background transition-colors duration-200"
          style={{ backgroundColor: preview }}
        />
        <div className="font-mono text-xl font-bold tracking-wider">{preview.toUpperCase()}</div>
      </div>
    </div>
  );
}
