import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { aiPromptGenerators } from "@/data/ai-prompts";
import { Sparkles } from "lucide-react";
import TopBannerAd from "@/components/adsense/TopBannerAd";

export const metadata = {
  title: "AI Prompt Generators",
  description: "Free template-based AI prompt generators for coding, debugging, UI design, APIs, databases, and more.",
};

export default function AIPromptsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-primary" />
          AI Prompt Generators
        </h1>
        <p className="text-lg text-muted-foreground">
          Create highly effective, context-rich prompts for any AI model without paying for APIs. Generate prompts locally and paste them into your favorite AI tool.
        </p>
      </section>

      <TopBannerAd />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {aiPromptGenerators.map((tool) => (
          <Link key={tool.slug} href={`/ai-prompt-generators/${tool.slug}`} className="transition-transform hover:scale-[1.02]">
            <Card className="h-full hover:border-primary/50">
              <CardHeader>
                <CardTitle className="text-base">{tool.title}</CardTitle>
                <CardDescription className="text-sm">{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
