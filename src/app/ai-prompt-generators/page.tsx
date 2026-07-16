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
          <Card key={tool.slug} className="h-full hover:border-primary/50 relative transition-transform hover:scale-[1.02]">
            <Link href={`/ai-prompt-generators/${tool.slug}`} className="absolute inset-0 z-10">
              <span className="sr-only">View {tool.title}</span>
            </Link>
            <CardHeader className="relative z-20 pointer-events-none">
              <CardTitle className="text-base">{tool.title}</CardTitle>
              <CardDescription className="text-sm">{tool.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      
      <section className="mt-12 space-y-6 prose dark:prose-invert max-w-none">
        <h2>Why Use Our Free AI Prompt Generators?</h2>
        <p>
          Crafting the perfect prompt for AI models like ChatGPT, Claude, and Gemini can be a daunting task. Whether you are a developer looking to generate clean boilerplate code, a database administrator needing complex SQL schemas, or a UI/UX designer searching for layout inspiration, our <strong>AI Prompt Generators</strong> provide you with the exact structure and context you need to get the best responses.
        </p>
        <p>
          Instead of paying for expensive wrapper applications or API credits, you can use our client-side generators for free. Simply fill out a few parameters specific to your use-case, and we&apos;ll instantly generate a highly optimized, context-rich prompt. You can then copy and paste this prompt directly into your preferred AI chat interface. 
        </p>
        <h3>Common Use Cases</h3>
        <ul>
          <li><strong>Code Generation &amp; Refactoring:</strong> Generate accurate code snippets in React, Laravel, Node.js, and more by providing specific constraints and desired outputs.</li>
          <li><strong>Debugging &amp; Troubleshooting:</strong> Create detailed bug-report prompts that help AI pinpoint the exact source of your errors, including log traces and environment context.</li>
          <li><strong>Database Architecture:</strong> Instantly draft prompts that guide AI models in generating optimized PostgreSQL or MySQL schemas tailored to your business logic.</li>
        </ul>
        <p>
          By using our free AI prompt templates, you bypass the trial-and-error phase of prompting and achieve better, more deterministic results from Large Language Models (LLMs).
        </p>
      </section>
    </div>
  );
}
