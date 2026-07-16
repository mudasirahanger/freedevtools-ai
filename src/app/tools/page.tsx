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

      <section className="mt-12 space-y-6 prose dark:prose-invert max-w-none">
        <h2>Essential Free Developer Tools &amp; Utilities</h2>
        <p>
          Welcome to our comprehensive suite of <strong>free developer tools</strong>, designed to streamline your daily coding workflow. From debugging API responses to hashing passwords and formatting messy code, this collection of web-based utilities is built specifically for software engineers, web developers, and IT professionals.
        </p>
        <p>
          Our tools execute entirely on the client-side (within your web browser). This means that any sensitive data you paste&mdash;such as JWTs containing user information, proprietary JSON payloads, or database connection strings&mdash;never leaves your device. We prioritize your privacy and data security above all else.
        </p>
        <h3>Popular Developer Utilities</h3>
        <ul>
          <li><strong>Data Formatters &amp; Validators:</strong> Instantly beautify, minify, and validate JSON, HTML, CSS, JavaScript, and SQL. Say goodbye to syntax errors caused by missing commas or brackets.</li>
          <li><strong>Encoders &amp; Decoders:</strong> Seamlessly encode or decode Base64 strings, URL components, and inspect JSON Web Tokens (JWT) to verify payload claims and expiration times.</li>
          <li><strong>Generators:</strong> Quickly generate secure UUIDs (v4), strong randomized passwords, secure hashes (bcrypt, SHA-256), and even Cron expressions for your background jobs.</li>
        </ul>
        <p>
          Bookmark this page and use these lightweight, fast, and secure developer utilities to eliminate friction in your software development lifecycle. No login required, and completely free to use.
        </p>
      </section>
    </div>
  );
}
