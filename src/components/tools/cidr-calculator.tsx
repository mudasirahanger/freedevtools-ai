"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

function isValidIPv4(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) >= 0 && Number(part) <= 255);
}

function ipToInt(ip: string): number {
  return ip.split(".").reduce((acc, octet) => (acc << 8) + Number(octet), 0) >>> 0;
}

function intToIp(int: number): string {
  return [24, 16, 8, 0].map((shift) => (int >>> shift) & 0xff).join(".");
}

interface CidrResult {
  networkAddress: string;
  broadcastAddress: string;
  subnetMask: string;
  wildcardMask: string;
  firstUsable: string;
  lastUsable: string;
  totalAddresses: number;
  usableHosts: number;
  cidrNotation: string;
}

function calculateCidr(ip: string, prefix: number): CidrResult {
  const maskInt = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const ipInt = ipToInt(ip);
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
  const totalAddresses = Math.pow(2, 32 - prefix);

  let firstUsable: string;
  let lastUsable: string;
  let usableHosts: number;

  if (prefix >= 31) {
    // /31 (point-to-point, RFC 3021) and /32 (single host) have no separate network/broadcast usable split.
    firstUsable = intToIp(networkInt);
    lastUsable = intToIp(broadcastInt);
    usableHosts = prefix === 32 ? 1 : 2;
  } else {
    firstUsable = intToIp(networkInt + 1);
    lastUsable = intToIp(broadcastInt - 1);
    usableHosts = totalAddresses - 2;
  }

  return {
    networkAddress: intToIp(networkInt),
    broadcastAddress: intToIp(broadcastInt),
    subnetMask: intToIp(maskInt),
    wildcardMask: intToIp(~maskInt >>> 0),
    firstUsable,
    lastUsable,
    totalAddresses,
    usableHosts,
    cidrNotation: `${intToIp(networkInt)}/${prefix}`,
  };
}

function ResultRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between border-b py-2 last:border-b-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-mono text-sm font-semibold">{value}</span>
    </div>
  );
}

export default function CidrCalculator() {
  const [input, setInput] = useState("192.168.1.10/24");

  const { result, error } = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return { result: null, error: null };

    const [ip, prefixStr] = trimmed.split("/");
    if (!ip || prefixStr === undefined) {
      return { result: null, error: "Enter an address in CIDR notation, e.g. 192.168.1.0/24." };
    }
    if (!isValidIPv4(ip)) {
      return { result: null, error: `"${ip}" is not a valid IPv4 address.` };
    }
    const prefix = Number(prefixStr);
    if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
      return { result: null, error: "Prefix length must be a number between 0 and 32." };
    }

    return { result: calculateCidr(ip, prefix), error: null };
  }, [input]);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label>CIDR Notation</Label>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono text-lg"
          placeholder="192.168.1.0/24"
        />
      </div>

      {error && (
        <p className="text-destructive text-sm flex items-center gap-1">
          <AlertCircle className="w-4 h-4" /> {error}
        </p>
      )}

      {result && (
        <div className="bg-muted/30 border rounded-lg p-4">
          <ResultRow label="Network Address" value={result.networkAddress} />
          <ResultRow label="Broadcast Address" value={result.broadcastAddress} />
          <ResultRow label="Subnet Mask" value={result.subnetMask} />
          <ResultRow label="Wildcard Mask" value={result.wildcardMask} />
          <ResultRow label="First Usable Host" value={result.firstUsable} />
          <ResultRow label="Last Usable Host" value={result.lastUsable} />
          <ResultRow label="Total Addresses" value={result.totalAddresses.toLocaleString()} />
          <ResultRow label="Usable Hosts" value={result.usableHosts.toLocaleString()} />
        </div>
      )}
    </div>
  );
}
