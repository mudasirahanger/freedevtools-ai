"use client";

import { useState } from "react";
import js_beautify from "js-beautify";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function HtmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleFormat = (text: string) => {
    setInput(text);
    if (!text.trim()) {
      setOutput("");
      return;
    }
    
    try {
      const formatted = js_beautify.html(text, {
        indent_size: 2,
        wrap_line_length: 80,
        preserve_newlines: true,
        max_preserve_newlines: 2
      });
      setOutput(formatted);
    } catch {
      setOutput("Error formatting HTML");
    }
  };

  const handleCopy = () => {
    if (output && output !== "Error formatting HTML") {
      navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-2 flex flex-col h-full">
        <Label>Raw HTML</Label>
        <Textarea
          value={input}
          onChange={(e) => handleFormat(e.target.value)}
          placeholder="<div><p>Raw HTML here</p></div>"
          className="flex-1 min-h-[300px] font-mono text-sm"
        />
        <Button variant="outline" onClick={() => handleFormat("")} className="w-full mt-2">
          <RefreshCw className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>

      <div className="space-y-2 flex flex-col h-full">
        <Label>Formatted HTML</Label>
        <Textarea
          value={output}
          readOnly
          placeholder="Formatted HTML will appear here..."
          className="flex-1 min-h-[300px] font-mono text-sm bg-muted/50"
        />
        <Button variant="secondary" onClick={handleCopy} disabled={!output || output === "Error formatting HTML"} className="w-full mt-2">
          <Copy className="mr-2 h-4 w-4" /> Copy Output
        </Button>
      </div>
    </div>
  );
}
