# User Confirmed Intent

**Status:** Confirmed by the user in interview, 2026-11-21. This is the only source of truth about intent until the user decides otherwise. It supersedes the Gemini draft plan, which is kept as historical documentation only.

## 1. What we are building
A personal professional website with two parts: a **portfolio** of products/projects and a **blog**. It follows an **AI-first / automation-by-design** approach.

## 2. Goals (ranked)
1. **Thought leadership** (first priority): build reputation and audience through writing.
2. **Career credibility**: prove senior product-leadership standing to recruiters and hiring managers.
3. **Lead generation** (least important): attract founders and potential clients.

## 3. Audience
Product peers and leaders; recruiters and hiring managers; founders and potential clients.

## 4. Roles and approval model
- **The user owns Decision, Judgement and Approval.** Site automation owns Operations.
- **Nothing goes live without the user's explicit approval.** This applies to site content and to social posts alike.
- Once the user approves go-live, **publishing is fully automatic** (site deploy and social post). No manual copy-paste or manual posting steps.

## 5. How content is created (guided workflow)
1. The user supplies an initial idea or concept.
2. The user is taken through an **iterative, structured workflow**. The workflow itself is a defined process, which may be run by deterministic software, by AI, or by a mix of both, with AI assisting at the steps where it adds value (for example research, challenge, drafting). Its steps are illustrative here (e.g. brainstorm, light/medium research and thesis validation, adaptation, originality check) and will be designed later, including which parts are deterministic and which are AI-assisted.
3. The workflow ends in a completed **full brief**.
4. The full piece is produced from the brief (AI-assisted drafting).
5. The user approves or requests changes. After final approval the site publishes.

The exact workflow is to be **designed later**; it is not fixed by this document.

## 6. AI disclosure
Every post carries a short, slightly catchy one-line disclosure of the hybrid AI use, linking to a dedicated **About / Method page** ("my private creative lab") that explains the process. Example tone given by the user: *"My brain and ideas; AI effort and missing capabilities. Learn how this article was created in my private creative lab."*

## 7. Languages
**English and Italian from day one.**

## 8. Social distribution
- **LinkedIn at launch**, posted automatically after approval, at no cost. The user must be told if this cannot be free.
- Other channels are added later.
- Newsletter and other marketing spend are a separate, later budget.

## 9. Portfolio
A mix of real work (some named, some anonymised) plus personal projects.

## 10. Content categories
Open to change. The Gemini categories (thoughts, case studies, curated papers) are not binding.

## 11. MVP success criteria (all four)
1. Live site with portfolio and an About / Method page.
2. First post produced end to end through the full guided workflow.
3. LinkedIn auto-post working.
4. Bilingual EN/IT working.

## 12. Cost constraints
- Low cost is a must.
- **New spend ceiling for the MVP: domain cost plus £10 total** for added tools or anything else proposed.
- Existing subscriptions can be used (Claude Pro, Claude Code, Google AI Plus with Gemini/NotebookLM, GitHub Pro, OpenRouter free tier). The user has **no domain yet**.

## 13. Technology stance
The user has no technology preference. Outcome matters, within the cost limit. Gemini's stack (GitHub, Astro, Cloudflare Pages, etc.) is to be evaluated objectively and may be kept, partly kept, or replaced.

## 14. Interface principle
A **single primary interface** should drive the whole workflow, integrating external components as needed. A hop to a separate external interface is acceptable only if one of these holds:
- integration in the primary interface is technically unfeasible;
- integration is feasible only with unacceptable degradation;
- the hop brings major benefit (clearly better quality, a unique feature, or a tangible cost or time reduction).

## 15. AI vs deterministic software principles
1. AI creativity, intelligence and judgement are used only where they add value. Deterministic software is used for what needs to stay consistent and avoid deviations.
2. Wise token utilisation: the goal is not minimum token use at all costs, but not wasting tokens on repeated operations that a clean deterministic implementation can do.

## 16. User profile and working rules (from the user's global preferences)
Product Manager, ex-engineer, does not write or review code. Judges work by product behaviour. Needs plain-language reporting, verification before "done", small commits, no secrets in repos, and light Claude usage (Pro plan).
