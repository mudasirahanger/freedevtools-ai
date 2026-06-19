"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Trash2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImageToBase64() {
  const [base64, setBase64] = useState<string>("");
  const [imageInfo, setImageInfo] = useState<{ name: string; size: number; type: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please select an image file.", variant: "destructive" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max image size is 5MB.", variant: "destructive" });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setBase64(e.target?.result as string);
      setImageInfo({
        name: file.name,
        size: file.size,
        type: file.type
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

  const handleCopy = () => {
    navigator.clipboard.writeText(base64);
    toast({ title: "Copied Base64 to clipboard!" });
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
        <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold">Drag & Drop Image Here</h3>
        <p className="text-sm text-muted-foreground mt-2">or click to browse files (Max 5MB)</p>
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files?.[0]) handleFile(e.target.files[0]);
          }}
        />
      </div>

      {base64 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 rounded overflow-hidden bg-muted flex items-center justify-center relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={base64} alt="Preview" className="max-w-full max-h-full object-contain" />
              </div>
              <div className="text-sm">
                <p className="font-medium">{imageInfo?.name}</p>
                <p className="text-muted-foreground">{imageInfo ? formatBytes(imageInfo.size) : ""} • {imageInfo?.type}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { setBase64(""); setImageInfo(null); }}>
                <Trash2 className="w-4 h-4 mr-2" /> Clear
              </Button>
              <Button onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" /> Copy
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Base64 Output (Data URI)</label>
            <Textarea 
              className="font-mono text-xs h-64" 
              readOnly 
              value={base64}
            />
          </div>
        </div>
      )}
    </div>
  );
}
