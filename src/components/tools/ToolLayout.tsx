import React from "react";
import TopBannerAd from "@/components/adsense/TopBannerAd";
import InContentAd from "@/components/adsense/InContentAd";
import BottomAd from "@/components/adsense/BottomAd";
import { ToolMetadata } from "@/types/tool";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SITE_URL } from "@/lib/constants";
import { developerTools } from "@/data/tools";
import { aiPromptGenerators } from "@/data/ai-prompts";
import { seoTools } from "@/data/seo-tools";

interface ToolLayoutProps {
  metadata: ToolMetadata;
  children: React.ReactNode;
  /** Section label shown in the breadcrumb, e.g. "Developer Tools" */
  sectionLabel: string;
  /** Section index path, e.g. "/tools" */
  sectionHref: string;
}

// Look up which section (and therefore which URL prefix) a given slug
// actually belongs to, instead of assuming every related tool lives
// under the current section.
function resolveToolHref(slug: string): string {
  if (developerTools.some((t) => t.slug === slug)) return `/tools/${slug}`;
  if (aiPromptGenerators.some((t) => t.slug === slug)) return `/ai-prompt-generators/${slug}`;
  if (seoTools.some((t) => t.slug === slug)) return `/seo-tools/${slug}`;
  // Fall back to /tools/ if the slug isn't found in any registry yet.
  return `/tools/${slug}`;
}

export function ToolLayout({ metadata, children, sectionLabel, sectionHref }: ToolLayoutProps) {
  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: sectionLabel, url: `${SITE_URL}${sectionHref}` },
    { name: metadata.title, url: `${SITE_URL}${resolveToolHref(metadata.slug)}` },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };

  const faqJsonLd = metadata.faqs && metadata.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": metadata.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      }
    : null;

  return (
    <div className="flex flex-col max-w-5xl mx-auto gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Breadcrumb trail */}
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          <li className="flex items-center gap-1">
            <Link href="/" className="hover:text-foreground hover:underline">Home</Link>
            <span aria-hidden="true">/</span>
          </li>
          <li className="flex items-center gap-1">
            <Link href={sectionHref} className="hover:text-foreground hover:underline">{sectionLabel}</Link>
            <span aria-hidden="true">/</span>
          </li>
          <li aria-current="page" className="text-foreground font-medium">
            {metadata.title}
          </li>
        </ol>
      </nav>

      {/* Header section */}
      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          {metadata.title}
        </h1>
        <p className="text-lg text-muted-foreground">{metadata.description}</p>
      </section>

      <TopBannerAd />

      {/* Main Tool UI area */}
      <section className="bg-card rounded-xl border shadow-sm p-4 sm:p-6">
        {children}
      </section>

      <InContentAd />

      {/* How to use & Privacy Note */}
      <section className="space-y-4">
        <div className="bg-muted p-4 rounded-lg text-sm mb-6 max-w-none">
          <strong>Privacy Note:</strong> This tool runs entirely in your browser. No data is sent to or stored on our servers.
        </div>
        
        {metadata.longDescription && (
          <div className="prose dark:prose-invert max-w-none mt-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {metadata.longDescription}
            </ReactMarkdown>
          </div>
        )}
        
        {metadata.faqs && metadata.faqs.length > 0 && (
          <div className="mt-12 w-full max-w-none space-y-4 prose dark:prose-invert">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <Accordion className="w-full not-prose">
              {metadata.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </section>

      {/* Related Tools */}
      {metadata.relatedTools && metadata.relatedTools.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {metadata.relatedTools.map((slug) => (
              <Link
                key={slug}
                href={resolveToolHref(slug)}
                className="text-primary hover:underline text-sm font-medium"
              >
                {slug.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </section>
      )}

      <BottomAd />
    </div>
  );
}
