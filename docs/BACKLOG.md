# Backlog

Item template and rules: `CLAUDE.md`. Finished items move to `docs/BACKLOG-DONE.md`. Order within Ready is priority.

## Roadmap

- **Now:** AGW-004
- **Next:** AGW-005, AGW-006, AGW-007, AGW-008
- **Later:** AGW-009, AGW-010, AGW-011

## Ready
### AGW-006 Publishing checks on content PRs
- Why: integrity problems block a post before the owner sees it.
- Acceptance criteria:
  - [ ] Given a content PR, when a quote is not verbatim in its saved source, a secret is staged, the build fails, or a required language is missing, then the PR is blocked with the reason shown.
  - [ ] Given a style problem (tone, length, banned phrases), then a warning is shown but the PR is not blocked.
  - [ ] Given a content PR, then a Gemini second opinion is posted as a comment (free tier).
- Notes: plan steps 4–5; Gemini key as a GitHub secret, never in chat.

### AGW-007 Approval record and go-live chain
- Why: publishing is automatic after approval and always traceable.
- Acceptance criteria:
  - [ ] Given the owner merges a content PR, then the site is built, deployed, confirmed live, and the owner is told what went live with links.
  - [ ] Given a publish, then approval state, check results and revision history are stored as data in `ag-content`.
  - [ ] Given a request to take a post down, then reverting it is one step.

### AGW-008 LinkedIn auto-post
- Why: distribution without manual copy-paste.
- Acceptance criteria:
  - [ ] Given a post confirmed live, then its approved LinkedIn text (one per language) is posted automatically.
  - [ ] Given a failed post or a token about to expire, then the owner is alerted and the site stays live.
- Notes: official API, free developer app; may require a LinkedIn Page (verify). If it cannot be free or automatic, ask the owner before choosing a fallback.

## Backlog

### AGW-009 Design the guided content workflow
- Why: the owner is taken from idea to full brief in a defined process.
- Acceptance criteria:
  - [ ] Given a design conversation, then stages, brief template, categories, and which steps are deterministic or AI-assisted are agreed and recorded in the PRD.
- Notes: plan step 5; a discussion with the owner, not code. Leads to the Publishing Project's skills in `ag-content`.

### AGW-010 Connect the domain
- Why: the site lives at the owner's own name.
- Acceptance criteria:
  - [ ] Given the chosen domain, then the site opens on it in both languages with HTTPS.
- Notes: owner picks the site name and buys the domain (about £10/year); before the first post.

### AGW-011 Renew the Cloudflare deploy token before it expires
- Why: the deploy token expires on 2027-11-22; after that, releases and previews stop publishing.
- Acceptance criteria:
  - [ ] Given a date before 2027-11-22, then a new token is made (`docs/PREVIEW.md` step 3), the GitHub secret `CLOUDFLARE_API_TOKEN` is replaced, and a Deploy run succeeds.
- Notes: reminder for the owner; due by 2027-11-08 to leave margin. Never put the token in the repo or chat.

## To test
### AGW-004 Legal pages, contact route, RSS, sitemap and llms.txt
- Why: a complete, discoverable, compliant site.
- Acceptance criteria:
  - [x] Given the site, then privacy/legal and contact pages exist in both languages.
  - [x] Given the site, then an RSS feed, a sitemap and `llms.txt` are published and list only live content.
- Notes: no cookies or tracking in the MVP; Cloudflare Web Analytics is optional later.

### AGW-005 Content repo link and private preview check
- Why: the owner's merge in `ag-content` must be the only way to publish, and drafts must stay private.
- Acceptance criteria:
  - [ ] Given `ildruido/ag-content`, when the owner merges a content PR, then the site rebuilds with that content and deploys.
  - [ ] Given a content PR preview, when opened while signed out, then it shows the login page, and a blocking check fails the PR if it is publicly readable.
  - [ ] Given a test merge attempt by Claude in `ag-content`, then GitHub refuses it (or the owner chooses fallback (a) or (b) from the plan).
- Notes: needs the Admin to create `ag-content`, its rules, the cross-repo key and Cloudflare Access (exact clicks to be given). Plan step 4.

## In progress

## Done
- AGW-003 Portfolio and blog pages with sample content — v0.1.0
- AGW-002 About / Method page and AI disclosure line — v0.1.0
- AGW-001 Bilingual site foundation on a free address — v0.1.0
