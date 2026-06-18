"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function UuidGenerator() {
  const [count, setCount] = useState<number>(5);
  const [uuids, setUuids] = useState<string[]>([]);

  const generateUUIDs = () => {
    try {
      const num = Math.min(Math.max(1, count), 1000); // Limit to 1-1000
      const newUuids = Array.from({ length: num }, () => crypto.randomUUID());
      setUuids(newUuids);
    } catch {
      // Fallback for older browsers
      const num = Math.min(Math.max(1, count), 1000);
      const newUuids = Array.from({ length: num }, () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      });
      setUuids(newUuids);
    }
  };

  const handleCopyAll = () => {
    if (uuids.length > 0) {
      navigator.clipboard.writeText(uuids.join('\n'));
      toast.success(`Copied ${uuids.length} UUIDs to clipboard`);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-muted/30 p-6 rounded-lg border space-y-4">
        <div className="space-y-2">
          <Label>Number of UUIDs to generate (1-1000)</Label>
          <div className="flex gap-4">
            <Input 
              type="number" 
              value={count} 
              onChange={(e) => setCount(Number(e.target.value))} 
              min={1} 
              max={1000} 
            />
            <Button onClick={generateUUIDs} className="w-[150px]">
              <RefreshCw className="mr-2 h-4 w-4" /> Generate
            </Button>
          </div>
        </div>
      </div>

      {uuids.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <Label>Generated UUIDs (v4)</Label>
            <Button variant="outline" size="sm" onClick={handleCopyAll}>
              <Copy className="mr-2 h-4 w-4" /> Copy All
            </Button>
          </div>
          <Textarea 
            value={uuids.join('\n')}
            readOnly
            className="min-h-[300px] font-mono text-sm bg-muted/50"
          />
        </div>
      )}
    </div>
  );
}
