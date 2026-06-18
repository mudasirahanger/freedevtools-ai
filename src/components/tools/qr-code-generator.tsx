"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export default function QrCodeGenerator() {
  const [value, setValue] = useState("https://freedevtools.ai");
  const [size, setSize] = useState([256]);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("M");

  const downloadQR = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = size[0];
      canvas.height = size[0];
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "qrcode.png";
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      }
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Content (URL, text, etc.)</Label>
          <Input 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            placeholder="Enter text or URL..."
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Size (px)</Label>
            <span className="font-mono">{size[0]}px</span>
          </div>
          <Slider 
            value={size} 
            onValueChange={(val) => setSize(val as number[])} 
            min={128} 
            max={512} 
            step={8} 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Foreground Color</Label>
            <div className="flex gap-2 items-center">
              <input 
                type="color" 
                value={fgColor} 
                onChange={(e) => setFgColor(e.target.value)} 
                className="w-10 h-10 rounded border"
              />
              <Input 
                value={fgColor} 
                onChange={(e) => setFgColor(e.target.value)} 
                className="font-mono"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Background Color</Label>
            <div className="flex gap-2 items-center">
              <input 
                type="color" 
                value={bgColor} 
                onChange={(e) => setBgColor(e.target.value)} 
                className="w-10 h-10 rounded border"
              />
              <Input 
                value={bgColor} 
                onChange={(e) => setBgColor(e.target.value)} 
                className="font-mono"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Error Correction Level</Label>
          <select 
            value={level} 
            onChange={(e) => setLevel(e.target.value as "L" | "M" | "Q" | "H")}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="L">Low (~7%)</option>
            <option value="M">Medium (~15%)</option>
            <option value="Q">Quartile (~25%)</option>
            <option value="H">High (~30%)</option>
          </select>
        </div>
      </div>

      <div className="bg-muted/30 p-6 rounded-xl border flex flex-col items-center justify-center space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-sm inline-block">
          {value ? (
            <QRCodeSVG
              id="qr-code-svg"
              value={value}
              size={size[0]}
              fgColor={fgColor}
              bgColor={bgColor}
              level={level}
              includeMargin={false}
            />
          ) : (
            <div 
              style={{ width: size[0], height: size[0] }} 
              className="bg-muted flex items-center justify-center text-muted-foreground text-sm"
            >
              Enter content
            </div>
          )}
        </div>
        
        <Button onClick={downloadQR} disabled={!value} className="w-full max-w-[200px]">
          Download PNG
        </Button>
      </div>
    </div>
  );
}
