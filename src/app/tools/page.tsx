import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { developerTools } from "@/data/tools";
import { Wrench } from "lucide-react";
import TopBannerAd from "@/components/adsense/TopBannerAd";

export const metadata = {
  title: "Developer Tools",
  description: "Free online developer tools including JSON formatters, Encoders, Decoders, Hash generators, and more.",
};

export default function ToolsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl flex items-center gap-3">
          <Wrench className="h-8 w-8 text-primary" />
          Developer Tools
        </h1>
        <p className="text-lg text-muted-foreground">
          A collection of free, client-side, fast developer utilities to help you build and debug software.
        </p>
      </section>

      <TopBannerAd />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {developerTools.map((tool) => (
          <Card key={tool.slug} className="h-full hover:border-primary/50 relative transition-transform hover:scale-[1.02]">
            <Link href={`/tools/${tool.slug}`} className="absolute inset-0 z-10">
              <span className="sr-only">View {tool.title}</span>
            </Link>
            <CardHeader className="relative z-20 pointer-events-none">
              <CardTitle className="text-base">{tool.title}</CardTitle>
              <CardDescription className="text-sm">{tool.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
