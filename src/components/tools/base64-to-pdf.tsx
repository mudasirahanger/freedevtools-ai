"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, Trash2, FileText } from "lucide-react";

export default function Base64ToPdf() {
  const [base64Input, setBase64Input] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleGenerate = () => {
    setError("");
    setPdfUrl("");

    if (!base64Input.trim()) {
      setError("Please enter a Base64 string.");
      return;
    }

    let cleanBase64 = base64Input.trim();
    if (!cleanBase64.startsWith("data:application/pdf")) {
      cleanBase64 = cleanBase64.replace(/\s/g, "");
      cleanBase64 = `data:application/pdf;base64,${cleanBase64}`;
    }

    try {
      const parts = cleanBase64.split(",");
      if (parts.length === 2) {
        atob(parts[1]); 
        setPdfUrl(cleanBase64);
      } else {
        setError("Invalid Base64 format.");
      }
    } catch {
      setError("Invalid Base64 string. Cannot decode.");
    }
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "decoded-document.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Base64 PDF String</label>
        <Textarea
          placeholder="Paste your Base64 PDF string here (e.g., JVBERi0xLjQK... or data:application/pdf;base64,...)"
          className="font-mono text-xs h-40"
          value={base64Input}
          onChange={(e) => setBase64Input(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleGenerate}>
          <FileText className="w-4 h-4 mr-2" /> View PDF
        </Button>
        <Button variant="outline" onClick={() => { setBase64Input(""); setPdfUrl(""); setError(""); }}>
          <Trash2 className="w-4 h-4 mr-2" /> Clear
        </Button>
      </div>

      {error && (
        <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
          {error}
        </div>
      )}

      {pdfUrl && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">PDF Preview</h3>
            <Button onClick={handleDownload} variant="secondary">
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
          </div>
          <div className="border rounded-lg bg-muted/30 w-full h-[600px] overflow-hidden">
            <iframe src={pdfUrl} className="w-full h-full border-0" title="PDF Preview" />
          </div>
        </div>
      )}
    </div>
  );
}
