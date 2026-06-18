"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Wand2 } from "lucide-react";
import { toast } from "sonner";

interface GenericAIPromptProps {
  fields: { id: string; label: string; placeholder: string; isTextarea?: boolean; required?: boolean }[];
  generatePrompt: (values: Record<string, string>) => string;
}

export default function GenericAIPrompt({ fields, generatePrompt }: GenericAIPromptProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");

  const handleChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenerate = () => {
    // Check required
    for (const field of fields) {
      if (field.required && !values[field.id]?.trim()) {
        toast.error(`${field.label} is required`);
        return;
      }
    }

    const prompt = generatePrompt(values);
    setOutput(prompt);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast("Copied to clipboard");
    }
  };

  const handleReset = () => {
    setValues({});
    setOutput("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label} {field.required && "*"}</Label>
              {field.isTextarea ? (
                <Textarea 
                  id={field.id} 
                  placeholder={field.placeholder} 
                  className="h-24"
                  value={values[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              ) : (
                <Input 
                  id={field.id} 
                  placeholder={field.placeholder} 
                  value={values[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}
            </div>
          ))}

          <div className="flex gap-2 pt-2">
            <Button onClick={handleGenerate} className="w-full">
              <Wand2 className="mr-2 h-4 w-4" /> Generate Prompt
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2 h-full flex flex-col">
          <Label>Generated Prompt</Label>
          <Textarea
            readOnly
            className="flex-1 min-h-[300px] font-mono text-sm bg-muted/50"
            value={output}
            placeholder="Your generated AI prompt will appear here. Copy and paste it into ChatGPT, Claude, or any other AI tool."
          />
          <Button variant="secondary" onClick={handleCopy} disabled={!output} className="w-full">
            <Copy className="mr-2 h-4 w-4" /> Copy Prompt
          </Button>
        </div>
      </div>
    </div>
  );
}
