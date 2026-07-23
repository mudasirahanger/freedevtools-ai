"use client";

import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, MinusCircle, PlusCircle, RefreshCcw } from "lucide-react";

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

interface DiffEntry {
  path: string;
  kind: "added" | "removed" | "changed";
  left?: JsonValue;
  right?: JsonValue;
}

function isPlainObject(value: JsonValue): value is { [key: string]: JsonValue } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function formatValue(value: JsonValue | undefined): string {
  if (value === undefined) return "undefined";
  if (typeof value === "string") return `"${value}"`;
  if (isPlainObject(value) || Array.isArray(value)) return JSON.stringify(value);
  return String(value);
}

function diffValues(left: JsonValue, right: JsonValue, path: string, out: DiffEntry[]) {
  if (isPlainObject(left) && isPlainObject(right)) {
    const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
    for (const key of keys) {
      const childPath = path ? `${path}.${key}` : key;
      if (!(key in left)) {
        out.push({ path: childPath, kind: "added", right: right[key] });
      } else if (!(key in right)) {
        out.push({ path: childPath, kind: "removed", left: left[key] });
      } else {
        diffValues(left[key], right[key], childPath, out);
      }
    }
    return;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    const maxLength = Math.max(left.length, right.length);
    for (let i = 0; i < maxLength; i++) {
      const childPath = `${path}[${i}]`;
      if (i >= left.length) {
        out.push({ path: childPath, kind: "added", right: right[i] });
      } else if (i >= right.length) {
        out.push({ path: childPath, kind: "removed", left: left[i] });
      } else {
        diffValues(left[i], right[i], childPath, out);
      }
    }
    return;
  }

  if (JSON.stringify(left) !== JSON.stringify(right)) {
    out.push({ path: path || "(root)", kind: "changed", left, right });
  }
}

const SAMPLE_LEFT = '{\n  "name": "Ada",\n  "role": "engineer",\n  "active": true\n}';
const SAMPLE_RIGHT = '{\n  "name": "Ada",\n  "role": "senior engineer",\n  "team": "platform"\n}';

export default function JsonDiffChecker() {
  const [left, setLeft] = useState(SAMPLE_LEFT);
  const [right, setRight] = useState(SAMPLE_RIGHT);

  const { diffs, error } = useMemo(() => {
    if (!left.trim() || !right.trim()) return { diffs: [] as DiffEntry[], error: null };
    try {
      const leftParsed = JSON.parse(left) as JsonValue;
      const rightParsed = JSON.parse(right) as JsonValue;
      const out: DiffEntry[] = [];
      diffValues(leftParsed, rightParsed, "", out);
      return { diffs: out, error: null };
    } catch (err) {
      return { diffs: [], error: (err as Error).message };
    }
  }, [left, right]);

  return (
    <div className="space-y-4">
      {error && (
        <p className="text-destructive text-sm flex items-center gap-1">
          <AlertCircle className="w-4 h-4" /> {error}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Original JSON</Label>
          <Textarea className="font-mono text-xs h-[300px]" value={left} onChange={(e) => setLeft(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Changed JSON</Label>
          <Textarea className="font-mono text-xs h-[300px]" value={right} onChange={(e) => setRight(e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Differences</Label>
          {!error && (
            <span className="text-sm font-semibold text-muted-foreground bg-muted px-2 py-1 rounded">
              {diffs.length} difference{diffs.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <div className="min-h-[160px] bg-muted/30 rounded-md border p-4 space-y-2 font-mono text-sm">
          {diffs.length === 0 && !error && (
            <div className="text-muted-foreground italic">No differences found.</div>
          )}
          {diffs.map((d, i) => (
            <div key={i} className="flex items-start gap-2">
              {d.kind === "added" && <PlusCircle className="w-4 h-4 mt-0.5 text-green-600 shrink-0" />}
              {d.kind === "removed" && <MinusCircle className="w-4 h-4 mt-0.5 text-red-600 shrink-0" />}
              {d.kind === "changed" && <RefreshCcw className="w-4 h-4 mt-0.5 text-amber-600 shrink-0" />}
              <div className="break-all">
                <span className="text-muted-foreground">{d.path}</span>
                {d.kind === "added" && <span className="text-green-600"> added: {formatValue(d.right)}</span>}
                {d.kind === "removed" && <span className="text-red-600"> removed: {formatValue(d.left)}</span>}
                {d.kind === "changed" && (
                  <span className="text-amber-600"> {formatValue(d.left)} &rarr; {formatValue(d.right)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
