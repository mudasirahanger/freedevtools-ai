"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [currentUnix, setCurrentUnix] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line
    setCurrentUnix(Math.floor(Date.now() / 1000));
    const timer = setInterval(() => {
      setCurrentUnix(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTimestampChange = (val: string) => {
    setTimestamp(val);
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      // Determine if it's seconds or milliseconds
      // 10 digits usually means seconds, 13 digits means ms. Let's auto-detect.
      const isSeconds = val.length <= 11;
      const date = new Date(isSeconds ? num * 1000 : num);
      if (date.toString() !== "Invalid Date") {
        setDateStr(date.toISOString() + " / " + date.toUTCString() + " / " + date.toLocaleString());
      } else {
        setDateStr("Invalid timestamp");
      }
    } else {
      setDateStr("");
    }
  };

  const handleDateChange = (val: string) => {
    // We expect a valid string that `Date.parse()` can parse
    const date = new Date(val);
    if (date.toString() !== "Invalid Date") {
      setTimestamp(Math.floor(date.getTime() / 1000).toString());
      setDateStr(date.toISOString() + " / " + date.toUTCString() + " / " + date.toLocaleString());
    }
  };

  const convertNow = () => {
    if (currentUnix !== null) {
      handleTimestampChange(currentUnix.toString());
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="bg-muted/30 p-6 rounded-lg border flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">Current Epoch Time (Seconds)</h3>
          <p className="text-3xl font-mono mt-1 text-primary">{currentUnix}</p>
        </div>
        <Button onClick={convertNow}>Convert Now</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 p-6 bg-muted/10 rounded-lg border">
          <h3 className="font-semibold text-lg border-b pb-2">Unix Timestamp to Date</h3>
          <div className="space-y-2">
            <Label>Enter Timestamp (Seconds or MS)</Label>
            <Input 
              value={timestamp} 
              onChange={(e) => handleTimestampChange(e.target.value)} 
              placeholder="e.g. 1718294400" 
              className="font-mono"
            />
          </div>
          {dateStr && (
            <div className="bg-muted p-4 rounded text-sm space-y-2">
              {dateStr.split(' / ').map((str, i) => (
                <div key={i} className="flex flex-col border-b last:border-0 pb-2 last:pb-0">
                  <span className="text-muted-foreground text-xs">{i === 0 ? "ISO 8601" : i === 1 ? "UTC" : "Local Time"}</span>
                  <span className="font-mono">{str}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4 p-6 bg-muted/10 rounded-lg border">
          <h3 className="font-semibold text-lg border-b pb-2">Date to Unix Timestamp</h3>
          <div className="space-y-2">
            <Label>Enter Date String</Label>
            <Input 
              type="datetime-local"
              onChange={(e) => handleDateChange(e.target.value)} 
            />
            <p className="text-xs text-muted-foreground">Select a local date and time to generate its Unix timestamp.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
