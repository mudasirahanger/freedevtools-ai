"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Trash2, FileUp } from "lucide-react";

export default function FileToBase64() {
  const [dataUri, setDataUri] = useState<string>("");
  const [rawBase64, setRawBase64] = useState<string>("");
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number; type: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedDataUri, setCopiedDataUri] = useState(false);
  const [copiedRaw, setCopiedRaw] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    // Max 10MB to avoid freezing the browser
    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large. Max file size is 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setDataUri(result);
      
      const parts = result.split(",");
      if (parts.length === 2) {
        setRawBase64(parts[1]);
      } else {
        setRawBase64(result);
      }

      setFileInfo({
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream"
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleCopyDataUri = () => {
    navigator.clipboard.writeText(dataUri);
    setCopiedDataUri(true);
    setTimeout(() => setCopiedDataUri(false), 2000);
  };

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(rawBase64);
    setCopiedRaw(true);
    setTimeout(() => setCopiedRaw(false), 2000);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div 
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${isDragging ? "border-primary bg-primary/10" : "border-border hover:bg-muted/50"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <FileUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold">Drag & Drop Any File Here</h3>
        <p className="text-sm text-muted-foreground mt-2">or click to browse files (Max 10MB)</p>
        <input 
          type="file" 
          className="hidden" 
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files?.[0]) handleFile(e.target.files[0]);
          }}
        />
      </div>

      {dataUri && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg border">
            <div className="text-sm">
              <p className="font-medium text-lg">{fileInfo?.name}</p>
              <p className="text-muted-foreground">{fileInfo ? formatBytes(fileInfo.size) : ""} • {fileInfo?.type}</p>
            </div>
            <Button variant="outline" onClick={() => { setDataUri(""); setRawBase64(""); setFileInfo(null); }}>
              <Trash2 className="w-4 h-4 mr-2" /> Clear
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Data URI (Base64 with Mime Type)</label>
              <Button size="sm" variant="secondary" onClick={handleCopyDataUri}>
                {copiedDataUri ? "Copied!" : <><Copy className="w-3 h-3 mr-2" /> Copy Data URI</>}
              </Button>
            </div>
            <Textarea 
              className="font-mono text-xs h-32" 
              readOnly 
              value={dataUri}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Raw Base64 String</label>
              <Button size="sm" variant="secondary" onClick={handleCopyRaw}>
                {copiedRaw ? "Copied!" : <><Copy className="w-3 h-3 mr-2" /> Copy Raw Base64</>}
              </Button>
            </div>
            <Textarea 
              className="font-mono text-xs h-40" 
              readOnly 
              value={rawBase64}
            />
          </div>
        </div>
      )}
    </div>
  );
}
