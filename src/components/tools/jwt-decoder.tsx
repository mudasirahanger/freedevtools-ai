"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function JwtDecoder() {
  const [input, setInput] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleDecode = (token: string) => {
    setInput(token);
    if (!token.trim()) {
      setHeader("");
      setPayload("");
      setError(null);
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format. Must contain 3 parts separated by dots.");
      }

      // Base64URL decode function
      const decodeBase64Url = (str: string) => {
        str = str.replace(/-/g, '+').replace(/_/g, '/');
        while (str.length % 4) {
          str += '=';
        }
        return decodeURIComponent(escape(atob(str)));
      };

      const decodedHeader = JSON.stringify(JSON.parse(decodeBase64Url(parts[0])), null, 2);
      const decodedPayload = JSON.stringify(JSON.parse(decodeBase64Url(parts[1])), null, 2);

      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setError(null);
    } catch (err) {
      setHeader("");
      setPayload("");
      setError((err as Error).message || "Invalid JWT or corrupted data.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2 flex flex-col h-full">
        <Label>JWT String</Label>
        <Textarea
          value={input}
          onChange={(e) => handleDecode(e.target.value)}
          placeholder="Paste JWT here (ey...)"
          className="flex-1 min-h-[300px] font-mono text-sm break-all"
        />
        <Button variant="outline" onClick={() => handleDecode("")} className="w-full mt-2">
          <RefreshCw className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>

      <div className="space-y-4 flex flex-col h-full">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs break-all">{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2 flex-1">
          <Label className="text-destructive font-semibold">Header (Algorithm & Token Type)</Label>
          <Textarea
            value={header}
            readOnly
            placeholder="Decoded header..."
            className="h-32 font-mono text-sm bg-destructive/10 border-destructive/20 text-destructive"
          />
        </div>

        <div className="space-y-2 flex-[2]">
          <Label className="text-primary font-semibold">Payload (Data)</Label>
          <Textarea
            value={payload}
            readOnly
            placeholder="Decoded payload..."
            className="h-64 font-mono text-sm bg-primary/10 border-primary/20 text-primary"
          />
        </div>
        
        <div className="text-xs text-muted-foreground italic">
          Note: Signature is not verified client-side. This tool only decodes the Base64URL encoded header and payload.
        </div>
      </div>
    </div>
  );
}
