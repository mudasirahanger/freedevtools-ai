# FreeDevTools AI

Free Developer Tools & AI Prompt Generators built with Next.js App Router, Tailwind CSS, and shadcn/ui.

## Project Overview
This project provides a massive collection of 25+ free developer utilities, 15+ AI prompt generators, and SEO tools that run almost entirely client-side for performance and privacy.

## Tech Stack
- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS (v4)
- shadcn/ui
- Vitest & Playwright

## Local Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and configure it:
   ```bash
   cp .env.example .env.local
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## Environment Variables
- `NEXT_PUBLIC_SITE_URL`: The canonical URL of the site (e.g., `https://freedevtools.ai`)
- `NEXT_PUBLIC_SITE_NAME`: The site name (e.g., `FreeDevTools AI`)
- `NEXT_PUBLIC_ADSENSE_CLIENT`: Your Google AdSense publisher ID (e.g., `ca-pub-XXXXXXXXXXXXXXXX`). AdSense components will only load if this is present.
- `NEXT_PUBLIC_GA_ID`: Your Google Analytics Measurement ID (e.g., `G-XXXXXXXXXX`)

## Branch Workflow
- `main`: Production branch
- `develop`: Active development / Preview
- `feature/*`: For new tools and features
- `fix/*`: For bug fixes
- `seo/*`: For SEO improvements
- `chore/*`: For configuration

Use Conventional Commits (e.g., `feat: add new JSON tool`, `fix: correct JWT logic`).

## GitHub Actions CI
The `.github/workflows/ci.yml` is configured to run tests (Vitest + Playwright), linting, typechecking, and production builds on `push` and `pull_request` to `main` and `develop`.

## Cloudflare Pages Deployment
1. Connect this GitHub repository to your Cloudflare Pages account.
2. Production branch: `main`
3. Preview branch: `develop`
4. Build command: `npm run build`
5. Build output directory: `.next`
6. Add the environment variables (`NEXT_PUBLIC_SITE_URL`, etc.) in the Cloudflare Pages settings.
7. Merging to `main` creates a production deployment. Pushing to `develop` creates a preview deployment.

## AdSense Setup
1. Add your AdSense Publisher ID to the `NEXT_PUBLIC_ADSENSE_CLIENT` environment variable.
2. The `AdSenseScript` component loads the AdSense library automatically.
3. You can enable Auto Ads in the AdSense console, or place specific ad unit IDs into the `adSlot` prop of `TopBannerAd`, `SidebarAd`, `InContentAd`, and `BottomAd` components.

## Testing Checklist
- `npm run typecheck` (TypeScript)
- `npm run lint` (ESLint)
- `npm run test` (Vitest)
- `npm run test:e2e` (Playwright Smoke Tests)

## Contribution
Check out `develop`, create a feature branch, build your tool in `src/components/tools/`, add it to the data registry in `src/data/`, and submit a PR.

## Core Contributors
- **Mudasir Ahanger** ([@mudasirahanger](https://github.com/mudasirahanger)) - Creator & Lead Maintainer

## Acknowledgments
This project was built with the assistance of advanced AI tools, including **Antigravity (by Google DeepMind)**, which helped architect, debug, and optimize the application.
