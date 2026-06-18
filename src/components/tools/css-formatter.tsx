"use client";

import { useState } from "react";
import js_beautify from "js-beautify";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function CssFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleFormat = (text: string) => {
    setInput(text);
    if (!text.trim()) {
      setOutput("");
      return;
    }
    
    try {
      const formatted = js_beautify.css(text, {
        indent_size: 2,
      });
      setOutput(formatted);
    } catch {
      setOutput("Error formatting CSS");
    }
  };

  const handleCopy = () => {
    if (output && output !== "Error formatting CSS") {
      navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-2 flex flex-col h-full">
        <Label>Raw CSS</Label>
        <Textarea
          value={input}
          onChange={(e) => handleFormat(e.target.value)}
          placeholder="body{margin:0;padding:0;}"
          className="flex-1 min-h-[300px] font-mono text-sm"
        />
        <Button variant="outline" onClick={() => handleFormat("")} className="w-full mt-2">
          <RefreshCw className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>

      <div className="space-y-2 flex flex-col h-full">
        <Label>Formatted CSS</Label>
        <Textarea
          value={output}
          readOnly
          placeholder="Formatted CSS will appear here..."
          className="flex-1 min-h-[300px] font-mono text-sm bg-muted/50"
        />
        <Button variant="secondary" onClick={handleCopy} disabled={!output || output === "Error formatting CSS"} className="w-full mt-2">
          <Copy className="mr-2 h-4 w-4" /> Copy Output
        </Button>
      </div>
    </div>
  );
}
