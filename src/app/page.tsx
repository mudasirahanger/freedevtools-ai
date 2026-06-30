import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { developerTools } from "@/data/tools";
import { aiPromptGenerators } from "@/data/ai-prompts";
import { seoTools } from "@/data/seo-tools";
import { Wrench, Sparkles, LineChart } from "lucide-react";
import TopBannerAd from "@/components/adsense/TopBannerAd";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <section className="text-center space-y-4 max-w-3xl mx-auto mt-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
          Free Developer Tools & AI Prompt Generators
        </h1>
        <p className="text-lg text-muted-foreground">
          Format JSON, decode JWTs, generate UUIDs, test regex, convert timestamps, and create powerful AI prompts for coding, debugging, UI design, APIs, databases, and full-stack projects.
        </p>
      </section>

      <TopBannerAd />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Developer Tools Category */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-2">
            <Wrench className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Developer Tools</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {developerTools.slice(0, 10).map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="block transition-transform hover:scale-[1.02]">
                <Card className="h-full hover:border-primary/50">
                  <CardHeader>
                    <CardTitle className="text-base">{tool.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{tool.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center pt-2">
            <Link href="/tools" className="text-sm font-medium text-primary hover:underline">
              View all {developerTools.length} Developer Tools &rarr;
            </Link>
          </div>
        </section>

        {/* AI Prompt Generators Category */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">AI Prompts</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {aiPromptGenerators.slice(0, 10).map((tool) => (
              <Link key={tool.slug} href={`/ai-prompt-generators/${tool.slug}`} className="block transition-transform hover:scale-[1.02]">
                <Card className="h-full hover:border-primary/50">
                  <CardHeader>
                    <CardTitle className="text-base">{tool.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{tool.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center pt-2">
            <Link href="/ai-prompt-generators" className="text-sm font-medium text-primary hover:underline">
              View all {aiPromptGenerators.length} AI Prompts &rarr;
            </Link>
          </div>
        </section>

        {/* SEO Tools Category */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-2">
            <LineChart className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">SEO & Web Tools</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {seoTools.map((tool) => (
              <Link key={tool.slug} href={`/seo-tools/${tool.slug}`} className="block transition-transform hover:scale-[1.02]">
                <Card className="h-full hover:border-primary/50">
                  <CardHeader>
                    <CardTitle className="text-base">{tool.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{tool.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center pt-2">
            <Link href="/seo-tools" className="text-sm font-medium text-primary hover:underline">
              View all {seoTools.length} SEO Tools &rarr;
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
