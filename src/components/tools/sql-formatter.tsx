"use client";

import { useState } from "react";
import { format } from "sql-formatter";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFormat = (text: string) => {
    setInput(text);
    if (!text.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    
    try {
      const formatted = format(text, {
        language: "sql",
        tabWidth: 2,
        keywordCase: "upper",
        linesBetweenQueries: 2,
      });
      setOutput(formatted);
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-2 flex flex-col h-full">
        <Label>Raw SQL Query</Label>
        <Textarea
          value={input}
          onChange={(e) => handleFormat(e.target.value)}
          placeholder="SELECT * FROM users WHERE id = 1"
          className="flex-1 min-h-[300px] font-mono text-sm"
        />
        <Button variant="outline" onClick={() => handleFormat("")} className="w-full mt-2">
          <RefreshCw className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>

      <div className="space-y-2 flex flex-col h-full">
        <Label>Formatted SQL</Label>
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
          placeholder="Formatted SQL will appear here..."
          className="flex-1 min-h-[300px] font-mono text-sm bg-muted/50"
        />
        <Button variant="secondary" onClick={handleCopy} disabled={!output} className="w-full mt-2">
          <Copy className="mr-2 h-4 w-4" /> Copy Output
        </Button>
      </div>
    </div>
  );
}
