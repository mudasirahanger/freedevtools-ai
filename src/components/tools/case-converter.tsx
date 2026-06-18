"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function CaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeCase, setActiveCase] = useState("");

  const handleConvert = (type: string) => {
    setActiveCase(type);
    if (!input) {
      setOutput("");
      return;
    }

    let result = "";
    switch (type) {
      case "lower":
        result = input.toLowerCase();
        break;
      case "upper":
        result = input.toUpperCase();
        break;
      case "title":
        result = input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        break;
      case "sentence":
        result = input.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case "camel":
        result = input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
        break;
      case "pascal":
        result = input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase()).replace(/\s+/g, '');
        break;
      case "snake":
        result = input.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/).map(word => word.toLowerCase()).join('_');
        break;
      case "kebab":
        result = input.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/).map(word => word.toLowerCase()).join('-');
        break;
      default:
        result = input;
    }
    setOutput(result);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (activeCase) {
      // Defer state update slightly so the switch runs on new input
      setTimeout(() => handleConvert(activeCase), 0);
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button variant={activeCase === "sentence" ? "default" : "outline"} onClick={() => handleConvert("sentence")}>Sentence case</Button>
        <Button variant={activeCase === "lower" ? "default" : "outline"} onClick={() => handleConvert("lower")}>lowercase</Button>
        <Button variant={activeCase === "upper" ? "default" : "outline"} onClick={() => handleConvert("upper")}>UPPERCASE</Button>
        <Button variant={activeCase === "title" ? "default" : "outline"} onClick={() => handleConvert("title")}>Title Case</Button>
        <Button variant={activeCase === "camel" ? "default" : "outline"} onClick={() => handleConvert("camel")}>camelCase</Button>
        <Button variant={activeCase === "pascal" ? "default" : "outline"} onClick={() => handleConvert("pascal")}>PascalCase</Button>
        <Button variant={activeCase === "snake" ? "default" : "outline"} onClick={() => handleConvert("snake")}>snake_case</Button>
        <Button variant={activeCase === "kebab" ? "default" : "outline"} onClick={() => handleConvert("kebab")}>kebab-case</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Input Text</Label>
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Type or paste text here..."
            className="min-h-[300px] text-sm"
          />
          <Button variant="outline" onClick={() => { setInput(""); setOutput(""); setActiveCase(""); }} className="w-full mt-2">
            <RefreshCw className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Converted Output</Label>
          <Textarea
            value={output}
            readOnly
            placeholder="Converted text will appear here..."
            className="min-h-[300px] text-sm bg-muted/50"
          />
          <Button variant="secondary" onClick={handleCopy} disabled={!output} className="w-full mt-2">
            <Copy className="mr-2 h-4 w-4" /> Copy Output
          </Button>
        </div>
      </div>
    </div>
  );
}
