# AG Website — PRD

Sources: `docs/inception/User Confirmed Intent.md` (source of truth for intent), `docs/inception/MVP Build Plan.md` v2 (approved 2026-11-22), `docs/inception/Report and Recommendations.md` (agreed decisions 3.8–3.10, section 4). The Gemini drafts are history only.

## Goal
A personal professional website: a bilingual (EN/IT) portfolio and blog, built AI-first with automation by design. Ranked goals: (1) thought leadership, (2) career credibility with recruiters and hiring managers, (3) lead generation.

**First milestone (MVP, all four must hold):** live site with portfolio and About / Method page; first post produced end to end through the guided workflow; LinkedIn auto-post working; bilingual EN/IT working.

## Users
- **Reader:** product peers and leaders, recruiters and hiring managers, founders and potential clients. Mostly on phones.
- **Owner (App Creator):** owns Decision, Judgement and Approval. Does not write or review code.

## Scope of this repo
This repo (`ildruido/ag-website`) builds and maintains the **site and the publishing tools**: code, design, templates, content schema, CI, deploy, sample content. Published content (posts EN/IT, portfolio, About/Method, legal text, briefs, LinkedIn texts) lives in the separate repo `ildruido/ag-content` (not created yet), a Project of its own where **only the owner merges**; a merge there is the owner's approval and publishes. This repo never holds real unpublished content; tests use `content-sample/`.

## Requirements
1. **Site:** Astro static site on Cloudflare's free hosting (`static-site` pack), mobile-first, accessible, EN and IT from day one with language switch and alternate-language links; RSS, sitemap, `llms.txt`, legal pages, contact route.
2. **AI disclosure:** every post carries a short one-line disclosure of hybrid AI use, linking to the About / Method page.
3. **Approval:** nothing goes live without the owner's explicit approval; after approval, deploy and LinkedIn posting are fully automatic.
4. **Private content previews:** previews of `ag-content` PRs are behind Cloudflare Access, enforced by a blocking check, before the first real content PR.
5. **Publishing pipeline (built here, run on `ag-content`):** blocking checks (verbatim quotes, secrets, build, required language per the post's language option), style warnings, Gemini second opinion as a PR comment, go-live chain, approval record kept as data.
6. **Per-post language option:** English only; review both; or English reviewed with Italian AI-proofread. Recorded with the post; the site shows only approved languages.
7. **LinkedIn:** one post per language at launch, auto-posted after the live check, with an alert before the access token expires; failure never takes the site down.
8. **Guided content workflow:** designed later with the owner (stages, brief template, categories, deterministic vs AI split).

## Non-goals (for now)
Newsletter, other social channels, analytics dashboards, the custom review page (design 2), comments, accounts or any stored visitor data.

## Constraints
- New spend ceiling for the MVP: domain plus £10 total. No domain yet.
- Deterministic software for what must be consistent; AI only where it adds value; no wasted tokens on repeatable operations.
- No secrets in the repo, commits or chat.

## Decisions
| Date | Decision | Source |
| --- | --- | --- |
| 2026-11-21 | Intent, goals, audience, approval model, EN/IT, LinkedIn at launch, £10 ceiling | User Confirmed Intent |
| 2026-11-21 | Stack: Astro, GitHub, Cloudflare (free) | Report 4.6 |
| 2026-11-22 | Two repos, two Projects; only the owner merges `ag-content` | MVP Build Plan v2 |
| 2026-11-22 | MVP interface: chat is the hub, GitHub Merge is the approval act | Report 3.9 |
| 2026-11-22 | Models by role; Gemini free-tier API for the independent second opinion | Report 3.10 |
| 2026-11-22 | LinkedIn: one post per language, approved with its article | Report 4.2 |
| 2026-11-22 | Content previews private (Cloudflare Access); site-code previews may be public | MVP Build Plan 5, step 4 |
| 2026-11-22 | AI off, access "anyone, no login", storage none (site itself) | static-site pack |
| TBD | Site name and domain; content categories; research tools; success measures | Report 4.8–4.11 |

## Change log
- 2026-11-22: PRD and backlog created from the inception documents.
