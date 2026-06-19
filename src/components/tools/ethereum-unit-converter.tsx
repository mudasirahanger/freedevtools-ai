"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EthereumUnitConverter() {
  const [wei, setWei] = useState("1000000000000000000");
  const [gwei, setGwei] = useState("1000000000");
  const [ether, setEther] = useState("1");

  // Keep track of which input was last modified to prevent circular updates
  const lastModified = useRef<"wei" | "gwei" | "ether">("ether");

  // Safe decimal string multiplier for bigints
  const multiplyByDecimals = (valStr: string, decimals: number) => {
    try {
      if (!valStr || valStr === ".") return "0";
      const parts = valStr.split(".");
      const integerPart = parts[0] || "0";
      let fractionalPart = parts[1] || "";
      
      if (fractionalPart.length > decimals) {
        fractionalPart = fractionalPart.substring(0, decimals);
      } else {
        fractionalPart = fractionalPart.padEnd(decimals, "0");
      }
      return BigInt(integerPart + fractionalPart).toString();
    } catch {
      return "0";
    }
  };

  // Safe string division to decimals
  const divideToDecimals = (valStr: string, decimals: number) => {
    try {
      if (!valStr) return "0";
      const str = valStr.padStart(decimals + 1, "0");
      const integerPart = str.slice(0, -decimals) || "0";
      const fractionalPart = str.slice(-decimals).replace(/0+$/, "");
      return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
    } catch {
      return "0";
    }
  };

  const handleWeiChange = (val: string) => {
    lastModified.current = "wei";
    setWei(val);
    
    // Convert Wei to Gwei
    setGwei(divideToDecimals(val, 9));
    
    // Convert Wei to Ether
    setEther(divideToDecimals(val, 18));
  };

  const handleGweiChange = (val: string) => {
    lastModified.current = "gwei";
    setGwei(val);
    
    // Convert Gwei to Wei
    setWei(multiplyByDecimals(val, 9));
    
    // Convert Gwei to Ether
    setEther(divideToDecimals(val, 9));
  };

  const handleEtherChange = (val: string) => {
    lastModified.current = "ether";
    setEther(val);
    
    // Convert Ether to Wei
    setWei(multiplyByDecimals(val, 18));
    
    // Convert Ether to Gwei
    setGwei(multiplyByDecimals(val, 9));
  };

  // Restrict input to numbers and a single decimal point
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
    if (allowedKeys.includes(e.key)) return;
    
    if (e.key === ".") {
      if ((e.target as HTMLInputElement).value.includes(".")) {
        e.preventDefault();
      }
      return;
    }
    
    if (!/^[0-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 bg-card p-6 rounded-xl border shadow-sm">
      <div className="space-y-2">
        <Label className="text-lg">Wei</Label>
        <Input 
          type="text" 
          value={wei} 
          onChange={(e) => handleWeiChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="text-lg font-mono py-6"
          placeholder="0"
        />
        <p className="text-sm text-muted-foreground">The smallest denomination of Ether</p>
      </div>

      <div className="space-y-2">
        <Label className="text-lg">Gwei</Label>
        <Input 
          type="text" 
          value={gwei} 
          onChange={(e) => handleGweiChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="text-lg font-mono py-6"
          placeholder="0"
        />
        <p className="text-sm text-muted-foreground">Typically used for measuring gas prices (1 Gwei = 10^9 Wei)</p>
      </div>

      <div className="space-y-2">
        <Label className="text-lg">Ether</Label>
        <Input 
          type="text" 
          value={ether} 
          onChange={(e) => handleEtherChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="text-lg font-mono py-6"
          placeholder="0"
        />
        <p className="text-sm text-muted-foreground">The main denomination (1 Ether = 10^18 Wei)</p>
      </div>
    </div>
  );
}
