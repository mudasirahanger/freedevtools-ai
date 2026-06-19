import { notFound } from "next/navigation";
import { seoTools } from "@/data/seo-tools";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { toolComponents } from "@/components/tools/registry";
import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = seoTools.find((t) => t.slug === slug);
  if (!tool) return {};

  return {
    title: tool.metaTitle || tool.title,
    description: tool.metaDescription || tool.description,
    alternates: {
      canonical: `${SITE_NAME === "FreeDevTools AI" ? "https://freedevtools.ai" : "http://localhost:3000"}/seo-tools/${slug}`,
    },
    openGraph: {
      title: tool.metaTitle || tool.title,
      description: tool.metaDescription || tool.description,
      siteName: SITE_NAME,
      type: "website",
      url: `${SITE_NAME === "FreeDevTools AI" ? "https://freedevtools.ai" : "http://localhost:3000"}/seo-tools/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle || tool.title,
      description: tool.metaDescription || tool.description,
    },
  };
}

export async function generateStaticParams() {
  return seoTools.map((tool) => ({
    slug: tool.slug,
  }));
}

const FallbackComponent = () => <div className="p-8 text-center text-muted-foreground border border-dashed rounded-lg">This tool is currently under construction. Please check back later!</div>;

export default async function SeoToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = seoTools.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = toolComponents[slug] || FallbackComponent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.title,
    "description": tool.description,
    "applicationCategory": "SEOApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout metadata={tool}>
        <ToolComponent />
      </ToolLayout>
    </>
  );
}
