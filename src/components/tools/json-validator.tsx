"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, CheckCircle2, XCircle } from "lucide-react";

export default function JsonValidator() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [message, setMessage] = useState("");

  const handleValidate = () => {
    if (!input.trim()) {
      setStatus("idle");
      setMessage("");
      return;
    }
    try {
      JSON.parse(input);
      setStatus("valid");
      setMessage("Valid JSON!");
    } catch (err: unknown) {
      setStatus("invalid");
      setMessage(err instanceof Error ? err.message : "Invalid JSON syntax");
    }
  };

  const handleReset = () => {
    setInput("");
    setStatus("idle");
    setMessage("");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Input JSON</label>
        <Textarea
          placeholder="Paste your JSON here..."
          className="font-mono min-h-[300px] text-sm"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setStatus("idle");
            setMessage("");
          }}
        />
      </div>
      
      {status !== "idle" && (
        <div className={`p-4 rounded-md flex items-start gap-3 ${status === "valid" ? "bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-400" : "bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-400"}`}>
          {status === "valid" ? <CheckCircle2 className="h-5 w-5 mt-0.5" /> : <XCircle className="h-5 w-5 mt-0.5" />}
          <div>
            <h3 className="font-medium">{status === "valid" ? "Success" : "Error"}</h3>
            <p className="text-sm opacity-90">{message}</p>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={handleValidate}>Validate JSON</Button>
        <Button variant="outline" onClick={handleReset}>
          <RefreshCw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>
    </div>
  );
}
