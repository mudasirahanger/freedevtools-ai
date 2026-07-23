"use client";

import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRightLeft, Copy } from "lucide-react";
import { toast } from "sonner";

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

function isPlainObject(value: JsonValue): value is { [key: string]: JsonValue } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function elementToValue(el: Element): JsonValue {
  const obj: { [key: string]: JsonValue } = {};

  for (const attr of Array.from(el.attributes)) {
    obj[`@${attr.name}`] = attr.value;
  }

  const children = Array.from(el.children);
  if (children.length === 0) {
    const text = (el.textContent ?? "").trim();
    if (Object.keys(obj).length === 0) return text;
    if (text) obj["#text"] = text;
    return obj;
  }

  for (const child of children) {
    const value = elementToValue(child);
    const name = child.tagName;
    if (name in obj) {
      const existing = obj[name];
      obj[name] = Array.isArray(existing) ? [...existing, value] : [existing, value];
    } else {
      obj[name] = value;
    }
  }

  return obj;
}

function xmlToJson(xmlString: string): JsonValue {
  const doc = new DOMParser().parseFromString(xmlString, "text/xml");
  const parseError = doc.querySelector("parsererror");
  if (parseError) throw new Error("Invalid XML: could not parse document.");
  const root = doc.documentElement;
  if (!root) throw new Error("No root element found.");
  return { [root.tagName]: elementToValue(root) };
}

function escapeXmlText(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeXmlAttr(value: string): string {
  return escapeXmlText(value).replace(/"/g, "&quot;");
}

function valueToXml(name: string, value: JsonValue, indent: number): string {
  const pad = "  ".repeat(indent);

  if (Array.isArray(value)) {
    return value.map((item) => valueToXml(name, item, indent)).join("\n");
  }

  if (!isPlainObject(value)) {
    const text = value === null ? "" : escapeXmlText(String(value));
    return `${pad}<${name}>${text}</${name}>`;
  }

  const attrs = Object.entries(value)
    .filter(([key]) => key.startsWith("@"))
    .map(([key, val]) => ` ${key.slice(1)}="${escapeXmlAttr(String(val))}"`)
    .join("");

  const textValue = value["#text"];
  const childEntries = Object.entries(value).filter(([key]) => key !== "#text" && !key.startsWith("@"));

  if (childEntries.length === 0) {
    const text = textValue !== undefined ? escapeXmlText(String(textValue)) : "";
    return `${pad}<${name}${attrs}>${text}</${name}>`;
  }

  const childrenXml = childEntries.map(([key, val]) => valueToXml(key, val, indent + 1)).join("\n");
  return `${pad}<${name}${attrs}>\n${childrenXml}\n${pad}</${name}>`;
}

function jsonToXml(jsonText: string): string {
  const parsed = JSON.parse(jsonText) as JsonValue;
  let rootName = "root";
  let rootValue: JsonValue = parsed;

  if (isPlainObject(parsed) && Object.keys(parsed).length === 1) {
    rootName = Object.keys(parsed)[0];
    rootValue = parsed[rootName];
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n${valueToXml(rootName, rootValue, 0)}`;
}

const SAMPLE_XML = `<user id="42">
  <name>Ada Lovelace</name>
  <role>Engineer</role>
  <skills>
    <skill>Mathematics</skill>
    <skill>Programming</skill>
  </skills>
</user>`;

export default function XmlToJsonConverter() {
  const [input, setInput] = useState(SAMPLE_XML);
  const [mode, setMode] = useState<"xml2json" | "json2xml">("xml2json");

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: "", error: null };
    try {
      if (mode === "xml2json") {
        return { output: JSON.stringify(xmlToJson(input), null, 2), error: null };
      }
      return { output: jsonToXml(input), error: null };
    } catch (err) {
      return { output: "", error: (err as Error).message };
    }
  }, [input, mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "xml2json" ? "json2xml" : "xml2json"));
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
        <div className="font-semibold px-2">{mode === "xml2json" ? "XML to JSON" : "JSON to XML"}</div>
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
          <Label>Input {mode === "xml2json" ? "XML" : "JSON"}</Label>
          <Textarea className="font-mono text-xs h-[380px]" value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Output {mode === "xml2json" ? "JSON" : "XML"}</Label>
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
