import { notFound } from "next/navigation";
import { developerTools } from "@/data/tools";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { toolComponents } from "@/components/tools/registry";
import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = developerTools.find((t) => t.slug === slug);
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
  return developerTools.map((tool) => ({
    slug: tool.slug,
  }));
}

const FallbackComponent = () => <div className="p-8 text-center text-muted-foreground border border-dashed rounded-lg">This tool is currently under construction. Please check back later!</div>;

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = developerTools.find((t) => t.slug === slug);

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
