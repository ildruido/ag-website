# CLAUDE.md — Autonomous Agent Operating Manual

## 1. Role & Interaction Rules
- **User Context:** The owner is a technical Product Owner / Editor-in-Chief who operates strictly via plain-English instructions. **Never** ask the user to manually write, edit, or debug code.
- **Autonomous Execution:** Whenever asked to build features, fix bugs, or publish content, you must execute the file edits, run `npm run build` to verify zero TypeScript/Astro compilation errors, and commit/push changes when requested.
- **Simplicity First:** Avoid unnecessary npm dependencies. Prefer native Astro capabilities, Tailwind CSS utility classes, and vanilla TypeScript.

## 2. Tech Stack & Architecture
- **Framework:** Astro (Static Site Generation / SSG) with `@astrojs/mdx`, `@astrojs/tailwind`, `@astrojs/rss`, and `@astrojs/sitemap`.
- **Hosting:** Cloudflare Pages (Output directory: `dist`, Build command: `npm run build`).
- **Content Architecture:** Astro Content Collections located in `src/content/`:
  - `src/content/portfolio/` — Product portfolio and engineering case studies.
  - `src/content/writing/` — Blog posts, essays, case studies, and curated papers.

## 3. Strict Content Schemas (`src/content/config.ts`)
When creating or validating `.mdx` files, strictly adhere to these frontmatter schemas:

### Writing (`src/content/writing/*.mdx`)
```yaml
---
title: "Clear, Compelling Title"
pubDate: 2026-11-20
updatedDate: 2026-11-20 # Optional
description: "1-2 sentence executive summary for SEO, RSS, and cards."
category: "thoughts" # MUST be one of: 'thoughts' | 'case-studies' | 'curated-papers'
tags: ["AI", "Product Strategy"]
featured: false
draft: false
sources: # Optional array of authoritative references
  - title: "Source Title or Report Name"
    url: "https://example.com"
---
```

### Portfolio (`src/content/portfolio/*.mdx`)
```yaml
---
title: "Product or Project Name"
role: "Your Role (e.g., Founder, Principal PM)"
timeframe: "2024 – 2026"
summary: "One-line value proposition and measurable outcome."
status: "Live" # 'Live' | 'Acquired' | 'Archived' | 'R&D'
featured: true
order: 1
links:
  live: "https://..."
  repo: "https://..."
---
```

## 4. Design & Editorial Standards
- **Aesthetic:** High-contrast, minimalist editorial design inspired by Stripe Press and Bear Blog. Prioritize typography, generous whitespace, and fast mobile readability.
- **Theme:** Support system light/dark mode automatically with a clean manual toggle.
- **Citations & Formatting:** Articles often include research citations. Render blockquotes cleanly, support footnote/reference lists at the bottom of articles, and ensure external links open safely (`target="_blank" rel="noopener noreferrer"`).
- **AI Search Readiness (GEO):** Maintain `src/pages/llms.txt.ts` so it dynamically outputs a clean Markdown index of all published portfolio items and non-draft writing entries at `/llms.txt`.

## 5. Pre-Flight Verification Checklist
Before completing any task, always run:
1. `npm run build` (must exit with code `0`).
2. Confirm no `.env` files, API keys, or secrets are staged in Git.