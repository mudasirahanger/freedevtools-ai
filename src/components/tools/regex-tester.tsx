"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function RegexTester() {
  const [regexStr, setRegexStr] = useState("hello\\s+world");
  const [flags, setFlags] = useState("ig");
  const [testString, setTestString] = useState("Hello world! This is a test string to see if Hello    World matches.");
  const matches: RegExpMatchArray[] = [];
  let error: string | null = null;

  if (regexStr) {
    try {
      const re = new RegExp(regexStr, flags);
      const str = testString;
      let m;
      
      if (flags.includes('g')) {
        while ((m = re.exec(str)) !== null) {
          matches.push(m);
          if (m.index === re.lastIndex) {
            re.lastIndex++;
          }
        }
      } else {
        m = re.exec(str);
        if (m) matches.push(m);
      }
    } catch (err) {
      error = (err as Error).message;
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Label>Regular Expression</Label>
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-muted-foreground text-xl">/</span>
              <Input 
                value={regexStr} 
                onChange={(e) => setRegexStr(e.target.value)} 
                className="font-mono text-base"
                placeholder="pattern"
              />
              <span className="text-muted-foreground text-xl">/</span>
              <Input 
                value={flags} 
                onChange={(e) => setFlags(e.target.value)} 
                className="font-mono text-base w-24"
                placeholder="gmi"
              />
            </div>
            {error && <p className="text-destructive text-sm flex items-center mt-2"><AlertCircle className="w-4 h-4 mr-1" /> {error}</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Test String</Label>
          <Textarea 
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="min-h-[300px] text-base"
            placeholder="Enter text to test against..."
          />
        </div>

        <div className="space-y-2 h-full flex flex-col">
          <div className="flex items-center justify-between">
            <Label>Match Results</Label>
            {matches.length > 0 ? (
              <span className="text-sm font-semibold text-green-600 flex items-center bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                <CheckCircle2 className="w-4 h-4 mr-1" /> {matches.length} match{matches.length !== 1 ? 'es' : ''} found
              </span>
            ) : (
              <span className="text-sm font-semibold text-muted-foreground bg-muted px-2 py-1 rounded">
                0 matches
              </span>
            )}
          </div>
          <div className="flex-1 min-h-[300px] bg-muted/50 rounded-md border p-4 overflow-auto font-mono text-sm space-y-4">
            {matches.length > 0 ? (
              matches.map((m, i) => (
                <div key={i} className="bg-background border rounded p-3 shadow-sm">
                  <div className="font-semibold mb-2 pb-2 border-b text-primary">Match {i + 1}</div>
                  <div className="grid grid-cols-[100px_1fr] gap-2 mb-1">
                    <span className="text-muted-foreground">Full match:</span>
                    <span className="bg-muted px-1 rounded break-all">{m[0]}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2 mb-2">
                    <span className="text-muted-foreground">Index:</span>
                    <span>{m.index} - {m.index !== undefined ? m.index + m[0].length : ''}</span>
                  </div>
                  
                  {m.length > 1 && (
                    <div className="mt-3 pt-3 border-t border-dashed">
                      <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Capture Groups</div>
                      {m.slice(1).map((group, j) => (
                        <div key={j} className="grid grid-cols-[100px_1fr] gap-2 mb-1 text-sm">
                          <span className="text-muted-foreground">Group {j + 1}:</span>
                          <span className={group ? "bg-muted px-1 rounded break-all" : "text-muted-foreground italic"}>
                            {group !== undefined ? group : "undefined"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-muted-foreground h-full flex items-center justify-center italic">
                {error ? "Fix syntax errors to see results." : "No matches found."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
