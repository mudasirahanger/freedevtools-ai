import React from "react";
import TopBannerAd from "@/components/adsense/TopBannerAd";
import InContentAd from "@/components/adsense/InContentAd";
import BottomAd from "@/components/adsense/BottomAd";
import { ToolMetadata } from "@/types/tool";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ToolLayoutProps {
  metadata: ToolMetadata;
  children: React.ReactNode;
}

export function ToolLayout({ metadata, children }: ToolLayoutProps) {
  return (
    <div className="flex flex-col max-w-5xl mx-auto gap-8">
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
                href={`/tools/${slug}`} // Assuming generic tools path for now, adjust in actual implementation if needed
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
