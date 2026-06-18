"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleFormat = () => {
    try {
      if (!input.trim()) {
        setOutput("");
        setError("");
        return;
      }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (err: unknown) {
      setError((err as Error).message || "Invalid JSON");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast("Copied to clipboard");
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Input JSON</label>
          <Textarea
            placeholder="Paste your JSON here..."
            className="font-mono min-h-[300px] text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center h-5">
            <label className="text-sm font-medium">Output</label>
            {error && <span className="text-destructive text-xs">{error}</span>}
          </div>
          <Textarea
            readOnly
            className={`font-mono min-h-[300px] text-sm ${error ? 'border-destructive' : ''}`}
            value={output}
            placeholder={error ? "Fix the errors in input to see formatted JSON." : "Formatted JSON will appear here..."}
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 justify-between">
        <div className="flex gap-2">
          <Button onClick={handleFormat}>Format JSON</Button>
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>
        <Button variant="secondary" onClick={handleCopy} disabled={!output}>
          <Copy className="mr-2 h-4 w-4" /> Copy Output
        </Button>
      </div>
    </div>
  );
}
