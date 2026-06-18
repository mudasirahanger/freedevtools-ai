"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const generatePassword = useCallback(() => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (!chars) {
      setPassword("Please select at least one character type.");
      return;
    }

    let generated = "";
    const randomArray = new Uint32Array(length[0]);
    crypto.getRandomValues(randomArray);

    for (let i = 0; i < length[0]; i++) {
      generated += chars[randomArray[i] % chars.length];
    }
    setPassword(generated);
  }, [length, uppercase, lowercase, numbers, symbols]);

  useEffect(() => {
    // eslint-disable-next-line
    generatePassword();
  }, []);

  const handleCopy = () => {
    if (password && password !== "Please select at least one character type.") {
      navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard");
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="bg-muted/30 p-6 rounded-xl border flex flex-col justify-center items-center text-center space-y-6">
        <h3 className="text-xl font-bold">Your Secure Password</h3>
        
        <div className="w-full bg-background border rounded-lg p-4 break-all text-center font-mono text-xl min-h-[80px] flex items-center justify-center shadow-inner text-primary">
          {password}
        </div>
        
        <div className="flex gap-4 w-full sm:w-auto">
          <Button size="lg" onClick={handleCopy} className="flex-1">
            <Copy className="mr-2 h-5 w-5" /> Copy
          </Button>
          <Button size="lg" variant="outline" onClick={generatePassword} className="flex-1">
            <RefreshCw className="mr-2 h-5 w-5" /> Regenerate
          </Button>
        </div>
      </div>

      <div className="space-y-6 bg-muted/10 p-6 rounded-xl border">
        <div className="space-y-4">
          <div className="flex justify-between">
            <Label className="text-base">Password Length</Label>
            <span className="font-mono font-bold text-primary">{length[0]}</span>
          </div>
          <Slider 
            value={length} 
            onValueChange={(val) => setLength(val as number[])} 
            max={64} 
            min={4} 
            step={1} 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="uppercase" 
              checked={uppercase} 
              onCheckedChange={(c: boolean | string) => setUppercase(c as boolean)} 
            />
            <Label htmlFor="uppercase" className="cursor-pointer">Uppercase (A-Z)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="lowercase" 
              checked={lowercase} 
              onCheckedChange={(c: boolean | string) => setLowercase(c as boolean)} 
            />
            <Label htmlFor="lowercase" className="cursor-pointer">Lowercase (a-z)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="numbers" 
              checked={numbers} 
              onCheckedChange={(c: boolean | string) => setNumbers(c as boolean)} 
            />
            <Label htmlFor="numbers" className="cursor-pointer">Numbers (0-9)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="symbols" 
              checked={symbols} 
              onCheckedChange={(c: boolean | string) => setSymbols(c as boolean)} 
            />
            <Label htmlFor="symbols" className="cursor-pointer">Symbols (!@#$)</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
