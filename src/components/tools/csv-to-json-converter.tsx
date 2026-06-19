"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CsvToJsonConverter() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [mode, setMode] = useState<"csv2json" | "json2csv">("csv2json");
  const { toast } = useToast();

  const handleConvert = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      if (mode === "csv2json") {
        const result = Papa.parse(input, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
        });
        
        if (result.errors.length > 0) {
          toast({ 
            title: "CSV Parse Error", 
            description: result.errors[0].message, 
            variant: "destructive" 
          });
          return;
        }
        
        setOutput(JSON.stringify(result.data, null, 2));
      } else {
        const jsonData = JSON.parse(input);
        const csv = Papa.unparse(jsonData);
        setOutput(csv);
      }
    } catch (e: unknown) {
      const errMessage = e instanceof Error ? e.message : "Invalid input format.";
      toast({ 
        title: "Conversion Error", 
        description: errMessage, 
        variant: "destructive" 
      });
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === "csv2json" ? "json2csv" : "csv2json");
    setInput(output);
    setOutput("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast({ title: "Copied to clipboard!" });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-muted/50 p-2 rounded-lg border">
        <div className="font-semibold px-2">
          {mode === "csv2json" ? "CSV to JSON" : "JSON to CSV"}
        </div>
        <Button variant="outline" size="sm" onClick={toggleMode}>
          <ArrowRightLeft className="w-4 h-4 mr-2" /> Switch Direction
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">
              Input {mode === "csv2json" ? "CSV" : "JSON"}
            </label>
          </div>
          <Textarea 
            className="font-mono text-xs h-[400px]" 
            placeholder={mode === "csv2json" ? "id,name,email\n1,John,john@example.com" : '[\n  {\n    "id": 1,\n    "name": "John"\n  }\n]'} 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">
              Output {mode === "csv2json" ? "JSON" : "CSV"}
            </label>
            <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!output}>
              <Copy className="w-4 h-4 mr-2" /> Copy
            </Button>
          </div>
          <Textarea 
            className="font-mono text-xs h-[400px]" 
            readOnly 
            value={output}
          />
        </div>
      </div>
      
      <Button className="w-full" onClick={handleConvert}>
        Convert
      </Button>
    </div>
  );
}
