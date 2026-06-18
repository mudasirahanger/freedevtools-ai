import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wrench } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Wrench className="h-6 w-6" />
            <span className="font-bold sm:inline-block">FreeDevTools AI</span>
          </Link>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/tools"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Developer Tools
          </Link>
          <Link
            href="/ai-prompt-generators"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            AI Prompts
          </Link>
          <Link
            href="/seo-tools"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            SEO Tools
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
