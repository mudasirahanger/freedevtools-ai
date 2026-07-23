"use client";

import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy } from "lucide-react";
import { toast } from "sonner";

type Unit = "paragraphs" | "sentences" | "words";

const WORD_BANK = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
  "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim",
  "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip",
  "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat",
  "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim",
  "id", "est", "laborum", "perspiciatis", "unde", "omnis", "iste", "natus", "error", "voluptatem",
  "accusantium", "doloremque", "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae",
  "ab", "illo", "inventore", "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta", "explicabo",
];

function randomWord(): string {
  return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function generateSentence(startWithLorem = false): string {
  const length = 6 + Math.floor(Math.random() * 10);
  const words = Array.from({ length }, () => randomWord());
  if (startWithLorem) {
    words[0] = "lorem";
    if (words.length > 1) words[1] = "ipsum";
    if (words.length > 2) words[2] = "dolor";
    if (words.length > 3) words[3] = "sit";
    if (words.length > 4) words[4] = "amet";
  }
  const sentence = words.join(" ");
  return `${capitalize(sentence)}.`;
}

function generateParagraph(sentenceCount: number, startWithLorem = false): string {
  return Array.from({ length: sentenceCount }, (_, i) => generateSentence(startWithLorem && i === 0)).join(" ");
}

function generate(unit: Unit, count: number, startWithLorem: boolean): string {
  if (unit === "words") {
    const words = Array.from({ length: count }, () => randomWord());
    if (startWithLorem && count > 0) words[0] = "Lorem";
    return words.join(" ");
  }
  if (unit === "sentences") {
    return Array.from({ length: count }, (_, i) => generateSentence(startWithLorem && i === 0)).join(" ");
  }
  const sentencesPerParagraph = 5;
  return Array.from({ length: count }, (_, i) => generateParagraph(sentencesPerParagraph, startWithLorem && i === 0)).join("\n\n");
}

export default function LoremIpsumGenerator() {
  const [unit, setUnit] = useState<Unit>("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [seed, setSeed] = useState(0);

  const output = useMemo(() => {
    return generate(unit, Math.min(Math.max(count, 1), 500), startWithLorem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit, count, startWithLorem, seed]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div className="space-y-2">
          <Label>Generate</Label>
          <Select value={unit} onValueChange={(val: string | null) => { if (val) setUnit(val as Unit); }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraphs">Paragraphs</SelectItem>
              <SelectItem value="sentences">Sentences</SelectItem>
              <SelectItem value="words">Words</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Count</Label>
          <Input
            type="number"
            min={1}
            max={500}
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 1)}
          />
        </div>
        <div className="flex items-center gap-2 pb-2">
          <Checkbox
            id="start-lorem"
            checked={startWithLorem}
            onCheckedChange={(c: boolean | string) => setStartWithLorem(c as boolean)}
          />
          <Label htmlFor="start-lorem" className="cursor-pointer">
            Start with &quot;Lorem ipsum dolor sit amet&quot;
          </Label>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setSeed((s) => s + 1)}>
          Regenerate
        </Button>
        <Button variant="ghost" size="sm" onClick={handleCopy}>
          <Copy className="w-4 h-4 mr-2" /> Copy
        </Button>
      </div>

      <Textarea className="min-h-[350px] text-base" readOnly value={output} />
    </div>
  );
}
