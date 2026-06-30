"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Code2 } from "lucide-react";
import { toast } from "sonner";

export default function OpenapiToTs() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!input) {
      toast.error("Please provide an OpenAPI schema.");
      return;
    }
    // Very basic placeholder. In reality, you'd use a package like openapi-typescript
    setOutput(`// Generated TypeScript from OpenAPI
export interface Schema {
  // Placeholder for generated types
  [key: string]: any;
}
`);
    toast.success("Types generated! (Mock implementation)");
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast("Copied to clipboard");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>OpenAPI Schema (JSON or YAML)</Label>
            <Textarea
              className="h-[300px] font-mono text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your OpenAPI 3.0 or Swagger 2.0 schema here..."
            />
          </div>
          <Button onClick={handleGenerate} className="w-full">
            <Code2 className="mr-2 h-4 w-4" /> Generate Types
          </Button>
        </div>

        <div className="space-y-2 h-full flex flex-col">
          <Label>TypeScript Output</Label>
          <Textarea
            readOnly
            className="flex-1 min-h-[300px] font-mono text-sm bg-muted/50"
            value={output}
            placeholder="Generated TypeScript interfaces will appear here."
          />
          <Button variant="secondary" onClick={handleCopy} disabled={!output} className="w-full">
            <Copy className="mr-2 h-4 w-4" /> Copy Code
          </Button>
        </div>
      </div>
    </div>
  );
}
