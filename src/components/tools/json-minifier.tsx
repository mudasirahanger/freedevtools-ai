"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function JsonMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleMinify = (text: string) => {
    setInput(text);
    if (!text.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    
    try {
      const parsed = JSON.parse(text);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (err) {
      setOutput("");
      setError((err as Error).message);
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
      <div className="space-y-2 flex flex-col h-full">
        <Label>JSON Input</Label>
        <Textarea
          value={input}
          onChange={(e) => handleMinify(e.target.value)}
          placeholder="Paste your JSON here to minify..."
          className="flex-1 min-h-[300px] font-mono text-sm"
        />
        <Button variant="outline" onClick={() => handleMinify("")} className="w-full mt-2">
          <RefreshCw className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>

      <div className="space-y-2 flex flex-col h-full">
        <Label>Minified Output</Label>
        {error ? (
          <Alert variant="destructive" className="mb-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="font-mono text-xs break-all">
              {error}
            </AlertDescription>
          </Alert>
        ) : null}
        <Textarea
          value={output}
          readOnly
          placeholder="Minified JSON will appear here..."
          className="flex-1 min-h-[300px] font-mono text-sm bg-muted/50"
        />
        <Button variant="secondary" onClick={handleCopy} disabled={!output} className="w-full mt-2">
          <Copy className="mr-2 h-4 w-4" /> Copy Output
        </Button>
      </div>
    </div>
  );
}
