"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";

export default function WordCounter() {
  const [input, setInput] = useState("");

  const countWords = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  };

  const countCharacters = (text: string) => text.length;
  const countCharactersNoSpaces = (text: string) => text.replace(/\s/g, '').length;
  
  const countParagraphs = (text: string) => {
    if (!text.trim()) return 0;
    return text.split(/\n+/).filter(p => p.trim().length > 0).length;
  };

  const countSentences = (text: string) => {
    if (!text.trim()) return 0;
    return text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-muted/30 p-4 rounded-lg border text-center">
          <div className="text-3xl font-bold">{countWords(input)}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Words</div>
        </div>
        <div className="bg-muted/30 p-4 rounded-lg border text-center">
          <div className="text-3xl font-bold">{countCharacters(input)}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Characters</div>
        </div>
        <div className="bg-muted/30 p-4 rounded-lg border text-center">
          <div className="text-3xl font-bold">{countCharactersNoSpaces(input)}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">No Spaces</div>
        </div>
        <div className="bg-muted/30 p-4 rounded-lg border text-center">
          <div className="text-3xl font-bold">{countSentences(input)}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Sentences</div>
        </div>
        <div className="bg-muted/30 p-4 rounded-lg border text-center col-span-2 md:col-span-1">
          <div className="text-3xl font-bold">{countParagraphs(input)}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Paragraphs</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Input Text</Label>
          <Button variant="ghost" size="sm" onClick={() => setInput("")} className="h-8">
            <RefreshCw className="mr-2 h-3 w-3" /> Clear
          </Button>
        </div>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Start typing or pasting your text here..."
          className="min-h-[400px] text-base"
        />
      </div>
    </div>
  );
}
