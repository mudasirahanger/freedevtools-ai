import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { seoTools } from "@/data/seo-tools";
import { LineChart } from "lucide-react";
import TopBannerAd from "@/components/adsense/TopBannerAd";

export const metadata = {
  title: "SEO & Web Tools",
  description: "Free SEO tools including Meta Tag Generator, Open Graph Preview, Robots.txt Generator, and more.",
};

export default function SeoToolsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl flex items-center gap-3">
          <LineChart className="h-8 w-8 text-primary" />
          SEO & Web Tools
        </h1>
        <p className="text-lg text-muted-foreground">
          Boost your website visibility and configure core SEO settings with these fast, client-side tools.
        </p>
      </section>

      <TopBannerAd />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {seoTools.map((tool) => (
          <Link key={tool.slug} href={`/seo-tools/${tool.slug}`} className="transition-transform hover:scale-[1.02]">
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
