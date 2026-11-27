# Backlog: done

Finished items, newest first.

### AGW-003 Portfolio and blog pages with sample content
- Done in: v0.1.0
- Why: the two parts of the site, ready for real content.
- Acceptance criteria:
  - [x] Given sample content, when a visitor opens Portfolio and Blog in either language, then each shows a list and each entry opens its own page.
  - [x] Given a post live in one language only, then the site links to the other language only once it exists.
- Notes: content schema supports the per-post language option (PRD 6).

### AGW-002 About / Method page and AI disclosure line
- Done in: v0.1.0
- Why: build trust by explaining how content is made.
- Acceptance criteria:
  - [x] Given the site, when a visitor opens About / Method in either language, then it explains the hybrid human + AI process in plain words (sample text until the owner approves real text).
  - [x] Given any post, then it shows one short disclosure line that links to the About / Method page in the post's language.
- Notes: real wording is approved by the owner via `ag-content`.

### AGW-001 Bilingual site foundation on a free address
- Done in: v0.1.0
- Why: readers can open a fast, readable site in English or Italian.
- Acceptance criteria:
  - [x] Given the live address, when a visitor opens the home page, then it shows in English with a visible switch to Italian, and the Italian home page switches back.
  - [x] Given a phone-width screen, when any page is opened, then it reads well with no sideways scrolling.
  - [x] Given each language page, when its source is inspected, then it has the correct language tag and links to its alternate language.
  - [x] Given the site, then it shows sample content only and is deployed at the free Cloudflare address.
- Notes: depends on the Cloudflare account and deploy token (Admin checklist, `docs/PREVIEW.md`). Uses `content-sample/`.
