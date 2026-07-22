## SEO Audit Report

**Site**: FreeDevTools AI (https://freedevtoolsai.com/)
**Scope**: Codebase audit (Next.js App Router source)
**Pages/templates analyzed**: 16 route files covering 58 dynamic tool/generator pages + 8 static pages
**Overall score**: 68/100 — good technical foundation, held back by inconsistent content depth and a few missing SEO fundamentals

### Critical issues (must fix)

- [ ] No `og:image` / `twitter:image` anywhere in the site — root layout, and all three dynamic route templates (`tools/[slug]`, `ai-prompt-generators/[slug]`, `seo-tools/[slug]`) omit an image in their Open Graph and Twitter card metadata. Every shared link will render as a blank/generic card on social platforms and in some search result previews. — `src/app/layout.tsx:21-32`, `src/app/tools/[slug]/page.tsx:23-34`, `src/app/ai-prompt-generators/[slug]/page.tsx`, `src/app/seo-tools/[slug]/page.tsx`
- [ ] All 15 AI prompt generators and all 5 SEO tools ship with zero `metaTitle`, `metaDescription`, `longDescription`, or `faqs` — 100% of both sections fall back to the short `title`/`description` fields (often under 60 characters), which is far below the 150–160 character target for meta descriptions and forfeits any long-form ranking content or FAQ rich-snippet eligibility. — `src/data/ai-prompts.ts`, `src/data/seo-tools.ts`
- [ ] 24 of 38 developer tools (63%) are missing `metaTitle`/`metaDescription`, and 28 of 38 are missing `longDescription` and `faqs` — e.g. "JSON Validator", "JSON Minifier" have no SEO metadata at all and fall back to one-line descriptions. — `src/data/tools.ts`

### Warnings (should fix)

- [ ] No `FAQPage` JSON-LD despite FAQ accordions rendering on pages that do have `faqs` populated (24 tool pages) — this is a missed rich-snippet opportunity that requires no new content, just wiring up existing data. — `src/components/tools/ToolLayout.tsx:50-62`
- [ ] `WebApplication` schema on every tool/prompt/SEO-tool page omits `image`, `url`, and `aggregateRating`/`review` fields — schema validates but is thinner than it could be. — `src/app/tools/[slug]/page.tsx:56-68` (same pattern in the other two templates)
- [ ] `sitemap.ts` sets `lastModified: new Date().toISOString()` for every single URL, every build — this always reports "just modified" regardless of whether content actually changed, which undermines the signal's usefulness to crawlers. — `src/app/sitemap.ts:19,26,33,40`
- [ ] No breadcrumb trail (visual or `BreadcrumbList` schema) on any tool page, despite a 3-level hierarchy (home → tools/ai-prompt-generators/seo-tools → slug) — hurts both crawl-path clarity and breadcrumb rich results.
- [ ] `ToolLayout`'s "Related Tools" links are hardcoded to `/tools/${slug}` regardless of which section the related item actually belongs to (comment in the code even flags this as a placeholder). It's currently dormant since no data file populates `relatedTools` yet, but the first person who fills it in for an AI-prompt or SEO-tool page will silently create 404 links. — `src/components/tools/ToolLayout.tsx:70-79`
- [ ] Static legal pages (Privacy Policy, Terms, Disclaimer) have very thin meta descriptions (30–40 characters, e.g. `"Privacy Policy for FreeDevTools AI"`) — low priority given their 0.3 sitemap weight, but easy to fix.

### Opportunities (nice to have)

- [ ] No `CollectionPage`/`ItemList` JSON-LD on the three listing pages (`/tools`, `/ai-prompt-generators`, `/seo-tools`) — would reinforce the internal link graph for crawlers.
- [ ] Homepage only links to the first 10 items per category directly; the rest are reachable via "View all" — fine structurally, but worth confirming `generateStaticParams` + sitemap coverage stays in sync as tools are added (it currently does).
- [ ] Consider an `og:image` generation route (Next.js `opengraph-image.tsx`) per tool using its title, rather than hand-designing static images — would resolve the critical image gap with minimal manual effort.

### Passing

- `robots.ts` allows all crawling and correctly points to `/sitemap.xml`; `sitemap.ts` programmatically includes every dynamic tool/prompt/SEO-tool route plus static pages — no orphaned or blocked pages found.
- Canonical URLs (`alternates.canonical`) are correctly set on every dynamic tool template.
- Title templating (`%s | FreeDevTools AI`) is configured once in the root layout and inherited correctly.
- Every page checked has exactly one `<h1>` with a clean, logical `h1 > h2 > h3` hierarchy — no skipped or duplicate levels found.
- The four raw `<img>` tags in the codebase (all client-side, data-URL image previews) all carry descriptive `alt` text; no missing-alt issues found anywhere in the codebase.
- Google Analytics and AdSense scripts both use `next/script` with `strategy="afterInteractive"` — non-blocking, good performance practice.
- PWA manifest (`manifest.ts`) is properly configured with name, icons at multiple sizes, and a maskable icon.
- `viewport` meta and responsive Tailwind classes are present throughout; no fixed-width layouts found.

### Suggested priority order

1. Add `og:image`/`twitter:image` (site-wide default at minimum, ideally per-tool via `opengraph-image.tsx`).
2. Backfill `metaTitle`/`metaDescription` for the 15 AI prompt generators and 5 SEO tools first (100% gap, likely your highest-traffic-potential pages), then the remaining 24 developer tools.
3. Wire up `FAQPage` schema for the 24 pages that already have FAQ content — pure config, no new content needed.
4. Fix the `sitemap.ts` `lastModified` to reflect real per-tool update dates instead of build time.
5. Add breadcrumbs (visual + schema) to the shared `ToolLayout`.
