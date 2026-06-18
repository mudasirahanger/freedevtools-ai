import { notFound } from "next/navigation";
import { aiPromptGenerators } from "@/data/ai-prompts";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { toolComponents } from "@/components/tools/registry";
import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = aiPromptGenerators.find((t) => t.slug === slug);
  if (!tool) return {};

  return {
    title: tool.metaTitle || tool.title,
    description: tool.metaDescription || tool.description,
    openGraph: {
      title: tool.metaTitle || tool.title,
      description: tool.metaDescription || tool.description,
      siteName: SITE_NAME,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  return aiPromptGenerators.map((tool) => ({
    slug: tool.slug,
  }));
}

const FallbackComponent = () => <div className="p-8 text-center text-muted-foreground border border-dashed rounded-lg">This tool is currently under construction. Please check back later!</div>;

export default async function AIPromptPage({ params }: Props) {
  const { slug } = await params;
  const tool = aiPromptGenerators.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = toolComponents[slug] || FallbackComponent;

  return (
    <ToolLayout metadata={tool}>
      <ToolComponent />
    </ToolLayout>
  );
}
