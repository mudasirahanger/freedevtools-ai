"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function Base64Encode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = (text: string) => {
    setInput(text);
    try {
      // Use standard btoa with unicode support via encodeURIComponent
      const encoded = btoa(unescape(encodeURIComponent(text)));
      setOutput(encoded);
    } catch {
      setOutput("Error: Unable to encode input.");
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label>Input Text</Label>
        <Textarea
          value={input}
          onChange={(e) => handleEncode(e.target.value)}
          placeholder="Type or paste text here to encode..."
          className="min-h-[300px] font-mono text-sm"
        />
        <Button variant="outline" onClick={() => handleEncode("")} className="w-full mt-2">
          <RefreshCw className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Base64 Encoded Output</Label>
        <Textarea
          value={output}
          readOnly
          placeholder="Base64 output will appear here..."
          className="min-h-[300px] font-mono text-sm bg-muted/50"
        />
        <Button variant="secondary" onClick={handleCopy} disabled={!output} className="w-full mt-2">
          <Copy className="mr-2 h-4 w-4" /> Copy Output
        </Button>
      </div>
    </div>
  );
}
