"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon, Wrench, Search, Code2 } from "lucide-react";
import { developerTools } from "@/data/tools";
import { aiPromptGenerators } from "@/data/ai-prompts";
import { seoTools } from "@/data/seo-tools";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Combine all tools with their respective paths and icons
const allTools = [
  ...developerTools.map(t => ({ ...t, href: `/tools/${t.slug}`, icon: Wrench })),
  ...aiPromptGenerators.map(t => ({ ...t, href: `/ai-prompt-generators/${t.slug}`, icon: Code2 })),
  ...seoTools.map(t => ({ ...t, href: `/seo-tools/${t.slug}`, icon: Search }))
];

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filteredTools = allTools.filter((tool) =>
    tool.title.toLowerCase().includes(query.toLowerCase()) ||
    tool.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full sm:w-64 md:w-80">
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tools..."
          className="w-full bg-background pl-9 md:w-[300px]"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
      </div>

      {open && query.length > 0 && (
        <div className="absolute top-full mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none z-50">
          <div className="max-h-[300px] overflow-y-auto p-1">
            {filteredTools.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No tools found.
              </div>
            ) : (
              filteredTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.slug}
                    onClick={() => {
                      router.push(tool.href);
                      setOpen(false);
                      setQuery("");
                    }}
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                  >
                    <Icon className="mr-2 h-4 w-4 opacity-50" />
                    <span>{tool.title}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
