"use client";

import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw } from "lucide-react";

type FieldType = {
  id: string;
  label: string;
  generator: () => string | number | boolean | null;
  enabled: boolean;
};

export default function DummyJsonGenerator() {
  const [rowCount, setRowCount] = useState<number>(10);
  const [jsonOutput, setJsonOutput] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const [fields, setFields] = useState<FieldType[]>([
    { id: "id", label: "UUID", generator: () => faker.string.uuid(), enabled: true },
    { id: "name", label: "Full Name", generator: () => faker.person.fullName(), enabled: true },
    { id: "email", label: "Email", generator: () => faker.internet.email(), enabled: true },
    { id: "avatar", label: "Avatar URL", generator: () => faker.image.avatar(), enabled: false },
    { id: "job", label: "Job Title", generator: () => faker.person.jobTitle(), enabled: false },
    { id: "company", label: "Company", generator: () => faker.company.name(), enabled: false },
    { id: "address", label: "Address", generator: () => faker.location.streetAddress(), enabled: false },
    { id: "phone", label: "Phone", generator: () => faker.phone.number(), enabled: false },
    { id: "date", label: "Date Joined", generator: () => faker.date.past().toISOString(), enabled: false },
  ]);

  const generateData = () => {
    try {
      const activeFields = fields.filter(f => f.enabled);
      if (activeFields.length === 0) {
        setJsonOutput("[\n  // Select at least one field to generate data\n]");
        return;
      }

      const data = Array.from({ length: Math.min(Math.max(1, rowCount), 1000) }).map(() => {
        const row: Record<string, string | number | boolean | null> = {};
        activeFields.forEach(field => {
          row[field.id] = field.generator();
        });
        return row;
      });

      setJsonOutput(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // debounce to avoid cascading render issues
    const timeout = setTimeout(() => {
      generateData();
    }, 0);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields, rowCount]);

  const toggleField = (id: string) => {
    setFields(fields.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="space-y-6 lg:col-span-1 bg-muted/30 p-4 rounded-xl border">
        <div className="space-y-2">
          <Label>Number of Rows (Max 1000)</Label>
          <Input 
            type="number" 
            min="1" 
            max="1000" 
            value={rowCount} 
            onChange={(e) => setRowCount(Number(e.target.value))} 
          />
        </div>

        <div className="space-y-3">
          <Label>Fields to Include</Label>
          <div className="space-y-2">
            {fields.map((field) => (
              <div key={field.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`field-${field.id}`} 
                  checked={field.enabled} 
                  onCheckedChange={() => toggleField(field.id)}
                />
                <label 
                  htmlFor={`field-${field.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {field.label} <span className="text-muted-foreground text-xs font-mono ml-1">&quot;{field.id}&quot;</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full" onClick={generateData}>
          <RefreshCw className="w-4 h-4 mr-2" /> Regenerate Data
        </Button>
      </div>

      <div className="lg:col-span-2 space-y-2 flex flex-col">
        <div className="flex justify-between items-center">
          <Label>Generated JSON</Label>
          <Button variant="outline" size="sm" onClick={handleCopy} disabled={!jsonOutput}>
            {copied ? "Copied!" : <><Copy className="w-4 h-4 mr-2" /> Copy JSON</>}
          </Button>
        </div>
        <Textarea 
          className="font-mono text-xs flex-1 min-h-[500px]" 
          readOnly 
          value={jsonOutput}
        />
      </div>
    </div>
  );
}
