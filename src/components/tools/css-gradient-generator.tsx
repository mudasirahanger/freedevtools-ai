"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";

export default function CssGradientGenerator() {
  const [color1, setColor1] = useState("#4ade80");
  const [color2, setColor2] = useState("#3b82f6");
  const [type, setType] = useState("linear");
  const [angle, setAngle] = useState(90);
  const [cssCode, setCssCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let code = "";
    if (type === "linear") {
      code = `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;
    } else {
      code = `background: radial-gradient(circle, ${color1}, ${color2});`;
    }
    const timeout = setTimeout(() => {
      setCssCode(code);
    }, 0);
    return () => clearTimeout(timeout);
  }, [color1, color2, type, angle]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div 
        className="w-full h-48 sm:h-64 rounded-xl border shadow-inner transition-all duration-300"
        style={{ background: cssCode.replace('background: ', '').replace(';', '') }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Gradient Type</Label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" value="linear" checked={type === "linear"} onChange={(e) => setType(e.target.value)} className="w-4 h-4 text-primary" />
                <span className="text-sm">Linear</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" value="radial" checked={type === "radial"} onChange={(e) => setType(e.target.value)} className="w-4 h-4 text-primary" />
                <span className="text-sm">Radial</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Color 1</Label>
              <div className="flex gap-2">
                <Input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-12 h-10 p-1" />
                <Input type="text" value={color1.toUpperCase()} onChange={(e) => setColor1(e.target.value)} className="uppercase font-mono" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Color 2</Label>
              <div className="flex gap-2">
                <Input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-12 h-10 p-1" />
                <Input type="text" value={color2.toUpperCase()} onChange={(e) => setColor2(e.target.value)} className="uppercase font-mono" />
              </div>
            </div>
          </div>

          {type === "linear" && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Angle</Label>
                <span className="text-sm text-muted-foreground">{angle}°</span>
              </div>
              <Input 
                type="range" 
                min="0" max="360" 
                value={angle} 
                onChange={(e) => setAngle(Number(e.target.value))} 
              />
            </div>
          )}
        </div>

        <div className="space-y-4 bg-muted/50 p-4 rounded-xl border">
          <div className="flex justify-between items-center">
            <Label>CSS Output</Label>
            <Button size="sm" onClick={handleCopy}>
              {copied ? "Copied!" : <><Copy className="w-4 h-4 mr-2" /> Copy CSS</>}
            </Button>
          </div>
          <code className="block p-4 bg-background rounded-md border font-mono text-sm break-all">
            {cssCode}
          </code>
        </div>
      </div>
    </div>
  );
}
