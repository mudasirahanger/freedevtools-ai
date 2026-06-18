"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";

export default function MarkdownPreviewer() {
  const [input, setInput] = useState(`# Markdown Previewer

Type some markdown on the left, and see it **rendered** on the right!

## Features supported:
- Lists
- **Bold** and *italic* text
- [Links](https://freedevtools.ai)
- \`inline code\`

### Code Blocks
\`\`\`javascript
const greeting = "Hello World!";
console.log(greeting);
\`\`\`

> Blockquotes are also supported.

| Tables | Are | Cool |
| ------------- |:-------------:| -----:|
| col 3 is | right-aligned | $1600 |
| col 2 is | centered | $12 |
| zebra stripes | are neat | $1 |
`);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full min-h-[500px]">
      <div className="space-y-2 flex flex-col h-full">
        <div className="flex justify-between items-center">
          <Label>Markdown Editor</Label>
          <Button variant="ghost" size="sm" onClick={() => setInput("")} className="h-8">
            <RefreshCw className="mr-2 h-3 w-3" /> Clear
          </Button>
        </div>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write markdown here..."
          className="flex-1 min-h-[500px] font-mono text-sm resize-none"
        />
      </div>

      <div className="space-y-2 flex flex-col h-full">
        <Label>Live Preview</Label>
        <div className="flex-1 min-h-[500px] border rounded-md p-6 overflow-auto bg-background prose dark:prose-invert max-w-none">
          {input ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {input}
            </ReactMarkdown>
          ) : (
            <div className="text-muted-foreground italic h-full flex items-center justify-center">
              Preview will appear here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
