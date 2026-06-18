"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Wand2 } from "lucide-react";
import { toast } from "sonner";

export default function AICodingPromptGenerator() {
  const [language, setLanguage] = useState("");
  const [task, setTask] = useState("");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!language || !task) {
      toast.error("Language and task are required");
      return;
    }

    const prompt = `Act as an expert software developer specializing in ${language}.
Your task is to: ${task}

${context ? `Additional Context:\n${context}\n` : ""}
Please provide:
1. Clean, well-commented, and optimized code.
2. A brief explanation of how the code works.
3. Any necessary instructions on how to run or test the code.
Ensure the code follows best practices for ${language}.`;

    setOutput(prompt);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast("Copied to clipboard");
    }
  };

  const handleReset = () => {
    setLanguage("");
    setTask("");
    setContext("");
    setOutput("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Programming Language *</Label>
            <Input 
              id="language" 
              placeholder="e.g. Python, TypeScript, Rust" 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="task">Task Description *</Label>
            <Textarea 
              id="task" 
              placeholder="e.g. Write a function to fetch user data from an API with retry logic" 
              className="h-24"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="context">Additional Context (Optional)</Label>
            <Textarea 
              id="context" 
              placeholder="e.g. I am using React and Axios. Error handling is very important." 
              className="h-24"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>

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
