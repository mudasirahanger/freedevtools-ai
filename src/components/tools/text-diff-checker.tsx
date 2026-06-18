"use client";

import { useState } from "react";
import * as diff from "diff";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function TextDiffChecker() {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const [diffResult, setDiffResult] = useState<diff.Change[]>([]);

  const handleCompare = () => {
    const changes = diff.diffWords(oldText, newText);
    setDiffResult(changes);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Original Text</Label>
          <Textarea
            value={oldText}
            onChange={(e) => setOldText(e.target.value)}
            placeholder="Paste the original text here..."
            className="min-h-[250px]"
          />
        </div>
        <div className="space-y-2">
          <Label>Modified Text</Label>
          <Textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Paste the modified text here..."
            className="min-h-[250px]"
          />
        </div>
      </div>
      
      <Button onClick={handleCompare} className="w-full">
        Compare Texts
      </Button>

      {diffResult.length > 0 && (
        <div className="space-y-2 pt-4">
          <Label>Diff Result</Label>
          <div className="min-h-[200px] p-4 bg-background border rounded-lg overflow-auto font-mono text-sm leading-relaxed whitespace-pre-wrap">
            {diffResult.map((part, index) => {
              let color = "";
              let bg = "";
              if (part.added) {
                color = "text-green-700 dark:text-green-400";
                bg = "bg-green-100 dark:bg-green-900/30";
              } else if (part.removed) {
                color = "text-red-700 dark:text-red-400 line-through";
                bg = "bg-red-100 dark:bg-red-900/30";
              }
              
              return (
                <span key={index} className={`${color} ${bg}`}>
                  {part.value}
                </span>
              );
            })}
          </div>
          <div className="flex gap-4 text-xs mt-2">
            <span className="flex items-center"><span className="w-3 h-3 bg-red-200 dark:bg-red-900/50 inline-block mr-1 rounded-sm"></span> Removed</span>
            <span className="flex items-center"><span className="w-3 h-3 bg-green-200 dark:bg-green-900/50 inline-block mr-1 rounded-sm"></span> Added</span>
          </div>
        </div>
      )}
    </div>
  );
}
