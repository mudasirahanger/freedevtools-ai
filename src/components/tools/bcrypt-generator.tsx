"use client";

import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, ShieldCheck, ShieldAlert } from "lucide-react";

export default function BcryptGenerator() {
  const [plainText, setPlainText] = useState<string>("");
  const [rounds, setRounds] = useState<number>(10);
  const [hash, setHash] = useState<string>("");
  const [isHashing, setIsHashing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Compare state
  const [comparePlain, setComparePlain] = useState<string>("");
  const [compareHash, setCompareHash] = useState<string>("");
  const [matchResult, setMatchResult] = useState<boolean | null>(null);

  const handleGenerate = () => {
    if (!plainText) return;
    setIsHashing(true);
    // Use timeout to allow UI to update (show loading state) before intensive hashing blocks main thread
    setTimeout(() => {
      try {
        const salt = bcrypt.genSaltSync(rounds);
        const generatedHash = bcrypt.hashSync(plainText, salt);
        setHash(generatedHash);
      } catch (e) {
        console.error("Error generating hash", e);
      } finally {
        setIsHashing(false);
      }
    }, 10);
  };

  const handleCompare = () => {
    if (!comparePlain || !compareHash) return;
    try {
      const isMatch = bcrypt.compareSync(comparePlain, compareHash);
      setMatchResult(isMatch);
    } catch (e) {
      setMatchResult(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto border rounded-xl overflow-hidden shadow-sm">
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="w-full grid grid-cols-2 rounded-none h-12">
          <TabsTrigger value="generate">Generate Hash</TabsTrigger>
          <TabsTrigger value="compare">Compare Hash</TabsTrigger>
        </TabsList>
        
        <div className="p-6">
          <TabsContent value="generate" className="space-y-6 mt-0">
            <div className="space-y-2">
              <Label>Plain Text String</Label>
              <Input 
                type="text" 
                placeholder="Enter string to hash..." 
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Cost Factor (Rounds)</Label>
                <span className="text-sm text-muted-foreground">{rounds}</span>
              </div>
              <Input 
                type="range" 
                min="4" 
                max="16" 
                value={rounds}
                onChange={(e) => setRounds(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">
                Higher cost = more secure, but slower. 10 or 12 is recommended.
              </p>
            </div>

            <Button className="w-full" onClick={handleGenerate} disabled={!plainText || isHashing}>
              {isHashing ? "Generating..." : "Generate Bcrypt Hash"}
            </Button>

            {hash && (
              <div className="p-4 bg-muted/50 rounded-lg border space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Generated Hash</Label>
                  <Button variant="outline" size="sm" onClick={handleCopy} disabled={!hash}>
                    {copied ? "Copied!" : <><Copy className="w-4 h-4 mr-2" /> Copy Hash</>}
                  </Button>
                </div>
                <code className="block p-3 bg-background rounded border break-all font-mono text-sm">
                  {hash}
                </code>
              </div>
            )}
          </TabsContent>

          <TabsContent value="compare" className="space-y-6 mt-0">
            <div className="space-y-2">
              <Label>Plain Text String</Label>
              <Input 
                type="text" 
                placeholder="Enter string..." 
                value={comparePlain}
                onChange={(e) => {
                  setComparePlain(e.target.value);
                  setMatchResult(null);
                }}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Bcrypt Hash</Label>
              <Input 
                type="text" 
                placeholder="$2a$10$..." 
                value={compareHash}
                onChange={(e) => {
                  setCompareHash(e.target.value);
                  setMatchResult(null);
                }}
                className="font-mono text-sm"
              />
            </div>

            <Button className="w-full" variant="secondary" onClick={handleCompare} disabled={!comparePlain || !compareHash}>
              Compare
            </Button>

            {matchResult !== null && (
              <div className={`p-4 flex items-center justify-center gap-3 rounded-lg border ${matchResult ? "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900" : "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900"}`}>
                {matchResult ? (
                  <>
                    <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <span className="font-semibold text-green-700 dark:text-green-300">Hashes Match!</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-6 h-6 text-red-600 dark:text-red-400" />
                    <span className="font-semibold text-red-700 dark:text-red-300">Do Not Match</span>
                  </>
                )}
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
