"use client";

import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRightLeft, Copy } from "lucide-react";
import { toast } from "sonner";

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

interface Line {
  indent: number;
  content: string;
}

function stripComment(raw: string): string {
  let inQuote: string | null = null;
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i];
    if (inQuote) {
      if (c === inQuote) inQuote = null;
      continue;
    }
    if (c === '"' || c === "'") {
      inQuote = c;
      continue;
    }
    if (c === "#" && (i === 0 || raw[i - 1] === " " || raw[i - 1] === "\t")) {
      return raw.slice(0, i);
    }
  }
  return raw;
}

function toLines(text: string): Line[] {
  const lines: Line[] = [];
  for (const raw of text.split("\n")) {
    const withoutComment = stripComment(raw).replace(/\t/g, "  ");
    if (withoutComment.trim() === "" || withoutComment.trim() === "---") continue;
    const indent = withoutComment.length - withoutComment.trimStart().length;
    lines.push({ indent, content: withoutComment.trim() });
  }
  return lines;
}

function findColon(content: string): number {
  let inQuote: string | null = null;
  for (let i = 0; i < content.length; i++) {
    const c = content[i];
    if (inQuote) {
      if (c === inQuote) inQuote = null;
      continue;
    }
    if (c === '"' || c === "'") {
      inQuote = c;
      continue;
    }
    if (c === ":" && (content[i + 1] === " " || content[i + 1] === undefined)) return i;
  }
  return -1;
}

function unquote(value: string): string {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}

function splitTopLevel(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  let inQuote: string | null = null;
  for (const c of text) {
    if (inQuote) {
      current += c;
      if (c === inQuote) inQuote = null;
      continue;
    }
    if (c === '"' || c === "'") {
      inQuote = c;
      current += c;
      continue;
    }
    if (c === "[" || c === "{") depth++;
    if (c === "]" || c === "}") depth--;
    if (c === "," && depth === 0) {
      parts.push(current);
      current = "";
      continue;
    }
    current += c;
  }
  if (current.trim()) parts.push(current);
  return parts;
}

function parseScalar(text: string): JsonValue {
  const trimmed = text.trim();
  if (trimmed === "") return null;
  if (trimmed === "null" || trimmed === "~") return null;
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed.startsWith('"') || trimmed.startsWith("'")) return unquote(trimmed);
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) return parseFlowArray(trimmed);
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) return parseFlowObject(trimmed);
  if (/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(trimmed)) return Number(trimmed);
  return trimmed;
}

function parseInlineOrScalar(text: string): JsonValue {
  const trimmed = text.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) return parseFlowArray(trimmed);
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) return parseFlowObject(trimmed);
  return parseScalar(trimmed);
}

function parseFlowArray(text: string): JsonValue[] {
  const inner = text.slice(1, -1).trim();
  if (!inner) return [];
  return splitTopLevel(inner).map((item) => parseInlineOrScalar(item.trim()));
}

function parseFlowObject(text: string): { [key: string]: JsonValue } {
  const inner = text.slice(1, -1).trim();
  const result: { [key: string]: JsonValue } = {};
  if (!inner) return result;
  for (const pair of splitTopLevel(inner)) {
    const idx = pair.indexOf(":");
    if (idx === -1) continue;
    result[unquote(pair.slice(0, idx).trim())] = parseInlineOrScalar(pair.slice(idx + 1).trim());
  }
  return result;
}

function parseYaml(text: string): JsonValue {
  const lines = toLines(text);
  if (lines.length === 0) return null;
  let pos = 0;

  function parseValue(indent: number): JsonValue {
    if (pos >= lines.length || lines[pos].indent < indent) return null;
    const line = lines[pos];
    if (line.content === "-" || line.content.startsWith("- ")) return parseSequence(line.indent);
    if (findColon(line.content) > -1) return parseMapping(line.indent);
    pos++;
    return parseScalar(line.content);
  }

  function parseSequence(indent: number): JsonValue[] {
    const result: JsonValue[] = [];
    while (pos < lines.length && lines[pos].indent === indent && (lines[pos].content === "-" || lines[pos].content.startsWith("- "))) {
      const content = lines[pos].content;
      const rest = content === "-" ? "" : content.slice(2).trim();
      if (rest === "") {
        pos++;
        result.push(pos < lines.length && lines[pos].indent > indent ? parseValue(lines[pos].indent) : null);
      } else if (findColon(rest) > -1) {
        const virtualIndent = indent + 2;
        lines[pos] = { indent: virtualIndent, content: rest };
        result.push(parseMapping(virtualIndent));
      } else {
        pos++;
        result.push(parseInlineOrScalar(rest));
      }
    }
    return result;
  }

  function parseMapping(indent: number): { [key: string]: JsonValue } {
    const result: { [key: string]: JsonValue } = {};
    while (pos < lines.length && lines[pos].indent === indent) {
      const content = lines[pos].content;
      if (content.startsWith("- ") || content === "-") break;
      const colonIndex = findColon(content);
      if (colonIndex === -1) break;
      const key = unquote(content.slice(0, colonIndex).trim());
      const rest = content.slice(colonIndex + 1).trim();
      pos++;
      if (rest === "") {
        result[key] = pos < lines.length && lines[pos].indent > indent ? parseValue(lines[pos].indent) : null;
      } else {
        result[key] = parseInlineOrScalar(rest);
      }
    }
    return result;
  }

  return parseValue(lines[0].indent);
}

function scalarToYaml(value: JsonValue): string {
  if (value === null) return "null";
  if (typeof value === "string") {
    if (
      value === "" ||
      /^\s|\s$/.test(value) ||
      /^(true|false|null|~|-?\d+(\.\d+)?)$/.test(value) ||
      /[:#{}[\],&*!|>'"%@`]/.test(value)
    ) {
      return JSON.stringify(value);
    }
    return value;
  }
  return String(value);
}

function toYaml(value: JsonValue, indent = 0): string {
  const pad = "  ".repeat(indent);

  if (value === null || typeof value !== "object") return scalarToYaml(value);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return value
      .map((item) => {
        if (item !== null && typeof item === "object") {
          const nested = toYaml(item, indent + 1);
          const [first, ...rest] = nested.split("\n");
          return [`${pad}- ${first.trimStart()}`, ...rest].join("\n");
        }
        return `${pad}- ${toYaml(item, indent)}`;
      })
      .join("\n");
  }

  const entries = Object.entries(value);
  if (entries.length === 0) return "{}";
  return entries
    .map(([key, val]) => {
      const safeKey = /^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(key) ? key : JSON.stringify(key);
      const isNonEmptyContainer =
        val !== null && typeof val === "object" && (Array.isArray(val) ? val.length > 0 : Object.keys(val).length > 0);
      if (isNonEmptyContainer) return `${pad}${safeKey}:\n${toYaml(val, indent + 1)}`;
      return `${pad}${safeKey}: ${toYaml(val, indent)}`;
    })
    .join("\n");
}

const SAMPLE_YAML = `name: freedevtools-ai
version: 1.0.1
services:
  - web
  - worker
config:
  debug: false
  timeout: 30`;

export default function YamlToJsonConverter() {
  const [input, setInput] = useState(SAMPLE_YAML);
  const [mode, setMode] = useState<"yaml2json" | "json2yaml">("yaml2json");

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: "", error: null };
    try {
      if (mode === "yaml2json") {
        const parsed = parseYaml(input);
        return { output: JSON.stringify(parsed, null, 2), error: null };
      }
      const parsed = JSON.parse(input) as JsonValue;
      return { output: toYaml(parsed), error: null };
    } catch (err) {
      return { output: "", error: (err as Error).message };
    }
  }, [input, mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "yaml2json" ? "json2yaml" : "yaml2json"));
    if (output) setInput(output);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-muted/50 p-2 rounded-lg border">
        <div className="font-semibold px-2">{mode === "yaml2json" ? "YAML to JSON" : "JSON to YAML"}</div>
        <Button variant="outline" size="sm" onClick={toggleMode}>
          <ArrowRightLeft className="w-4 h-4 mr-2" /> Switch Direction
        </Button>
      </div>

      {error && (
        <p className="text-destructive text-sm flex items-center gap-1">
          <AlertCircle className="w-4 h-4" /> {error}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Input {mode === "yaml2json" ? "YAML" : "JSON"}</Label>
          <Textarea className="font-mono text-xs h-[380px]" value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Output {mode === "yaml2json" ? "JSON" : "YAML"}</Label>
            <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!output}>
              <Copy className="w-4 h-4 mr-2" /> Copy
            </Button>
          </div>
          <Textarea className="font-mono text-xs h-[380px]" readOnly value={output} />
        </div>
      </div>
    </div>
  );
}
