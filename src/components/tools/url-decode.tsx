"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function UrlDecode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleDecode = (text: string) => {
    setInput(text);
    try {
      const decoded = decodeURIComponent(text);
      setOutput(decoded);
    } catch {
      setOutput("Error: Invalid URL encoding.");
    }
  };

  const handleCopy = () => {
    if (output && !output.startsWith("Error:")) {
      navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label>URL Encoded Input</Label>
        <Textarea
          value={input}
          onChange={(e) => handleDecode(e.target.value)}
          placeholder="Paste URL encoded string here..."
          className="min-h-[300px] font-mono text-sm"
        />
        <Button variant="outline" onClick={() => handleDecode("")} className="w-full mt-2">
          <RefreshCw className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Decoded Output Text</Label>
        <Textarea
          value={output}
          readOnly
          placeholder="Decoded text will appear here..."
          className={`min-h-[300px] font-mono text-sm bg-muted/50 break-all ${output.startsWith("Error:") ? "text-destructive" : ""}`}
        />
        <Button variant="secondary" onClick={handleCopy} disabled={!output || output.startsWith("Error:")} className="w-full mt-2">
          <Copy className="mr-2 h-4 w-4" /> Copy Output
        </Button>
      </div>
    </div>
  );
}
