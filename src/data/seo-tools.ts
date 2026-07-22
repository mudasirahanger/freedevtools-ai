import { ToolMetadata } from "@/types/tool";

export const seoTools: ToolMetadata[] = [
  {
    title: "Meta Tag Generator",
    slug: "meta-tag-generator",
    category: "SEO Tools",
    description: "Generate HTML meta tags for SEO and social sharing.",
    metaTitle: "Free Meta Tag Generator Online",
    metaDescription: "Generate title, meta description, Open Graph, and Twitter Card tags for any page. Copy the ready-to-paste HTML instantly, no signup required.",
    longDescription: `
## Why meta tags still matter

Title tags and meta descriptions are what searchers actually read in Google's results, and Open Graph / Twitter Card tags control how your links look when shared on social media. Getting these wrong — missing, duplicated, or too long — directly hurts click-through rate even when your rankings are fine.

### What this generator produces

* A **title tag** sized for the ~50-60 character display limit
* A **meta description** sized for the ~150-160 character snippet limit
* **Open Graph** (\`og:title\`, \`og:description\`, \`og:image\`, \`og:url\`) tags for Facebook/LinkedIn
* **Twitter Card** tags for rich previews on X/Twitter

Fill in your page details once and copy the complete \`<head>\` snippet.
`,
    faqs: [
      {
        question: "What's the ideal length for a meta description?",
        answer: "Aim for roughly 150-160 characters. Google typically truncates longer descriptions with an ellipsis in search results."
      },
      {
        question: "Do I need both Open Graph and Twitter Card tags?",
        answer: "Yes. Open Graph tags are used by Facebook, LinkedIn, and most link-preview services, while Twitter Card tags specifically control how links render on X/Twitter."
      }
    ],
  },
  {
    title: "Robots.txt Generator",
    slug: "robots-txt-generator",
    category: "SEO Tools",
    description: "Generate robots.txt files to guide search engine crawlers.",
    metaTitle: "Free Robots.txt Generator Online",
    metaDescription: "Generate a valid robots.txt file with custom Allow/Disallow rules and sitemap reference. Copy and download instantly for any website.",
    longDescription: `
## What robots.txt actually controls

\`robots.txt\` is a plain-text file at your domain root that tells well-behaved crawlers which paths they may or may not request. It does not remove pages from search results by itself (use \`noindex\` for that) and it isn't a security mechanism — it's a courtesy instruction that most major search engines respect.

### Common use cases

* Blocking crawler access to admin panels or staging paths
* Preventing duplicate-content crawling of filtered/sorted URL variants
* Pointing crawlers to your sitemap with the \`Sitemap:\` directive

This generator builds a syntactically correct robots.txt from simple Allow/Disallow rules you specify.
`,
    faqs: [
      {
        question: "Does robots.txt prevent a page from appearing in Google?",
        answer: "Not reliably. Disallowing a URL stops crawling, but a page can still be indexed (e.g. from external links) without its content being crawled. Use a noindex meta tag if you need a page fully removed from search results."
      },
      {
        question: "Where do I put the generated robots.txt file?",
        answer: "Save it as robots.txt in the root of your domain (e.g. https://example.com/robots.txt) — it won't be recognized anywhere else."
      }
    ],
  },
  {
    title: "Open Graph Preview",
    slug: "open-graph-preview",
    category: "SEO Tools",
    description: "Preview how your URLs will look when shared on social media.",
    metaTitle: "Free Open Graph & Twitter Card Preview Tool",
    metaDescription: "Preview exactly how your page will look when shared on Facebook, LinkedIn, and X/Twitter before you publish. Catch missing tags instantly.",
    longDescription: `
## Catch broken share previews before you publish

A missing or malformed \`og:image\`, \`og:title\`, or Twitter Card tag means your link shows up blank or generic when someone shares it — a real, measurable hit to click-through rate on social platforms. This tool renders a live preview of how your URL's Open Graph and Twitter Card tags will actually display.

### What gets checked

* Presence and dimensions of \`og:image\`
* Length and content of \`og:title\` and \`og:description\`
* Whether Twitter Card metadata is present and correctly typed

Paste a URL or raw meta tags to see the rendered card before you ship.
`,
    faqs: [
      {
        question: "What image size should og:image be?",
        answer: "The commonly recommended size is 1200x630 pixels, which renders correctly as a large card on both Facebook and X/Twitter."
      },
      {
        question: "Why does my link still show old preview data after I updated my tags?",
        answer: "Social platforms cache Open Graph data aggressively. Use each platform's own debugger (e.g. Facebook Sharing Debugger) to force a re-scrape after making changes."
      }
    ],
  },
  {
    title: "XML Sitemap Generator",
    slug: "xml-sitemap-generator",
    category: "SEO Tools",
    description: "Generate XML sitemaps for submitting to search engines.",
    metaTitle: "Free XML Sitemap Generator Online",
    metaDescription: "Generate a valid XML sitemap from a list of URLs, complete with lastmod, changefreq, and priority fields, ready to submit to Google.",
    longDescription: `
## What a sitemap actually does

An XML sitemap is a discovery aid, not a ranking factor — it lists your URLs so search engines can find pages that might otherwise take longer to discover through crawling and internal links alone. It's especially useful for large sites, new sites with few backlinks, or pages that are hard to reach through normal navigation.

### What this generator produces

* A valid \`<urlset>\` XML document per the sitemaps.org protocol
* Optional \`lastmod\`, \`changefreq\`, and \`priority\` fields per URL
* Output ready to upload as \`sitemap.xml\` and submit via Google Search Console

Paste your list of URLs and download a submission-ready sitemap file.
`,
    faqs: [
      {
        question: "Does having a sitemap improve my search rankings?",
        answer: "Not directly. A sitemap helps search engines discover and crawl your pages more efficiently, but it doesn't influence ranking on its own."
      },
      {
        question: "How many URLs can one sitemap file contain?",
        answer: "Up to 50,000 URLs or 50MB uncompressed per the sitemap protocol. Larger sites should split URLs across multiple sitemap files linked from a sitemap index."
      }
    ],
  },
  {
    title: "UTM Builder",
    slug: "utm-builder",
    category: "SEO Tools",
    description: "Build custom UTM tracking URLs for your marketing campaigns.",
    metaTitle: "Free UTM Campaign URL Builder Online",
    metaDescription: "Build UTM-tagged campaign URLs with source, medium, campaign, term, and content parameters for accurate tracking in Google Analytics.",
    longDescription: `
## Track campaigns without guessing where traffic came from

UTM parameters (\`utm_source\`, \`utm_medium\`, \`utm_campaign\`, etc.) appended to a URL let analytics tools like Google Analytics attribute traffic to the specific campaign, channel, or email that drove the click — instead of lumping it into generic "referral" or "direct" traffic.

### Parameters this builder covers

* **utm_source:** where the traffic originates (newsletter, twitter, google)
* **utm_medium:** the marketing medium (email, cpc, social)
* **utm_campaign:** the specific campaign name
* **utm_term / utm_content:** optional fields for keyword or ad-variant tracking

Fill in the fields and get a clean, correctly encoded tracking URL ready to share.
`,
    faqs: [
      {
        question: "Will UTM parameters affect my page's SEO?",
        answer: "No, but you should canonicalize UTM-tagged URLs back to the clean version so search engines don't treat them as separate duplicate pages."
      },
      {
        question: "What's the difference between utm_source and utm_medium?",
        answer: "utm_source identifies the specific referrer (e.g. \"newsletter\"), while utm_medium identifies the general channel type (e.g. \"email\"). Together they let you filter traffic at both a broad and specific level."
      }
    ],
  }
];
