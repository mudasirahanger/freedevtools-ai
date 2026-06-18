"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function Base64Decode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleDecode = (text: string) => {
    setInput(text);
    if (!text.trim()) {
      setOutput("");
      return;
    }
    
    try {
      const decoded = decodeURIComponent(escape(atob(text.trim())));
      setOutput(decoded);
    } catch {
      setOutput("Invalid Base64 string.");
    }
  };

  const handleCopy = () => {
    if (output && output !== "Invalid Base64 string.") {
      navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label>Base64 Input</Label>
        <Textarea
          value={input}
          onChange={(e) => handleDecode(e.target.value)}
          placeholder="Paste Base64 string here to decode..."
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
          className={`min-h-[300px] font-mono text-sm bg-muted/50 ${output === "Invalid Base64 string." ? "text-destructive" : ""}`}
        />
        <Button variant="secondary" onClick={handleCopy} disabled={!output || output === "Invalid Base64 string."} className="w-full mt-2">
          <Copy className="mr-2 h-4 w-4" /> Copy Output
        </Button>
      </div>
    </div>
  );
}
