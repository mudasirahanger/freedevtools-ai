"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function SlugGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = (text: string) => {
    setInput(text);
    const slug = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // remove non-word chars
      .replace(/[\s_-]+/g, '-') // swap spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // remove leading/trailing hyphens
    setOutput(slug);
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
          onChange={(e) => handleGenerate(e.target.value)}
          placeholder="Type title or phrase here..."
          className="min-h-[300px] text-sm"
        />
        <Button variant="outline" onClick={() => handleGenerate("")} className="w-full mt-2">
          <RefreshCw className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>

      <div className="space-y-2">
        <Label>URL Friendly Slug</Label>
        <Textarea
          value={output}
          readOnly
          placeholder="your-url-friendly-slug"
          className="min-h-[300px] font-mono text-sm bg-muted/50"
        />
        <Button variant="secondary" onClick={handleCopy} disabled={!output} className="w-full mt-2">
          <Copy className="mr-2 h-4 w-4" /> Copy Slug
        </Button>
      </div>
    </div>
  );
}
