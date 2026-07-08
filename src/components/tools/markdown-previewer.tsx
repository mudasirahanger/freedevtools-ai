"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { marked } from "marked";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  RefreshCw, 
  Download, 
  Copy, 
  FileUp, 
  Check, 
  FileText, 
  FileCode, 
  Trash2, 
  Eye,
  FileCheck
} from "lucide-react";
import { toast } from "sonner";

export default function MarkdownPreviewer() {
  // Live Preview Tab states
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
const x = 42;
console.log(greeting);
\`\`\`

> Blockquotes are also supported.

| Tables | Are | Cool |
| ------------- |:-------------:| -----:|
| col 3 is | right-aligned | $1600 |
| col 2 is | centered | $12 |
| zebra stripes | are neat | $1 |
`);

  // Converter Tab states
  const [converterInput, setConverterInput] = useState<string>("");
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [targetFormat, setTargetFormat] = useState<"pdf" | "doc" | "html" | "txt">("pdf");
  const [htmlOutput, setHtmlOutput] = useState<string>("");
  const [textOutput, setTextOutput] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convert markdown when input changes
  useEffect(() => {
    if (!converterInput.trim()) {
      setHtmlOutput("");
      setTextOutput("");
      return;
    }

    const runConversion = async () => {
      try {
        const rawHtml = await marked.parse(converterInput);
        setHtmlOutput(rawHtml);

        // Strip HTML to get plain text
        if (typeof window !== "undefined") {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = rawHtml;
          setTextOutput(tempDiv.textContent || tempDiv.innerText || "");
        }
      } catch (err) {
        console.error(err);
      }
    };

    runConversion();
  }, [converterInput]);

  const handleFileUpload = (file: File) => {
    if (!file.name.endsWith(".md") && !file.name.endsWith(".txt")) {
      toast.error("Please upload a .md or .txt file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Max size is 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setConverterInput(text);
      setFileInfo({ name: file.name, size: file.size });
      toast.success(`Loaded ${file.name}`);
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleImportFromEditor = () => {
    if (!input.trim()) {
      toast.error("Editor is empty! Type some markdown in the Live Preview tab first.");
      return;
    }
    setConverterInput(input);
    setFileInfo({ name: "editor-content.md", size: new Blob([input]).size });
    toast.success("Imported markdown from Editor");
  };

  const handleCopy = () => {
    const textToCopy = targetFormat === "html" ? htmlOutput : textOutput;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!converterInput.trim()) return;

    if (targetFormat === "pdf") {
      // Trigger styled printing of the document
      const printFrame = document.createElement("iframe");
      printFrame.style.position = "fixed";
      printFrame.style.right = "0";
      printFrame.style.bottom = "0";
      printFrame.style.width = "0";
      printFrame.style.height = "0";
      printFrame.style.border = "0";
      document.body.appendChild(printFrame);
      
      const doc = printFrame.contentWindow?.document;
      if (doc) {
        doc.write(`
          <html>
            <head>
              <title>${fileInfo?.name ? fileInfo.name.replace(/\.md$/, "") : "Document"}</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; padding: 40px; line-height: 1.6; color: #1f2937; }
                h1 { font-size: 2.25rem; font-weight: 800; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-top: 0; margin-bottom: 1.5rem; color: #111827; }
                h2 { font-size: 1.5rem; font-weight: 700; border-bottom: 1px solid #f3f4f6; padding-bottom: 0.25rem; margin-top: 2rem; margin-bottom: 1rem; color: #1f2937; }
                h3 { font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #374151; }
                p { margin-top: 0; margin-bottom: 1.25rem; }
                pre { background-color: #f3f4f6; padding: 1rem; border-radius: 0.375rem; overflow-x: auto; font-family: monospace; font-size: 0.875rem; margin-bottom: 1.25rem; }
                code { font-family: monospace; background-color: #f3f4f6; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-size: 0.875rem; }
                pre code { background-color: transparent; padding: 0; }
                blockquote { border-left: 4px solid #d1d5db; padding-left: 1rem; color: #4b5563; font-style: italic; margin-top: 1.5rem; margin-bottom: 1.5rem; }
                table { border-collapse: collapse; width: 100%; margin-top: 1.5rem; margin-bottom: 1.5rem; }
                th, td { border: 1px solid #e5e7eb; padding: 0.75rem; text-align: left; }
                th { background-color: #f9fafb; font-weight: 600; }
                ul, ol { padding-left: 1.5rem; margin-top: 0; margin-bottom: 1.25rem; }
                li { margin-top: 0.25rem; margin-bottom: 0.25rem; }
              </style>
            </head>
            <body>
              ${htmlOutput}
            </body>
          </html>
        `);
        doc.close();
        printFrame.contentWindow?.focus();
        // Wait a short moment to ensure stylesheets/render are complete
        setTimeout(() => {
          printFrame.contentWindow?.print();
          document.body.removeChild(printFrame);
          toast.success("Print dialog opened successfully.");
        }, 500);
      }
      return;
    }

    let downloadContent = "";
    let mimeType = "";
    let extension = "";

    if (targetFormat === "doc") {
      downloadContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
              xmlns:w='urn:schemas-microsoft-com:office:word' 
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <title>Exported Document</title>
          <!--[if gte mso 9]>
          <xml>
            <w:WordDocument>
              <w:View>Normal</w:View>
              <w:Zoom>100</w:Zoom>
            </w:WordDocument>
          </xml>
          <![endif]-->
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.5; margin: 1in; color: #333333; }
            h1 { font-size: 24pt; font-weight: bold; margin-bottom: 12pt; color: #111827; }
            h2 { font-size: 18pt; font-weight: bold; margin-top: 18pt; margin-bottom: 6pt; color: #1f2937; }
            h3 { font-size: 14pt; font-weight: bold; margin-top: 14pt; margin-bottom: 4pt; color: #374151; }
            p { margin-bottom: 10pt; }
            ul, ol { margin-bottom: 10pt; padding-left: 20pt; }
            li { margin-bottom: 4pt; }
            pre { background-color: #f3f4f6; padding: 10pt; border-radius: 4pt; font-family: Courier New, monospace; font-size: 10pt; margin-bottom: 10pt; }
            code { font-family: Courier New, monospace; background-color: #f3f4f6; padding: 2pt 4pt; border-radius: 2pt; font-size: 10pt; }
            blockquote { border-left: 4pt solid #d1d5db; padding-left: 10pt; color: #4b5563; font-style: italic; margin-bottom: 10pt; }
            table { border-collapse: collapse; width: 100%; margin-bottom: 12pt; }
            th, td { border: 1px solid #d1d5db; padding: 6pt; text-align: left; }
            th { background-color: #f9fafb; font-weight: bold; }
          </style>
        </head>
        <body>
          ${htmlOutput}
        </body>
        </html>
      `;
      mimeType = "application/msword;charset=utf-8";
      extension = ".doc";
    } else if (targetFormat === "html") {
      downloadContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${fileInfo?.name ? fileInfo.name.replace(/\.md$/, "") : "Document"}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #333; }
            h1, h2, h3 { line-height: 1.2; }
            h1 { border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
            pre { background: #f6f8fa; padding: 16px; border-radius: 6px; overflow: auto; }
            code { background: rgba(27,31,35,0.05); padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; }
            pre code { background: none; padding: 0; }
            blockquote { border-left: 4px solid #dfe2e5; color: #6a737d; padding-left: 1em; margin-left: 0; }
            table { border-collapse: collapse; width: 100%; }
            table th, table td { border: 1px solid #dfe2e5; padding: 6px 13px; }
            table tr { background-color: #fff; border-top: 1px solid #c6cbd1; }
            table tr:nth-child(2n) { background-color: #f6f8fa; }
          </style>
        </head>
        <body>
          ${htmlOutput}
        </body>
        </html>
      `;
      mimeType = "text/html;charset=utf-8";
      extension = ".html";
    } else if (targetFormat === "txt") {
      downloadContent = textOutput;
      mimeType = "text/plain;charset=utf-8";
      extension = ".txt";
    }

    const blob = new Blob([downloadContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    
    const originalName = fileInfo?.name || "document.md";
    const downloadName = originalName.endsWith(".md") 
      ? originalName.replace(/\.md$/, extension)
      : originalName + extension;

    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${downloadName}`);
  };

  const handleClearConverter = () => {
    setConverterInput("");
    setFileInfo(null);
    toast.success("Converter cleared");
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="previewer" className="w-full">
        <TabsList className="w-full grid grid-cols-2 rounded-lg border h-11 mb-6 bg-muted/60">
          <TabsTrigger value="previewer" className="font-semibold transition-all">
            <Eye className="w-4 h-4 mr-2" /> Live Preview & Editor
          </TabsTrigger>
          <TabsTrigger value="converter" className="font-semibold transition-all">
            <FileCheck className="w-4 h-4 mr-2" /> MD Converting Tool
          </TabsTrigger>
        </TabsList>

        <TabsContent value="previewer" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full min-h-[500px]">
            <div className="space-y-2 flex flex-col h-full">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-semibold">Markdown Editor</Label>
                <Button variant="ghost" size="sm" onClick={() => setInput("")} className="h-8 text-xs">
                  <RefreshCw className="mr-2 h-3.5 w-3.5" /> Clear
                </Button>
              </div>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write markdown here..."
                className="flex-1 min-h-[500px] font-mono text-sm resize-none border-input focus-visible:ring-ring"
              />
            </div>

            <div className="space-y-2 flex flex-col h-full">
              <Label className="text-sm font-semibold">Live Preview</Label>
              <div className="flex-1 min-h-[500px] border rounded-md p-6 overflow-auto bg-background prose dark:prose-invert max-w-none shadow-inner">
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
        </TabsContent>

        <TabsContent value="converter" className="mt-0 space-y-6">
          {!converterInput ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* File Drag and Drop */}
              <div 
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer flex flex-col justify-center items-center gap-4 ${
                  isDragging 
                    ? "border-primary bg-primary/5 scale-[1.01]" 
                    : "border-border hover:border-primary/50 hover:bg-muted/30"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <FileUp className="w-14 h-14 text-muted-foreground stroke-1" />
                <div>
                  <h3 className="text-lg font-semibold">Upload Markdown File</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Drag and drop your <strong>.md</strong> or <strong>.txt</strong> file here
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-2">
                    Or click to browse (Max 5MB)
                  </p>
                </div>
                <input 
                  type="file" 
                  accept=".md,.txt" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                  }}
                />
              </div>

              {/* Paste or Import Card */}
              <div className="border rounded-xl p-6 flex flex-col justify-between bg-card gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Import from Editor</h3>
                  <p className="text-sm text-muted-foreground">
                    Convert the content currently in the Live Preview & Editor tab.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Button onClick={handleImportFromEditor} className="w-full" variant="outline">
                    <Eye className="w-4 h-4 mr-2" /> Load Editor Markdown
                  </Button>
                  
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase font-mono">Or paste content</span>
                    <div className="flex-grow border-t border-border"></div>
                  </div>

                  <Textarea
                    placeholder="Paste raw markdown content here to start converting..."
                    className="h-28 font-mono text-xs resize-none"
                    value={converterInput}
                    onChange={(e) => {
                      setConverterInput(e.target.value);
                      setFileInfo({ name: "pasted-content.md", size: new Blob([e.target.value]).size });
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* File Info Bar */}
              <div className="flex justify-between items-center bg-muted/40 p-4 rounded-xl border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base text-foreground">{fileInfo?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {fileInfo ? formatBytes(fileInfo.size) : ""} • Markdown File
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleClearConverter} className="h-9 px-3 hover:text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" /> Clear
                </Button>
              </div>

              {/* Conversion and Preview Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Options Panel */}
                <div className="border rounded-xl p-5 bg-card flex flex-col gap-4">
                  <h3 className="font-bold text-base border-b pb-2">Target Format</h3>
                  
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setTargetFormat("pdf")}
                      className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                        targetFormat === "pdf"
                          ? "border-primary bg-primary/5 font-semibold text-primary"
                          : "border-border hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>PDF Document</span>
                      </div>
                      <span className="text-[10px] bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 px-2 py-0.5 rounded font-mono font-bold">PDF</span>
                    </button>

                    <button
                      onClick={() => setTargetFormat("doc")}
                      className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                        targetFormat === "doc"
                          ? "border-primary bg-primary/5 font-semibold text-primary"
                          : "border-border hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>Word Document</span>
                      </div>
                      <span className="text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 px-2 py-0.5 rounded font-mono font-bold">DOC</span>
                    </button>

                    <button
                      onClick={() => setTargetFormat("html")}
                      className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                        targetFormat === "html"
                          ? "border-primary bg-primary/5 font-semibold text-primary"
                          : "border-border hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4" />
                        <span>HTML Document</span>
                      </div>
                      <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded font-mono font-bold">HTML</span>
                    </button>

                    <button
                      onClick={() => setTargetFormat("txt")}
                      className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                        targetFormat === "txt"
                          ? "border-primary bg-primary/5 font-semibold text-primary"
                          : "border-border hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>Plain Text</span>
                      </div>
                      <span className="text-[10px] bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 px-2 py-0.5 rounded font-mono font-bold">TXT</span>
                    </button>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Button onClick={handleDownload} className="w-full py-5">
                      <Download className="w-4 h-4 mr-2" /> Download Converted File
                    </Button>
                    {(targetFormat === "html" || targetFormat === "txt") && (
                      <Button onClick={handleCopy} variant="outline" className="w-full">
                        {copied ? (
                          <><Check className="w-4 h-4 mr-2 text-green-500" /> Copied!</>
                        ) : (
                          <><Copy className="w-4 h-4 mr-2" /> Copy Output Code</>
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Preview Panel */}
                <div className="md:col-span-2 border rounded-xl p-5 bg-card flex flex-col gap-3 min-h-[300px]">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="font-bold text-base">
                      {targetFormat === "pdf" && "PDF Layout Preview (Printed styles)"}
                      {targetFormat === "doc" && "Word Document Content Preview"}
                      {targetFormat === "html" && "HTML Source Code"}
                      {targetFormat === "txt" && "Plain Text Output"}
                    </h3>
                  </div>

                  <div className="flex-1 w-full overflow-auto max-h-[450px]">
                    {targetFormat === "pdf" && (
                      <div className="border rounded bg-background p-6 prose dark:prose-invert max-w-none shadow-sm font-sans">
                        <div className="text-[10px] text-muted-foreground border-b pb-1 mb-4 flex justify-between font-mono">
                          <span>PDF PRINT STYLING ACTIVE</span>
                          <span>PAGE 1</span>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
                      </div>
                    )}

                    {targetFormat === "doc" && (
                      <div className="border rounded bg-background p-6 prose dark:prose-invert max-w-none shadow-sm font-serif">
                        <div className="text-[10px] text-muted-foreground border-b pb-1 mb-4 flex justify-between font-mono">
                          <span>WORD DOCUMENT VIEW</span>
                          <span>Standard Margin 1"</span>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
                      </div>
                    )}

                    {targetFormat === "html" && (
                      <pre className="p-4 bg-muted rounded-lg font-mono text-xs overflow-x-auto whitespace-pre-wrap select-all leading-normal">
                        {htmlOutput}
                      </pre>
                    )}

                    {targetFormat === "txt" && (
                      <pre className="p-4 bg-muted rounded-lg font-mono text-xs overflow-x-auto whitespace-pre-wrap select-all leading-normal">
                        {textOutput}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
