# The AI-First Personal Website & Publishing Handbook
**Tailored Architecture, Research-Backed Editorial Pipeline, and Agentic Operating System**

---

## Executive Philosophy: Zero-Code Engineering & Grounded Publishing
Because you have a software engineering background, you already understand Git, repositories, and deployment pipelines—which gives you a massive unfair advantage. You do not need visual "no-code" training wheels, nor do you ever need to write a single line of syntax manually. 

By treating your website as **Content-as-Code**, you can orchestrate your existing subscriptions (**Claude Code**, **NotebookLM**, **Gemini**, **GitHub Pro**, and **OpenRouter**) as an autonomous engineering and editorial team. You remain the **Product Owner and Editor-in-Chief**, issuing plain-English directives while your AI agents handle research, citation verification, MDX formatting, frontend engineering, and CI/CD deployment.

---

## 1. Tailored System Architecture (Maximizing Existing Subscriptions)

Your current stack eliminates the need for almost any new software subscriptions. Every layer maps directly to a tool you already own:

```text
[ 1. THESIS & CAPTURE ]
  Raw idea / voice note ──► NotebookLM (Source library, PDFs, web links)
                                │
[ 2. RESEARCH & VALIDATION AGENT ]
  Gemini Deep Research (Finds authoritative sources, stats & counter-arguments)
        │
        ▼ (Verified sources fed back into NotebookLM for synthesis & citations)
[ 3. EDITORIAL ENGINE ]
  Claude Project (Drafts MDX article/case study with inline quotes & links)
        │
        ▼
[ 4. AGENTIC ENGINEERING & REPO ]
  Claude Code (CLI) ◄──► GitHub Pro (Private Repo + 3,000 CI/CD mins/mo)
        │                       │
        │                       ├──► GitHub Actions + OpenRouter API
        │                            (Free-tier models for social posts & /llms.txt)
        ▼
[ 5. EDGE HOSTING & ANALYTICS ]
  Cloudflare Pages (Global CDN, SSL, Web Analytics) ──► Live Site
```

### How Your Existing Subscriptions Power the Stack
1. **Claude Pro (£19/mo) $\rightarrow$ Claude Code & Editorial Twin:**
   * **Claude Code (Terminal Agent):** Replaces the need to pay for Cursor. You run `claude` in your project directory and issue plain-English architecture, design, and content tasks. It reads the whole repo, edits files, runs build checks, and commits to Git.
   * **Claude Projects:** Acts as your Managing Editor, turning your researched outlines into clean MDX files matching your exact site schema.
2. **Google AI Plus (£7.99/mo) $\rightarrow$ Gemini & NotebookLM (Your Research Agent):**
   * **Gemini (with Google Search Grounding / Deep Research):** Acts as your autonomous Research Analyst to validate your thesis, uncover authoritative industry reports, and verify facts.
   * **NotebookLM:** Acts as your grounded synthesis engine. Because NotebookLM strictly answers from the sources you load into it (with exact inline citations), it eliminates hallucinated quotes when writing articles and papers.
3. **GitHub Pro ($4/mo) $\rightarrow$ Single Source of Truth & Automation Engine:**
   * Gives you private repositories (if you want to keep drafts/notes private before publishing) and **3,000 GitHub Actions minutes/month**—more than enough to run automated build checks, image optimization, and OpenRouter AI scripts on every push.
4. **OpenRouter.ai (Free Tier $\rightarrow$ Optional $19 Prepaid Top-Up) $\rightarrow$ Headless Automation API:**
   * **At Launch ($0 Free Tier):** OpenRouter provides free access to capable `:free` model endpoints (with daily request caps). Because you only publish a few times a week or month, a single GitHub Action call per published article stays well within OpenRouter's free daily allowance.
   * **If You Add ~$19 Credit Later:** Since you are already funding OpenRouter for app building, adding $19 in prepaid credits unlocks higher rate limits, strict zero-data-retention routing, and fast frontier/mid-tier models (`google/gemini-2.5-flash` or `anthropic/claude-haiku-4.5`). For blog metadata and social thread generation (~$0.001 per post), **$19 covers thousands of articles**—essentially a lifetime supply for your website.

---

## 2. Architectural Decisions: Short- vs. Long-Term Trade-Offs

Because you want to start fast without painting yourself into a corner, here is an objective comparison of the primary infrastructure choices.

### Decision A: Hosting & Edge Platform — Cloudflare Pages vs. Vercel

| Dimension | Cloudflare Pages (Recommended) | Vercel |
| :--- | :--- | :--- |
| **Short-Run Pros** | • Unlimited bandwidth on the free tier.<br>• Built-in, privacy-first Web Analytics included free.<br>• Domain registrar at wholesale cost (~$10/yr). | • Slightly faster initial setup for Next.js.<br>• Best-in-class Preview Deployment UI on Pull Requests. |
| **Short-Run Cons** | • Build logs and UI are slightly more utilitarian than Vercel's. | • Free tier ("Hobby") strictly prohibits commercial/monetized use (risky if you ever sell consulting, courses, or products on your site). |
| **Long-Run Pros** | • **Zero pricing cliffs:** Even if a post goes viral (1M+ views), bandwidth remains $0.<br>• Seamless integration with Cloudflare Workers, R2 (media storage), and Zaraz. | • Superior edge middleware and serverless function ergonomics if you build complex web apps later. |
| **Long-Run Cons** | • Serverless functions (Workers) have a slightly different runtime environment than standard Node.js. | • **Notorious bandwidth overage costs:** Moving to Vercel Pro costs $20/mo/seat, and traffic spikes can trigger unexpected bills. |

> **Recommendation:** **Choose Cloudflare Pages.** Since your site is a content-heavy portfolio and publication, static edge delivery is ideal. Cloudflare allows commercial activity on its free tier, includes free analytics, and eliminates traffic-spike anxiety forever.

---

### Decision B: Site Framework — Astro vs. Next.js

| Dimension | Astro (Recommended) | Next.js |
| :--- | :--- | :--- |
| **Short-Run Pros** | • Ships zero JS by default (100/100 Lighthouse SEO scores out of the box).<br>• Native Content Collections with strict TypeScript frontmatter validation (great guardrails for AI agents). | • Massive ecosystem; every LLM knows Next.js inside out. |
| **Short-Run Cons** | • Fewer interactive UI kits compared to the pure React ecosystem (though Astro supports React components natively). | • Over-engineered for a blog/portfolio; App Router caching complexities often trip up AI coding agents. |
| **Long-Run Pros** | • **Islands Architecture:** You can embed interactive React/Svelte calculators or visualizations inside a single blog post without slowing down the rest of the site. | • Better if your website eventually evolves into a full-scale multi-user SaaS application. |
| **Long-Run Cons** | • Not intended for complex authenticated web apps (keep app-building in separate repos). | • High dependency churn; frequent breaking upgrades require ongoing maintenance. |

> **Recommendation:** **Choose Astro (with Tailwind CSS & MDX).** It is the gold standard for AI-maintained publications: simple file structure, native Markdown/MDX support, and zero framework bloat.

---

### Decision C: Coding Harness — Claude Code (Current) vs. Cursor IDE

| Dimension | Claude Code CLI (Recommended) | Cursor IDE |
| :--- | :--- | :--- |
| **Short-Run Pros** | • **Already included** in your £19/mo Claude Pro subscription.<br>• Operates directly in your terminal; excels at multi-file scaffolding, git commits, and running build tests autonomously. | • Visual inline diffs make it easy to inspect code line-by-line. |
| **Short-Run Cons** | • Terminal-based (no visual side-by-side diff unless paired with VS Code/GitHub Desktop). | • Costs an extra $20/mo (£16/mo) on top of Claude Pro. |
| **Long-Run Pros** | • Encourages true "hands-off" delegation—you describe outcomes in plain English and let the agent verify via `npm run build`. | • Great if you ever decide to go back to manually editing code daily. |
| **Long-Run Cons** | • Usage limits share your Claude Pro 5-hour rolling window (mitigated by doing content drafting in Gemini/Claude web). | • Redundant subscription given your engineering background and existing Claude Pro plan. |

> **Recommendation:** **Stick with Claude Code.** Open VS Code (free) purely as a file/diff viewer if you want to visually inspect changes, while letting Claude Code drive all edits from the terminal.

---

### Decision D: Research AI Agent — Gemini + NotebookLM (Current) vs. Perplexity Pro

| Dimension | Gemini + NotebookLM (Recommended) | Perplexity Pro |
| :--- | :--- | :--- |
| **Short-Run Pros** | • **Already included** in your £7.99/mo Google AI Plus plan.<br>• NotebookLM guarantees zero-hallucination quotes directly tied to uploaded PDFs, papers, and web URLs. | • Very fast single-prompt web search with inline links. |
| **Short-Run Cons** | • Two-step flow (discover sources in Gemini $\rightarrow$ load into NotebookLM for deep synthesis). | • Costs an extra $20/mo; weaker at synthesizing 10+ long PDFs simultaneously without losing context. |
| **Long-Run Pros** | • Builds a permanent, searchable **Knowledge Base** of notebooks per topic/paper that you can reuse across future articles. | • Good for quick ad-hoc fact checks. |
| **Long-Run Cons** | • Manual export of notes into Claude (takes 10 seconds via copy-paste). | • Ephemeral threads; harder to build a curated, citation-locked research repository over time. |

> **Recommendation:** **Use Gemini + NotebookLM as your dedicated Research Agent.** Use Gemini to scout the web for authoritative sources, and NotebookLM to lock in verified quotes and structural arguments.

---

## 3. Phased Evolution: Quick-Start MVP vs. Scaled Ecosystem

| Ecosystem Layer | Phase 1: Quick-Start MVP (£0 Extra Spend) | Phase 2: Scaled & Autonomous (One-Time ~$19 OpenRouter Credit) |
| :--- | :--- | :--- |
| **Engineering & Maintenance** | **Claude Code** via terminal + **GitHub Pro** | **Claude Code** + Custom `CLAUDE.md` playbooks & automated GitHub Actions PR reviews |
| **Research & Citations** | **Gemini** (Source discovery) + **NotebookLM** (Citation synthesis) | Same + Dedicated topic notebooks acting as a personal research library |
| **Drafting & Formatting** | **Claude Project** (Outputs valid MDX + Frontmatter) | **Claude Project** + Voice-to-text capture (e.g., Wispr Flow or Apple Voice Memos) |
| **Hosting & Domain** | **Cloudflare Pages** (Free) + Domain (~£8–£10/yr) | **Cloudflare Pages** + Cloudflare R2 (for hosting large whitepapers/videos) |
| **Social & SEO Automation** | **GitHub Actions + OpenRouter `:free` models** (1 call per post, $0 cost) | **GitHub Actions + OpenRouter Paid Credits** (Higher rate limits, zero-data-retention models) |
| **Newsletter** | **Buttondown** (Free up to 100 subscribers, Markdown-native) | **Buttondown** automated RSS-to-Email digest triggered by new `Article` tags |
| **Analytics** | **Cloudflare Web Analytics** (Free) | **Cloudflare Analytics** + Monthly CSV fed into Gemini for editorial strategy |

---

## 4. Weekend Quick-Start Blueprint (Zero to Live in 3 Hours)

### Hour 1: Repository & Auto-Deploy Pipeline
1. **Create a Private Repo on GitHub Pro:** Name it `personal-platform` (you can make it public later if you wish, or keep it private forever—Cloudflare Pages deploys private GitHub Pro repos seamlessly).
2. **Scaffold via Claude Code:**
   * Open your terminal, clone the empty repo, navigate into it, and launch `claude`.
   * Give Claude Code this exact plain-English prompt:
     > *"Initialize a new Astro project in this directory with Tailwind CSS, TypeScript, and MDX support. Configure Astro Content Collections for two sections: 'portfolio' (case studies) and 'writing' (which supports categories: 'thoughts', 'case-studies', and 'curated-papers'). Design a clean, high-contrast, minimalist editorial aesthetic inspired by Stripe Press and Bear Blog. Include automatic RSS feed generation and an XML sitemap. Verify the build passes with zero errors."*
3. **Connect Cloudflare Pages:**
   * Log into Cloudflare $\rightarrow$ *Workers & Pages* $\rightarrow$ *Create* $\rightarrow$ *Pages* $\rightarrow$ *Connect to Git* $\rightarrow$ Select `personal-platform`.
   * Set build command to `npm run build` and output directory to `dist`. Click **Save and Deploy**.
   * Point your custom domain to Cloudflare Pages in the *Custom Domains* tab.

### Hour 2: System Guardrails (`CLAUDE.md`) & Portfolio Seeding
1. **Create Your Agent Constitution (`CLAUDE.md`):**
   * Place `CLAUDE.md` in the root directory. Claude Code reads this file automatically at the start of every session, enforcing:
     * Your design principles (typography, spacing, dark/light mode rules).
     * Strict frontmatter schemas (`title`, `pubDate`, `description`, `category`, `tags`, `featured`, `sources`).
     * Rule: *"Never ask the user to edit code manually. Always run `npm run build` after changes to verify zero TypeScript or Astro errors before finishing."*
2. **Populate Your Product Portfolio:**
   * Drop your resume, product specs, or rough bullet points of 2–3 past products into the terminal prompt:
     > *"Create 3 portfolio entries in `src/content/portfolio/` based on these notes. Structure each with: Executive Summary, The Problem, Strategic Decisions, Architecture/Execution, and Measurable Impact. Update the homepage to showcase these cleanly."*

### Hour 3: Configure Your Research & Editorial Pipeline
1. **Set Up Your Claude Project ("Managing Editor"):**
   * Upload 2–3 samples of your writing so it captures your natural cadence and directness.
   * Paste your exact Astro MDX frontmatter schema into the Project Instructions.
   * Instruct Claude: *"When I provide a researched outline and verified quotes from NotebookLM, draft a cohesive, authoritative piece in valid MDX. Always format citations cleanly with inline links and a 'References & Further Reading' section at the bottom."*
2. **Bookmark NotebookLM & Gemini:** Create a folder in your browser called `Publishing OS` with direct links to NotebookLM, Gemini, your Claude Project, and your GitHub repository.

---

## 5. Standard Operating Procedures (SOPs)

### SOP 1: The Research-Backed Publishing Workflow (45–60 Mins)
*Use this whenever writing an opinion piece, deep-dive article, or curated paper.*

1. **Thesis Dump (5 mins):** Open **Gemini** and state your raw hypothesis:
   > *"I am writing an article arguing that [insert thesis]. Act as a critical research analyst. Find 5–7 authoritative industry reports, academic papers, or credible case studies that support this, plus 2 strong counter-arguments I need to address. Provide direct URLs and key statistics."*
2. **Source Grounding & Synthesis (15 mins):**
   * Open **NotebookLM** and create a new notebook for the article.
   * Paste the best URLs and upload any relevant PDFs found by Gemini.
   * Prompt NotebookLM: *"Extract the strongest direct quotes, data points, and source attributions that validate my thesis, organized into a logical 4-part narrative outline."* (Click the inline citations in NotebookLM to verify every quote against the original text).
3. **Drafting in Your Voice (15 mins):**
   * Copy the verified outline and quotes from NotebookLM into your **Claude Project**.
   * Add your personal anecdotes, opinions, and framing. Have Claude generate the complete `.mdx` file plus a LinkedIn post and X thread.
4. **Review & Publish (10 mins):**
   * Drop the `.mdx` file into `src/content/writing/` (either via GitHub's web editor or by telling Claude Code: *"Save this draft as `new-post.mdx`, run a build check, and push to main"*).
   * Cloudflare automatically builds and deploys the live article in ~30 seconds.

### SOP 2: Zero-Code Site Evolution & Maintenance
* **Adding New Features:** Open terminal $\rightarrow$ `claude` $\rightarrow$ *"Add a filterable tag bar at the top of the Writing index page so readers can filter between Thoughts, Case Studies, and Curated Papers."*
* **Interactive Data/Diagrams:** Ask Claude Code to create reusable MDX components (e.g., `<CalloutBox />`, `<ComparisonTable />`, or Mermaid.js architecture diagrams) so your articles look like polished publications.
* **Monthly Maintenance (5 mins):** Enable **GitHub Dependabot** on your repo. Once a month, open `claude` and say: *"Review any open Dependabot PRs, merge safe updates, verify the production build passes, and clean up unused assets."*

### SOP 3: Automated Distribution & AI Search Optimization (GEO)
1. **AI Crawler Readiness (`/llms.txt`):** Ask Claude Code to create an automated `src/pages/llms.txt.ts` endpoint that dynamically lists all your portfolio projects, articles, and summaries in clean Markdown—ensuring ChatGPT, Perplexity, and Gemini accurately cite your work when users ask about your domain.
2. **OpenRouter CI/CD Automation (Free Tier $\rightarrow$ Optional $19 Credit):** Have Claude Code write a lightweight GitHub Action script triggered on pushes to `src/content/writing/` that calls **OpenRouter**.
   * **Start Free:** Point the script to a `:free` model endpoint (`openrouter/free` auto-router). Since it runs only once per published article, it costs **$0**.
   * **Upgrade Later ($19 Top-Up):** If you add $19 in credits for your app-building work, simply swap the model string in your GitHub Action to `google/gemini-2.5-flash` or `anthropic/claude-haiku-4.5` for higher rate limits and strict zero-data-retention privacy.
3. **Monthly Editorial Insights:** Download your monthly traffic CSV from **Cloudflare Web Analytics** and drop it into **Gemini** with the prompt: *"Identify which topics and formats are driving the highest engagement, and propose 3 high-leverage follow-up theses for next month."*