"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Copy } from "lucide-react";
import { toast } from "sonner";

type Base = 2 | 8 | 10 | 16;

const BASE_LABELS: Record<Base, string> = {
  2: "Binary (base 2)",
  8: "Octal (base 8)",
  10: "Decimal (base 10)",
  16: "Hexadecimal (base 16)",
};

const VALID_CHARS: Record<Base, RegExp> = {
  2: /^[01]+$/,
  8: /^[0-7]+$/,
  10: /^[0-9]+$/,
  16: /^[0-9a-fA-F]+$/,
};

function ResultRow({ label, value, onCopy }: { label: string; value: string; onCopy: () => void }) {
  return (
    <div className="flex items-center justify-between bg-muted/30 border rounded-lg p-3">
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="font-mono text-lg break-all">{value || "-"}</div>
      </div>
      <Button variant="ghost" size="sm" onClick={onCopy} disabled={!value}>
        <Copy className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default function NumberBaseConverter() {
  const [input, setInput] = useState("255");
  const [inputBase, setInputBase] = useState<Base>(10);

  const { results, error } = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return { results: null, error: null };
    if (!VALID_CHARS[inputBase].test(trimmed)) {
      return { results: null, error: `"${trimmed}" is not a valid ${BASE_LABELS[inputBase].toLowerCase()} number.` };
    }
    try {
      const asBigInt = BigInt(inputBase === 10 ? trimmed : `0${inputBase === 2 ? "b" : inputBase === 8 ? "o" : "x"}${trimmed}`);
      return {
        results: {
          2: asBigInt.toString(2),
          8: asBigInt.toString(8),
          10: asBigInt.toString(10),
          16: asBigInt.toString(16).toUpperCase(),
        },
        error: null,
      };
    } catch {
      return { results: null, error: "Number is too large or invalid to convert." };
    }
  }, [input, inputBase]);

  const handleCopy = (value: string) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <Label>Number</Label>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono text-lg"
            placeholder="Enter a number"
          />
        </div>
        <div className="space-y-2 w-full sm:w-56">
          <Label>Input Base</Label>
          <Select value={String(inputBase)} onValueChange={(val: string | null) => { if (val) setInputBase(Number(val) as Base); }}>
            <SelectTrigger>
              <SelectValue placeholder="Select base" />
            </SelectTrigger>
            <SelectContent>
              {([2, 8, 10, 16] as Base[]).map((base) => (
                <SelectItem key={base} value={String(base)}>
                  {BASE_LABELS[base]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <p className="text-destructive text-sm flex items-center gap-1">
          <AlertCircle className="w-4 h-4" /> {error}
        </p>
      )}

      {results && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ResultRow label="Binary" value={results[2]} onCopy={() => handleCopy(results[2])} />
          <ResultRow label="Octal" value={results[8]} onCopy={() => handleCopy(results[8])} />
          <ResultRow label="Decimal" value={results[10]} onCopy={() => handleCopy(results[10])} />
          <ResultRow label="Hexadecimal" value={results[16]} onCopy={() => handleCopy(results[16])} />
        </div>
      )}
    </div>
  );
}
