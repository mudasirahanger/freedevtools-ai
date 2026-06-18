"use client";

import { useState } from "react";
import cronstrue from "cronstrue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function CronExpressionGenerator() {
  const [expression, setExpression] = useState("*/5 * * * *");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Five parts
  const [minute, setMinute] = useState("*/5");
  const [hour, setHour] = useState("*");
  const [day, setDay] = useState("*");
  const [month, setMonth] = useState("*");
  const [weekday, setWeekday] = useState("*");

  const updateFromParts = (m: string, h: string, d: string, mo: string, w: string) => {
    const exp = `${m} ${h} ${d} ${mo} ${w}`;
    setExpression(exp);
    try {
      const desc = cronstrue.toString(exp, { throwExceptionOnParseError: true });
      setDescription(desc);
      setError(null);
    } catch (e) {
      setDescription("");
      setError(e as string);
    }
  };

  const handleCopy = () => {
    if (expression) {
      navigator.clipboard.writeText(expression);
      toast.success("Copied to clipboard");
    }
  };

  const handleFullExpressionChange = (val: string) => {
    setExpression(val);
    const parts = val.trim().split(/\s+/);
    if (parts.length === 5) {
      setMinute(parts[0]);
      setHour(parts[1]);
      setDay(parts[2]);
      setMonth(parts[3]);
      setWeekday(parts[4]);
    }
    
    try {
      const desc = cronstrue.toString(val, { throwExceptionOnParseError: true });
      setDescription(desc);
      setError(null);
    } catch (e) {
      setDescription("");
      setError(e as string);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-muted/30 p-8 rounded-xl border flex flex-col items-center justify-center space-y-6 text-center">
        <h3 className="text-xl font-bold">Cron Expression</h3>
        <Input 
          value={expression} 
          onChange={(e) => handleFullExpressionChange(e.target.value)} 
          className="text-center font-mono text-3xl h-16 w-full max-w-lg shadow-inner bg-background"
        />
        <div className="min-h-[40px] flex items-center justify-center">
          {error ? (
            <span className="text-destructive font-medium">{error}</span>
          ) : (
            <span className="text-primary font-bold text-xl">&quot;{description}&quot;</span>
          )}
        </div>
        <Button size="lg" onClick={handleCopy} disabled={!!error}>
          <Copy className="mr-2 h-5 w-5" /> Copy Expression
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label>Minute</Label>
          <Input value={minute} onChange={(e) => { setMinute(e.target.value); updateFromParts(e.target.value, hour, day, month, weekday); }} className="font-mono text-center" />
          <p className="text-xs text-muted-foreground text-center">0-59</p>
        </div>
        <div className="space-y-2">
          <Label>Hour</Label>
          <Input value={hour} onChange={(e) => { setHour(e.target.value); updateFromParts(minute, e.target.value, day, month, weekday); }} className="font-mono text-center" />
          <p className="text-xs text-muted-foreground text-center">0-23</p>
        </div>
        <div className="space-y-2">
          <Label>Day (Month)</Label>
          <Input value={day} onChange={(e) => { setDay(e.target.value); updateFromParts(minute, hour, e.target.value, month, weekday); }} className="font-mono text-center" />
          <p className="text-xs text-muted-foreground text-center">1-31</p>
        </div>
        <div className="space-y-2">
          <Label>Month</Label>
          <Input value={month} onChange={(e) => { setMonth(e.target.value); updateFromParts(minute, hour, day, e.target.value, weekday); }} className="font-mono text-center" />
          <p className="text-xs text-muted-foreground text-center">1-12 or JAN-DEC</p>
        </div>
        <div className="space-y-2 col-span-2 md:col-span-1">
          <Label>Day (Week)</Label>
          <Input value={weekday} onChange={(e) => { setWeekday(e.target.value); updateFromParts(minute, hour, day, month, e.target.value); }} className="font-mono text-center" />
          <p className="text-xs text-muted-foreground text-center">0-6 or SUN-SAT</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        <Button variant="outline" onClick={() => handleFullExpressionChange("* * * * *")}>Every minute</Button>
        <Button variant="outline" onClick={() => handleFullExpressionChange("*/5 * * * *")}>Every 5 minutes</Button>
        <Button variant="outline" onClick={() => handleFullExpressionChange("0 * * * *")}>Every hour</Button>
        <Button variant="outline" onClick={() => handleFullExpressionChange("0 0 * * *")}>Every day at midnight</Button>
        <Button variant="outline" onClick={() => handleFullExpressionChange("0 0 * * 0")}>Every Sunday</Button>
        <Button variant="outline" onClick={() => handleFullExpressionChange("0 9 * * 1-5")}>Weekdays at 9am</Button>
        <Button variant="outline" onClick={() => handleFullExpressionChange("0 0 1 * *")}>First day of month</Button>
        <Button variant="outline" onClick={() => handleFullExpressionChange("0 0 1 1 *")}>Every Jan 1st</Button>
      </div>
    </div>
  );
}
