"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function RobotsTxtGenerator() {
  const [rules, setRules] = useState([{ userAgent: "*", disallow: "", allow: "" }]);
  const [sitemap, setSitemap] = useState("");

  const handleAddRule = () => {
    setRules([...rules, { userAgent: "", disallow: "", allow: "" }]);
  };

  const handleRemoveRule = (index: number) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], [field]: value };
    setRules(newRules);
  };

  const generateRobotsTxt = () => {
    let output = "";
    
    rules.forEach(rule => {
      if (!rule.userAgent) return;
      output += `User-agent: ${rule.userAgent}\n`;
      
      if (rule.disallow) {
        const disallowPaths = rule.disallow.split(',').map(p => p.trim()).filter(Boolean);
        disallowPaths.forEach(path => {
          output += `Disallow: ${path}\n`;
        });
      }
      
      if (rule.allow) {
        const allowPaths = rule.allow.split(',').map(p => p.trim()).filter(Boolean);
        allowPaths.forEach(path => {
          output += `Allow: ${path}\n`;
        });
      }
      output += "\n";
    });

    if (sitemap) {
      output += `Sitemap: ${sitemap}\n`;
    }

    return output.trim();
  };

  const output = generateRobotsTxt();

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard");
    }
  };

  const handleReset = () => {
    setRules([{ userAgent: "*", disallow: "", allow: "" }]);
    setSitemap("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Crawler Rules</h3>
            {rules.map((rule, index) => (
              <div key={index} className="space-y-3 p-4 bg-muted/30 rounded-lg border relative">
                {rules.length > 1 && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveRule(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
                <div className="space-y-2">
                  <Label>User-agent</Label>
                  <Input 
                    value={rule.userAgent} 
                    onChange={(e) => handleChange(index, "userAgent", e.target.value)} 
                    placeholder="e.g. * or Googlebot" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Disallow Paths (comma separated)</Label>
                  <Input 
                    value={rule.disallow} 
                    onChange={(e) => handleChange(index, "disallow", e.target.value)} 
                    placeholder="e.g. /admin/, /private/" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Allow Paths (comma separated)</Label>
                  <Input 
                    value={rule.allow} 
                    onChange={(e) => handleChange(index, "allow", e.target.value)} 
                    placeholder="e.g. /public/, /assets/" 
                  />
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={handleAddRule} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Another Rule
            </Button>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <Label>Sitemap URL</Label>
              <Input 
                value={sitemap} 
                onChange={(e) => setSitemap(e.target.value)} 
                placeholder="https://example.com/sitemap.xml" 
              />
            </div>
          </div>

          <Button variant="outline" onClick={handleReset} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>

        <div className="space-y-2 h-full flex flex-col">
          <Label>Generated robots.txt</Label>
          <Textarea
            readOnly
            className="flex-1 min-h-[300px] font-mono text-sm bg-muted/50 whitespace-pre"
            value={output}
          />
          <Button variant="secondary" onClick={handleCopy} className="w-full mt-2">
            <Copy className="mr-2 h-4 w-4" /> Copy robots.txt
          </Button>
        </div>
      </div>
    </div>
  );
}
