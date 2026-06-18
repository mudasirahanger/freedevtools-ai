"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState({ md5: "", sha1: "", sha256: "", sha512: "" });

  // Web Crypto API requires array buffers
  const generateHashes = async (text: string) => {
    setInput(text);
    if (!text) {
      setHashes({ md5: "", sha1: "", sha256: "", sha512: "" });
      return;
    }

    try {
      const msgUint8 = new TextEncoder().encode(text);
      
      const sha1Buf = await crypto.subtle.digest('SHA-1', msgUint8);
      const sha256Buf = await crypto.subtle.digest('SHA-256', msgUint8);
      const sha512Buf = await crypto.subtle.digest('SHA-512', msgUint8);
      
      // Basic MD5 implementation for client-side (crypto.subtle doesn't support MD5)
      // For a lightweight app, we will skip MD5 or use a simple polyfill if strictly needed, 
      // but let's inform the user it's deprecated and show SHA variants.
      // We will leave md5 empty and show a message
      
      const buf2hex = (buffer: ArrayBuffer) => {
        return Array.from(new Uint8Array(buffer))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      };

      setHashes({
        md5: "Not supported in native Web Crypto API (Insecure)",
        sha1: buf2hex(sha1Buf),
        sha256: buf2hex(sha256Buf),
        sha512: buf2hex(sha512Buf)
      });
    } catch {
      setHashes({ md5: "Error", sha1: "Error", sha256: "Error", sha512: "Error" });
    }
  };

  const handleCopy = (text: string, name: string) => {
    if (text && !text.includes("supported")) {
      navigator.clipboard.writeText(text);
      toast.success(`${name} copied to clipboard`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-2">
        <Label>Input Text</Label>
        <Textarea
          value={input}
          onChange={(e) => generateHashes(e.target.value)}
          placeholder="Type string to hash..."
          className="min-h-[300px] text-sm"
        />
        <Button variant="outline" onClick={() => generateHashes("")} className="w-full mt-2">
          <RefreshCw className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>SHA-256 (Recommended)</Label>
            <Button variant="ghost" size="sm" onClick={() => handleCopy(hashes.sha256, "SHA-256")}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Input readOnly value={hashes.sha256} className="font-mono text-xs bg-muted/50" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>SHA-512</Label>
            <Button variant="ghost" size="sm" onClick={() => handleCopy(hashes.sha512, "SHA-512")}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Input readOnly value={hashes.sha512} className="font-mono text-xs bg-muted/50" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>SHA-1</Label>
            <Button variant="ghost" size="sm" onClick={() => handleCopy(hashes.sha1, "SHA-1")}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Input readOnly value={hashes.sha1} className="font-mono text-xs bg-muted/50 text-muted-foreground" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>MD5</Label>
          </div>
          <Input readOnly value={hashes.md5} className="font-mono text-xs bg-muted/50 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
