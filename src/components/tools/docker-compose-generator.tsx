"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, FileBox } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function DockerComposeGenerator() {
  const [appName, setAppName] = useState("my-app");
  const [port, setPort] = useState("3000");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!appName || !port) {
      toast.error("Please provide an app name and port.");
      return;
    }
    
    const yaml = `version: '3.8'
services:
  ${appName}:
    build: .
    ports:
      - "${port}:${port}"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
`;
    setOutput(yaml);
    toast.success("docker-compose.yml generated!");
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast("Copied to clipboard");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>App Service Name</Label>
            <Input
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="e.g. web, api, my-app"
            />
          </div>
          <div className="space-y-2">
            <Label>App Port</Label>
            <Input
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="e.g. 3000, 8080"
            />
          </div>
          <Button onClick={handleGenerate} className="w-full">
            <FileBox className="mr-2 h-4 w-4" /> Generate Compose File
          </Button>
        </div>

        <div className="space-y-2 h-full flex flex-col">
          <Label>docker-compose.yml</Label>
          <Textarea
            readOnly
            className="flex-1 min-h-[300px] font-mono text-sm bg-muted/50"
            value={output}
            placeholder="Generated docker-compose.yml will appear here."
          />
          <Button variant="secondary" onClick={handleCopy} disabled={!output} className="w-full">
            <Copy className="mr-2 h-4 w-4" /> Copy YAML
          </Button>
        </div>
      </div>
    </div>
  );
}
