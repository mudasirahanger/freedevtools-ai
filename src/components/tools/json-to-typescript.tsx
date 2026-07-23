"use client";

import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, AlertCircle } from "lucide-react";
import { toast } from "sonner";

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

function toPascalCase(input: string): string {
  const cleaned = input.replace(/[^a-zA-Z0-9]+/g, " ").trim();
  if (!cleaned) return "Root";
  return cleaned
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function singularize(name: string): string {
  if (name.endsWith("ies")) return `${name.slice(0, -3)}y`;
  if (name.endsWith("ses")) return name.slice(0, -2);
  if (name.endsWith("s") && !name.endsWith("ss")) return name.slice(0, -1);
  return name;
}

function isPlainObject(value: JsonValue): value is { [key: string]: JsonValue } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function generateInterfaces(
  value: JsonValue,
  name: string,
  interfaces: Map<string, string>
): string {
  if (value === null) return "null";
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "boolean";

  if (Array.isArray(value)) {
    if (value.length === 0) return "unknown[]";
    const elementTypes = new Set(
      value.map((item) => generateInterfaces(item, singularize(name), interfaces))
    );
    const union = Array.from(elementTypes).join(" | ");
    return elementTypes.size > 1 ? `(${union})[]` : `${union}[]`;
  }

  if (isPlainObject(value)) {
    const interfaceName = toPascalCase(name);
    const entries = Object.entries(value);
    const fields = entries
      .map(([key, val]) => {
        const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
        const optional = val === null ? "?" : "";
        const fieldType = generateInterfaces(val, key, interfaces);
        return `  ${safeKey}${optional}: ${fieldType};`;
      })
      .join("\n");

    const body = `interface ${interfaceName} {\n${fields || "  [key: string]: never;"}\n}`;
    // Avoid overwriting an existing interface with the same inferred name.
    let finalName = interfaceName;
    let suffix = 2;
    while (interfaces.has(finalName) && interfaces.get(finalName) !== body) {
      finalName = `${interfaceName}${suffix}`;
      suffix += 1;
    }
    interfaces.set(finalName, body.replace(`interface ${interfaceName} {`, `interface ${finalName} {`));
    return finalName;
  }

  return "unknown";
}

export default function JsonToTypeScript() {
  const [input, setInput] = useState(
    '{\n  "id": 1,\n  "name": "Ada Lovelace",\n  "isActive": true,\n  "tags": ["admin", "editor"],\n  "address": {\n    "city": "London",\n    "zip": "SW1A 1AA"\n  }\n}'
  );
  const [rootName, setRootName] = useState("RootObject");

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: "", error: null };
    try {
      const parsed = JSON.parse(input) as JsonValue;
      const interfaces = new Map<string, string>();
      const rootType = generateInterfaces(parsed, rootName || "RootObject", interfaces);

      if (isPlainObject(parsed)) {
        const ordered = Array.from(interfaces.values());
        return { output: ordered.join("\n\n"), error: null };
      }

      const ordered = Array.from(interfaces.values());
      const typeAlias = `type ${toPascalCase(rootName || "RootObject")} = ${rootType};`;
      return { output: [...ordered, typeAlias].filter(Boolean).join("\n\n"), error: null };
    } catch (err) {
      return { output: "", error: (err as Error).message };
    }
  }, [input, rootName]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("TypeScript interfaces copied to clipboard");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
        <div className="flex-1 space-y-2">
          <Label>Root Interface Name</Label>
          <Input value={rootName} onChange={(e) => setRootName(e.target.value)} placeholder="RootObject" />
        </div>
      </div>

      {error && (
        <p className="text-destructive text-sm flex items-center gap-1">
          <AlertCircle className="w-4 h-4" /> {error}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Input JSON</Label>
          <Textarea
            className="font-mono text-xs h-[420px]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{ "example": true }'
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Generated TypeScript</Label>
            <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!output}>
              <Copy className="w-4 h-4 mr-2" /> Copy
            </Button>
          </div>
          <Textarea className="font-mono text-xs h-[420px]" readOnly value={output} placeholder="Interfaces will appear here..." />
        </div>
      </div>
    </div>
  );
}
