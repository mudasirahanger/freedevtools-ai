"use client";

import React, { useState, useEffect } from "react";
import { optimize } from "svgo/browser";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Upload, Trash2 } from "lucide-react";

export default function SvgOptimizer() {
  const [inputSvg, setInputSvg] = useState<string>("");
  const [outputSvg, setOutputSvg] = useState<string>("");
  const [savings, setSavings] = useState<{ original: number; optimized: number; percent: number } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const processSvg = async () => {
      if (!inputSvg.trim()) {
        setOutputSvg("");
        setSavings(null);
        return;
      }

    try {
      // SVGO browser version
      const result = optimize(inputSvg, {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        ],
      });
      setOutputSvg(result.data);
      
      const origSize = new Blob([inputSvg]).size;
      const optSize = new Blob([result.data]).size;
      const percent = origSize > 0 ? ((origSize - optSize) / origSize) * 100 : 0;
      
      setSavings({
        original: origSize,
        optimized: optSize,
        percent: parseFloat(percent.toFixed(2)),
      });
    } catch {
      // Ignore svgo parsing errors during typing
    }
  };
    
    // Process asynchronously to avoid synchronous setState during render
    const timeout = setTimeout(() => {
      try {
        processSvg();
      } catch {
        // Don't show error immediately on typing invalid SVG
      }
    }, 0);
    
    return () => clearTimeout(timeout);
  }, [inputSvg]);

  const handleCopy = () => {
    navigator.clipboard.writeText(outputSvg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setInputSvg(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <label htmlFor="svg-upload" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
            <Upload className="w-4 h-4 mr-2" />
            Upload SVG
          </label>
          <input
            id="svg-upload"
            type="file"
            accept=".svg"
            className="hidden"
            onChange={handleFileUpload}
          />
          <Button variant="outline" onClick={() => setInputSvg("")}>
            <Trash2 className="w-4 h-4 mr-2" /> Clear
          </Button>
        </div>
        {savings && (
          <div className="text-sm">
            <span className="font-semibold text-green-600 dark:text-green-400">Saved {savings.percent}%</span> 
            <span className="text-muted-foreground ml-2">({formatBytes(savings.original)} → {formatBytes(savings.optimized)})</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Input SVG</label>
          <Textarea 
            className="font-mono text-xs h-64 lg:h-96" 
            placeholder="Paste raw SVG code here..." 
            value={inputSvg}
            onChange={(e) => setInputSvg(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Optimized Output</label>
            <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!outputSvg}>
              {copied ? "Copied!" : <><Copy className="w-4 h-4 mr-2" /> Copy</>}
            </Button>
          </div>
          <Textarea 
            className="font-mono text-xs h-64 lg:h-96" 
            readOnly 
            value={outputSvg}
          />
        </div>
      </div>
      
      {outputSvg && (
        <div className="mt-4 border rounded-md p-4 bg-muted/30 flex items-center justify-center">
          <div dangerouslySetInnerHTML={{ __html: outputSvg }} className="max-w-[200px] max-h-[200px]" />
        </div>
      )}
    </div>
  );
}
