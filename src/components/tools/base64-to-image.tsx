"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, Trash2, Image as ImageIcon } from "lucide-react";

export default function Base64ToImage() {
  const [base64Input, setBase64Input] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleGenerate = () => {
    setError("");
    setImageUrl("");

    if (!base64Input.trim()) {
      setError("Please enter a Base64 string.");
      return;
    }

    let cleanBase64 = base64Input.trim();
    // Check if it already has data URI prefix, if not, try adding a generic one
    if (!cleanBase64.startsWith("data:image")) {
      // Remove any non-base64 characters just in case it was copied with spaces/newlines
      cleanBase64 = cleanBase64.replace(/\s/g, "");
      cleanBase64 = `data:image/png;base64,${cleanBase64}`;
    }

    // Basic validation
    try {
      const parts = cleanBase64.split(",");
      if (parts.length === 2) {
        atob(parts[1]); // Test decoding
        setImageUrl(cleanBase64);
      } else {
        setError("Invalid Base64 format.");
      }
    } catch (e) {
      setError("Invalid Base64 string. Cannot decode.");
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "decoded-image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Base64 Image String</label>
        <Textarea
          placeholder="Paste your Base64 string here (e.g., iVBORw0KGgo... or data:image/png;base64,...)"
          className="font-mono text-xs h-40"
          value={base64Input}
          onChange={(e) => setBase64Input(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleGenerate}>
          <ImageIcon className="w-4 h-4 mr-2" /> Generate Image
        </Button>
        <Button variant="outline" onClick={() => { setBase64Input(""); setImageUrl(""); setError(""); }}>
          <Trash2 className="w-4 h-4 mr-2" /> Clear
        </Button>
      </div>

      {error && (
        <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
          {error}
        </div>
      )}

      {imageUrl && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Image Preview</h3>
            <Button onClick={handleDownload} variant="secondary">
              <Download className="w-4 h-4 mr-2" /> Download Image
            </Button>
          </div>
          <div className="border rounded-lg p-4 bg-muted/30 flex items-center justify-center min-h-[300px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="Decoded Base64 preview" className="max-w-full max-h-[600px] object-contain shadow-sm rounded border" />
          </div>
        </div>
      )}
    </div>
  );
}
