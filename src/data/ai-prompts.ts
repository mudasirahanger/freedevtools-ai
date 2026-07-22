import { ToolMetadata } from "@/types/tool";

export const aiPromptGenerators: ToolMetadata[] = [
  {
    title: "AI Coding Prompt Generator",
    slug: "ai-coding-prompt-generator",
    category: "AI Prompts",
    description: "Generate structured AI prompts for writing code in various languages.",
    metaTitle: "Free AI Coding Prompt Generator Online",
    metaDescription: "Generate structured, context-rich prompts for AI coding assistants like ChatGPT, Claude, and Copilot. Specify language, framework, and requirements in seconds.",
    longDescription: `
## Why structure matters for AI coding prompts

A vague prompt like "write a function to sort a list" forces an AI model to guess your language, framework, edge cases, and style conventions. This tool builds a structured prompt that spells out the language, the exact task, constraints, and expected output format, so the AI's first response is usable instead of a starting point for five rounds of follow-up questions.

### What this generator includes

* **Language & framework fields** so the AI never has to guess your stack.
* **Constraints section** for performance, style guides, or libraries to avoid.
* **Output format hints** (function only, full file, with tests, with comments).

Paste the generated prompt into any LLM chat interface or coding assistant.
`,
    faqs: [
      {
        question: "Does this tool write the code for me?",
        answer: "No. It generates a well-structured prompt that you paste into an AI assistant (ChatGPT, Claude, Copilot, etc.), which then writes the code."
      },
      {
        question: "Is any of my project data sent to a server?",
        answer: "No. The prompt is assembled entirely in your browser from the fields you fill in. Nothing is stored or transmitted until you choose to paste it into an AI tool yourself."
      }
    ],
  },
  {
    title: "AI Bug Fix Prompt Generator",
    slug: "ai-bug-fix-prompt-generator",
    category: "AI Prompts",
    description: "Create detailed prompts to help AI understand and fix bugs.",
    metaTitle: "Free AI Bug Fix Prompt Generator Online",
    metaDescription: "Generate detailed bug-fix prompts with error messages, stack traces, and expected behavior so AI assistants can debug your code faster and more accurately.",
    longDescription: `
## Get better debugging answers from AI

AI assistants fix bugs far more reliably when given the actual error message, stack trace, relevant code, and what you expected to happen instead of what happened. This generator prompts you for exactly those fields and assembles them into a single, well-organized prompt.

### What to include for the best results

* **The exact error message or stack trace** — copy-paste, don't paraphrase.
* **The minimal code snippet** that reproduces the issue.
* **Expected vs. actual behavior**, described precisely.

A structured bug report to an AI gets you a structured, testable fix instead of generic troubleshooting advice.
`,
    faqs: [
      {
        question: "What information should I gather before using this tool?",
        answer: "The exact error message or stack trace, the smallest code snippet that reproduces the bug, and a one-line description of what you expected instead."
      },
      {
        question: "Can I use the generated prompt with any AI model?",
        answer: "Yes, the output is plain text designed to work with ChatGPT, Claude, Gemini, or any other LLM-based coding assistant."
      }
    ],
  },
  {
    title: "AI Full-Stack App Prompt Generator",
    slug: "ai-full-stack-app-prompt-generator",
    category: "AI Prompts",
    description: "Generate prompts for scaffolding complete full-stack applications.",
    metaTitle: "Free AI Full-Stack App Prompt Generator",
    metaDescription: "Generate a complete full-stack scaffolding prompt covering frontend, backend, database, and auth so AI assistants can bootstrap your app correctly.",
    longDescription: `
## Scaffold an entire app in one well-formed prompt

Full-stack apps have a lot of moving parts — frontend framework, backend language, database, authentication, and deployment target. Asking an AI to "build me an app" without specifying these leads to mismatched assumptions. This generator walks through each layer of the stack and produces one prompt covering all of them.

### Layers covered

* **Frontend:** framework, styling approach, state management.
* **Backend:** language, framework, API style (REST/GraphQL).
* **Data:** database engine and schema requirements.
* **Auth:** session-based, JWT, or third-party provider.
`,
    faqs: [
      {
        question: "Will the AI generate a runnable project from this prompt?",
        answer: "Most modern coding assistants can scaffold a working starting point from a detailed prompt like this, though you should still review generated code before deploying it."
      },
      {
        question: "Can I generate a prompt for just the backend or just the frontend?",
        answer: "Yes, leave the fields for the layer you don't need blank and the generator will omit that section from the final prompt."
      }
    ],
  },
  {
    title: "AI UI/UX Prompt Generator",
    slug: "ai-ui-ux-prompt-generator",
    category: "AI Prompts",
    description: "Create prompts for UI component generation and UX design.",
    metaTitle: "Free AI UI/UX Prompt Generator Online",
    metaDescription: "Generate detailed AI prompts for UI components and UX flows, including layout, styling framework, accessibility, and responsiveness requirements.",
    longDescription: `
## Describe UI intent precisely, not vaguely

"Make it look nice" is the least useful instruction you can give an AI model for UI work. This generator prompts for the component type, styling framework (Tailwind, CSS Modules, styled-components), layout constraints, and accessibility requirements, then compiles them into a specific, actionable prompt.

### Why this produces better components

* Forces a concrete **component type and purpose** (e.g. "pricing card," not "a card").
* Captures **responsive breakpoints** up front instead of as an afterthought.
* Includes **accessibility requirements** (keyboard nav, ARIA labels, contrast) so they aren't skipped.
`,
    faqs: [
      {
        question: "Does it work for design systems like shadcn/ui or Material UI?",
        answer: "Yes, specify your component library in the framework field and the generated prompt will instruct the AI to use those components and conventions."
      },
      {
        question: "Can I ask for accessibility-compliant output?",
        answer: "Yes, the accessibility field lets you request WCAG-compliant markup, keyboard navigation, and proper ARIA attributes in the generated prompt."
      }
    ],
  },
  {
    title: "AI Landing Page Prompt Generator",
    slug: "ai-landing-page-prompt-generator",
    category: "AI Prompts",
    description: "Generate prompts for building high-converting landing pages.",
    metaTitle: "Free AI Landing Page Prompt Generator",
    metaDescription: "Generate AI prompts for high-converting landing pages, including hero copy, sections, calls-to-action, and target audience details.",
    longDescription: `
## Prompt for conversion, not just a page

A landing page prompt needs more than "build me a landing page" — it needs the product, target audience, key value proposition, and the sections you want (hero, features, testimonials, pricing, CTA). This generator captures each of those inputs so the AI's draft actually maps to your funnel.

### Sections this can prompt for

* Hero headline and subheadline
* Feature/benefit grid
* Social proof and testimonials
* Pricing and final call-to-action
`,
    faqs: [
      {
        question: "Can I specify a target audience for the copy?",
        answer: "Yes, describe your target audience and the tool includes it in the generated prompt so the AI tailors headline and body copy accordingly."
      },
      {
        question: "Does this generate the actual landing page code?",
        answer: "This tool generates the prompt only; paste it into an AI coding assistant to produce the actual HTML/React code."
      }
    ],
  },
  {
    title: "AI API Prompt Generator",
    slug: "ai-api-prompt-generator",
    category: "AI Prompts",
    description: "Create detailed prompts for designing REST or GraphQL APIs.",
    metaTitle: "Free AI API Design Prompt Generator",
    metaDescription: "Generate detailed prompts for designing REST or GraphQL APIs, including endpoints, request/response shapes, auth, and error handling.",
    longDescription: `
## Design APIs with AI, without the back-and-forth

API design prompts fail most often when they omit the request/response shape, authentication method, or error-handling convention. This generator collects the API style (REST or GraphQL), resource names, auth mechanism, and versioning strategy, then produces a single prompt an AI can use to draft consistent endpoint definitions.

### What gets captured

* **API style:** REST or GraphQL, plus versioning convention.
* **Resources and operations:** the entities and CRUD actions needed.
* **Auth & error handling:** the scheme you want enforced consistently.
`,
    faqs: [
      {
        question: "Does it support both REST and GraphQL?",
        answer: "Yes, select your preferred API style and the generated prompt adapts its structure — endpoint-based for REST, schema-based for GraphQL."
      },
      {
        question: "Can I request OpenAPI/Swagger documentation as output?",
        answer: "Yes, you can specify that you want the AI to also produce an OpenAPI spec alongside the endpoint implementation."
      }
    ],
  },
  {
    title: "AI Database Schema Prompt Generator",
    slug: "ai-database-schema-prompt-generator",
    category: "AI Prompts",
    description: "Generate prompts for relational or NoSQL database schema design.",
    metaTitle: "Free AI Database Schema Prompt Generator",
    metaDescription: "Generate AI prompts for relational or NoSQL database schema design, including entities, relationships, indexes, and normalization requirements.",
    longDescription: `
## Prompt for schemas that hold up in production

Database schema requests to AI models go wrong when relationships, indexing needs, and normalization expectations aren't spelled out. This generator asks for your database engine, the core entities, their relationships, and any performance constraints, then produces a prompt geared toward a schema you can actually migrate to production.

### Fields this generator covers

* **Engine:** PostgreSQL, MySQL, MongoDB, and others.
* **Entities & relationships:** one-to-many, many-to-many, etc.
* **Constraints:** indexing, normalization level, and soft-delete needs.
`,
    faqs: [
      {
        question: "Does this work for both SQL and NoSQL databases?",
        answer: "Yes, choose your database engine and the generated prompt adjusts its schema conventions (tables and foreign keys for SQL, documents and embedding for NoSQL)."
      },
      {
        question: "Can I ask for migration files as well as the schema?",
        answer: "Yes, note your migration tool (e.g. Prisma, Knex, Alembic) in the prompt and the AI can generate matching migration files."
      }
    ],
  },
  {
    title: "AI Code Review Prompt Generator",
    slug: "ai-code-review-prompt-generator",
    category: "AI Prompts",
    description: "Create prompts that instruct AI to perform rigorous code reviews.",
    metaTitle: "Free AI Code Review Prompt Generator",
    metaDescription: "Generate structured prompts for thorough AI code reviews covering security, performance, readability, and best practices.",
    longDescription: `
## Turn a generic "review this" into a real review

Asking an AI to "review this code" tends to produce shallow, generic feedback. This generator builds a prompt that explicitly asks for security issues, performance concerns, readability, test coverage gaps, and adherence to your team's conventions — so the review reads like one from a senior engineer, not a linter.

### Review dimensions covered

* **Security:** injection risks, unsafe input handling.
* **Performance:** unnecessary re-renders, N+1 queries, inefficient loops.
* **Maintainability:** naming, structure, and duplicate logic.
`,
    faqs: [
      {
        question: "Can I focus the review on a specific concern, like security?",
        answer: "Yes, you can select which review dimensions to emphasize and the generated prompt will weight the AI's feedback accordingly."
      },
      {
        question: "Should I paste my whole codebase into the review prompt?",
        answer: "No, paste only the specific file or function under review — large, unfocused code dumps produce vaguer feedback than a targeted snippet."
      }
    ],
  },
  {
    title: "AI Unit Test Prompt Generator",
    slug: "ai-unit-test-prompt-generator",
    category: "AI Prompts",
    description: "Generate prompts to write comprehensive unit and integration tests.",
    metaTitle: "Free AI Unit Test Prompt Generator",
    metaDescription: "Generate prompts for comprehensive AI-written unit and integration tests, including edge cases, mocking strategy, and test framework.",
    longDescription: `
## Prompt for test coverage, not just happy-path tests

AI models default to writing one or two happy-path tests unless explicitly told to cover edge cases, error states, and boundary conditions. This generator collects your test framework, the function or module under test, and the categories of cases you want covered, then produces a prompt geared toward thorough test suites.

### What gets specified

* **Test framework:** Jest, Vitest, pytest, JUnit, and others.
* **Case categories:** happy path, edge cases, error handling, boundaries.
* **Mocking needs:** external services, databases, or timers to stub out.
`,
    faqs: [
      {
        question: "Which test frameworks does this support?",
        answer: "Any framework you specify — the generator is framework-agnostic and inserts your chosen framework's name and conventions into the prompt."
      },
      {
        question: "Will it ask the AI to cover edge cases automatically?",
        answer: "Yes, by default the generated prompt explicitly requests edge-case and error-path coverage in addition to standard happy-path tests."
      }
    ],
  },
  {
    title: "AI PRD Prompt Generator",
    slug: "ai-prd-prompt-generator",
    category: "AI Prompts",
    description: "Create Product Requirement Document (PRD) structures for your AI.",
    metaTitle: "Free AI PRD Prompt Generator Online",
    metaDescription: "Generate structured prompts for AI-drafted Product Requirement Documents, including goals, user stories, scope, and success metrics.",
    longDescription: `
## Draft PRDs faster without losing structure

A good PRD needs a consistent shape: problem statement, goals, user stories, scope boundaries, and success metrics. This generator collects those inputs and produces a prompt that keeps the AI's draft PRD structured and complete instead of a loose paragraph of feature ideas.

### Sections this generator prompts for

* **Problem & goals:** what you're solving and why it matters.
* **Scope:** what's explicitly in and out of scope.
* **Success metrics:** how you'll know the feature worked.
`,
    faqs: [
      {
        question: "Is the output a finished PRD or a draft?",
        answer: "It's a strong first draft. Product requirements should always be reviewed and refined by your team before being finalized."
      },
      {
        question: "Can I include user personas in the prompt?",
        answer: "Yes, describe your target user(s) in the relevant field and the generated prompt will ask the AI to frame user stories around them."
      }
    ],
  },
  {
    title: "AI SEO Prompt Generator",
    slug: "ai-seo-prompt-generator",
    category: "AI Prompts",
    description: "Generate prompts for content optimization and technical SEO.",
    metaTitle: "Free AI SEO Prompt Generator Online",
    metaDescription: "Generate AI prompts for SEO content optimization and technical SEO audits, including target keywords, search intent, and page structure.",
    longDescription: `
## Prompt for SEO work AI can actually execute

Generic "make this SEO friendly" requests produce keyword-stuffed, low-quality output. This generator asks for the target keyword, search intent, and content type, then builds a prompt aimed at genuinely useful on-page optimization — title tags, headings, and structure that match how the page should actually rank.

### What this covers

* **Target keyword & intent:** informational, transactional, or navigational.
* **Content type:** blog post, product page, landing page, documentation.
* **Technical checks:** heading hierarchy, meta tags, internal linking suggestions.
`,
    faqs: [
      {
        question: "Can this generate meta titles and descriptions directly?",
        answer: "The generated prompt instructs the AI to produce meta titles and descriptions as part of its output, tailored to your target keyword."
      },
      {
        question: "Does it replace a full SEO audit?",
        answer: "No, it's a prompt-generation tool for content and on-page optimization tasks — for a full technical audit, use a dedicated SEO audit tool."
      }
    ],
  },
  {
    title: "AI Docker Prompt Generator",
    slug: "ai-docker-prompt-generator",
    category: "AI Prompts",
    description: "Create prompts for generating Dockerfiles and docker-compose setups.",
    metaTitle: "Free AI Docker Prompt Generator Online",
    metaDescription: "Generate prompts for AI-written Dockerfiles and docker-compose configurations, including base image, services, and environment variables.",
    longDescription: `
## Get containerization prompts right the first time

Dockerfile requests often miss key details like the exact base image, multi-stage build needs, or which environment variables and ports must be exposed. This generator captures your language/runtime, base image preference, services needed, and exposed ports, then produces a complete containerization prompt.

### What gets included

* **Base image & runtime version**
* **Multi-stage build requirements** for smaller production images
* **Services & ports** for docker-compose setups (database, cache, etc.)
`,
    faqs: [
      {
        question: "Can it generate docker-compose files for multi-service apps?",
        answer: "Yes, list the services you need (app, database, cache, etc.) and the prompt will ask the AI to produce a matching docker-compose.yml."
      },
      {
        question: "Does it optimize for smaller image sizes?",
        answer: "You can request multi-stage builds and a slim base image, and the generated prompt will instruct the AI to optimize accordingly."
      }
    ],
  },
  {
    title: "AI Laravel Prompt Generator",
    slug: "ai-laravel-prompt-generator",
    category: "AI Prompts",
    description: "Generate Laravel specific prompts for controllers, models, and migrations.",
    metaTitle: "Free AI Laravel Prompt Generator Online",
    metaDescription: "Generate Laravel-specific AI prompts for controllers, Eloquent models, migrations, and routes that follow Laravel conventions.",
    longDescription: `
## Prompt in Laravel's conventions, not generic PHP

Generic PHP prompts often produce code that ignores Laravel conventions — Eloquent relationships, form requests, resource controllers, and migration naming. This generator is scoped specifically to Laravel so the AI's output follows the framework's idioms rather than reinventing them.

### What this generator targets

* **Eloquent models** with relationships and casts
* **Resource controllers** following RESTful conventions
* **Migrations** with correct column types and indexes
`,
    faqs: [
      {
        question: "Which Laravel version does this target?",
        answer: "You can specify the Laravel version in the prompt; the generator defaults to current LTS conventions if left blank."
      },
      {
        question: "Can it generate form request validation classes?",
        answer: "Yes, request validation is one of the Laravel-specific artifact types you can ask the generated prompt to include."
      }
    ],
  },
  {
    title: "AI React Prompt Generator",
    slug: "ai-react-prompt-generator",
    category: "AI Prompts",
    description: "Create React and Next.js specific prompts for modern frontend development.",
    metaTitle: "Free AI React & Next.js Prompt Generator",
    metaDescription: "Generate React and Next.js specific AI prompts covering hooks, component structure, App Router conventions, and state management.",
    longDescription: `
## Prompt for modern React, not outdated patterns

AI models trained on years of React content sometimes default to outdated class-component patterns or the old Pages Router. This generator lets you specify React version, Next.js App Router vs. Pages Router, and your state management approach, so generated components match current best practices.

### What this generator targets

* **Component style:** function components with hooks, Server vs. Client Components
* **Routing:** App Router or Pages Router conventions
* **State management:** built-in hooks, Zustand, Redux, or React Query
`,
    faqs: [
      {
        question: "Does this support the Next.js App Router specifically?",
        answer: "Yes, select App Router and the generated prompt will instruct the AI to use Server Components, route handlers, and file conventions accordingly."
      },
      {
        question: "Can it generate prompts for state management libraries?",
        answer: "Yes, specify your state library (Redux, Zustand, React Query, etc.) and it will be reflected in the generated prompt."
      }
    ],
  },
  {
    title: "AI Git Commit Prompt Generator",
    slug: "ai-git-commit-prompt-generator",
    category: "AI Prompts",
    description: "Generate context-rich prompts to create Conventional Commits.",
    metaTitle: "Free AI Git Commit Message Prompt Generator",
    metaDescription: "Generate prompts for AI-written Conventional Commits messages from your diff, ensuring consistent type, scope, and description formatting.",
    longDescription: `
## Consistent commit messages, generated from your diff

Conventional Commits (\`feat:\`, \`fix:\`, \`chore:\`, etc.) keep changelogs and release automation working correctly, but writing them consistently by hand is tedious. This generator builds a prompt that asks the AI to summarize your diff into a properly typed, scoped commit message.

### What gets captured

* **Change type:** feat, fix, chore, refactor, docs, and more
* **Scope:** the module or area affected
* **Description:** a concise, imperative-mood summary
`,
    faqs: [
      {
        question: "Does this follow the Conventional Commits specification?",
        answer: "Yes, the generated prompt explicitly instructs the AI to format output as type(scope): description per the Conventional Commits spec."
      },
      {
        question: "Do I need to paste my full git diff?",
        answer: "Paste the relevant diff or a summary of your changes — the more specific the input, the more accurate the generated commit message will be."
      }
    ],
  }
];
