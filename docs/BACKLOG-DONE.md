# Backlog: done

Finished items, newest first.

### AGW-001 Bilingual site foundation on a free address
- Done in: v0.1.0
- Why: readers can open a fast, readable site in English or Italian.
- Acceptance criteria:
  - [x] Given the live address, when a visitor opens the home page, then it shows in English with a visible switch to Italian, and the Italian home page switches back.
  - [x] Given a phone-width screen, when any page is opened, then it reads well with no sideways scrolling.
  - [x] Given each language page, when its source is inspected, then it has the correct language tag and links to its alternate language.
  - [x] Given the site, then it shows sample content only and is deployed at the free Cloudflare address.
- Notes: depends on the Cloudflare account and deploy token (Admin checklist, `docs/PREVIEW.md`). Uses `content-sample/`.
