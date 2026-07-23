"use client";

import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy } from "lucide-react";
import { toast } from "sonner";

type Target = "fetch" | "axios" | "python";

interface ParsedCurl {
  method: string;
  url: string;
  headers: [string, string][];
  data: string | null;
}

// Tokenize a curl command respecting single/double quotes, similar to a shell.
function tokenize(command: string): string[] {
  const tokens: string[] = [];
  let current = "";
  let quote: '"' | "'" | null = null;

  for (let i = 0; i < command.length; i++) {
    const char = command[i];

    if (quote) {
      if (char === quote) {
        quote = null;
      } else if (char === "\\" && quote === '"' && command[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        current += char;
      }
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }

    if (char === "\\" && (command[i + 1] === "\n" || command[i + 1] === undefined)) {
      i++;
      continue;
    }

    if (/\s/.test(char)) {
      if (current) {
        tokens.push(current);
        current = "";
      }
      continue;
    }

    current += char;
  }

  if (current) tokens.push(current);
  return tokens;
}

function parseCurl(command: string): ParsedCurl {
  const tokens = tokenize(command.trim().replace(/^curl\s+/, ""));
  let method = "GET";
  let url = "";
  const headers: [string, string][] = [];
  let data: string | null = null;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token === "-X" || token === "--request") {
      method = tokens[++i] ?? method;
    } else if (token === "-H" || token === "--header") {
      const header = tokens[++i] ?? "";
      const separatorIndex = header.indexOf(":");
      if (separatorIndex > -1) {
        headers.push([header.slice(0, separatorIndex).trim(), header.slice(separatorIndex + 1).trim()]);
      }
    } else if (
      token === "-d" ||
      token === "--data" ||
      token === "--data-raw" ||
      token === "--data-binary" ||
      token === "-u"
    ) {
      data = tokens[++i] ?? "";
      if (token !== "-u" && method === "GET") method = "POST";
    } else if (token === "-A" || token === "--user-agent") {
      headers.push(["User-Agent", tokens[++i] ?? ""]);
    } else if (token.startsWith("-")) {
      // Skip unrecognized flags (e.g. -s, -L, --compressed) without an obvious value.
      continue;
    } else if (!url) {
      url = token;
    }
  }

  return { method, url, headers, data };
}

function toFetchCode({ method, url, headers, data }: ParsedCurl): string {
  const headersObj = headers.length
    ? `  headers: {\n${headers.map(([k, v]) => `    "${k}": "${v}"`).join(",\n")}\n  },\n`
    : "";
  const bodyLine = data ? `  body: ${JSON.stringify(data)},\n` : "";
  return `fetch("${url}", {\n  method: "${method}",\n${headersObj}${bodyLine}})\n  .then((res) => res.json())\n  .then((data) => console.log(data))\n  .catch((err) => console.error(err));`;
}

function toAxiosCode({ method, url, headers, data }: ParsedCurl): string {
  const headersObj = headers.length
    ? `,\n  headers: {\n${headers.map(([k, v]) => `    "${k}": "${v}"`).join(",\n")}\n  }`
    : "";
  const dataArg = data ? `, ${JSON.stringify(data)}` : "";
  const lowerMethod = method.toLowerCase();

  if (["get", "delete"].includes(lowerMethod)) {
    return `import axios from "axios";\n\naxios.${lowerMethod}("${url}", {\n  ${headers.length ? `headers: {\n${headers.map(([k, v]) => `    "${k}": "${v}"`).join(",\n")}\n  }` : ""}\n})\n  .then((res) => console.log(res.data))\n  .catch((err) => console.error(err));`;
  }

  return `import axios from "axios";\n\naxios.${lowerMethod}("${url}"${dataArg}${headersObj ? `, {${headersObj}\n}` : ""})\n  .then((res) => console.log(res.data))\n  .catch((err) => console.error(err));`;
}

function toPythonCode({ method, url, headers, data }: ParsedCurl): string {
  const headersObj = headers.length
    ? `headers = {\n${headers.map(([k, v]) => `    "${k}": "${v}"`).join(",\n")}\n}\n\n`
    : "";
  const dataArg = data ? `, data=${JSON.stringify(data)}` : "";
  const headersArg = headers.length ? ", headers=headers" : "";

  return `import requests\n\n${headersObj}response = requests.${method.toLowerCase()}("${url}"${dataArg}${headersArg})\nprint(response.status_code)\nprint(response.json())`;
}

const SAMPLE_CURL = `curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{"name": "Ada Lovelace", "role": "admin"}'`;

export default function CurlToCode() {
  const [input, setInput] = useState(SAMPLE_CURL);
  const [target, setTarget] = useState<Target>("fetch");

  const output = useMemo(() => {
    if (!input.trim() || !input.includes("curl")) return "";
    try {
      const parsed = parseCurl(input);
      if (!parsed.url) return "";
      if (target === "axios") return toAxiosCode(parsed);
      if (target === "python") return toPythonCode(parsed);
      return toFetchCode(parsed);
    } catch {
      return "";
    }
  }, [input, target]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("Code copied to clipboard");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-end sm:justify-between">
        <div className="space-y-2 w-full sm:w-56">
          <Label>Output Language</Label>
          <Select value={target} onValueChange={(val: string | null) => { if (val) setTarget(val as Target); }}>
            <SelectTrigger>
              <SelectValue placeholder="Select target" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fetch">JavaScript (fetch)</SelectItem>
              <SelectItem value="axios">Node.js (axios)</SelectItem>
              <SelectItem value="python">Python (requests)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>cURL Command</Label>
          <Textarea
            className="font-mono text-xs h-[360px]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="curl https://api.example.com/users"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Generated Code</Label>
            <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!output}>
              <Copy className="w-4 h-4 mr-2" /> Copy
            </Button>
          </div>
          <Textarea
            className="font-mono text-xs h-[360px]"
            readOnly
            value={output}
            placeholder="Paste a curl command on the left to generate code..."
          />
        </div>
      </div>
    </div>
  );
}
