# Changelog

All notable changes. Format: Keep a Changelog; versions: SemVer.

## Unreleased

### Changed

- Harness updated from studio 0.31.0 to 0.48.0 (skills, agents, hooks, push gate; no change to the site). The app keeps its own deploy workflow and preview notes.

### Fixed

- Docs: the free address named in `docs/PREVIEW.md` is `ag-website-2ko.pages.dev` (the app's real one).

- The live address is `https://ag-website-2ko.pages.dev` (the name `ag-website` belongs to someone else on pages.dev). The Deploy workflow now reports the real address Cloudflare returns, builds with it, and fails the release if `/en/` or `/it/` there don't have "AG Website" in the page title.

### Added

- Private content previews: a blocking check (`scripts/preview-privacy-check.ts`) that fails a content PR when its preview can be read without signing in, ready-to-copy workflows for the `ag-content` repo (private preview behind Cloudflare Access; a merge there tells this site to rebuild and deploy), and exact set-up steps in `docs/PREVIEW.md`. Not live until the Admin steps there are done.
- Privacy and Contact pages in English and Italian (no cookies, no tracking; contact by email, address set with `PUBLIC_CONTACT_EMAIL`, sample until then), linked from a new footer. Per-language RSS feeds (`/en/rss.xml`, `/it/rss.xml`), `sitemap.xml`, `llms.txt` and `robots.txt`, all listing live content only (portfolio entries included).
- An About / Method page in English and Italian (sample text) explaining the hybrid human + AI process, linked from the menu. Every post shows a one-line AI disclosure linking to it in the post's language.
- Portfolio section (list and one page per entry) in English and Italian, with a Portfolio link in the menu and on the home page; sample entries added. A post or entry in one language only is not offered in the other: the language switch links to the other language only when it exists.

### Fixed

- The language switch and the alternate-language link now stay on the same page (for example Blog to Blog) instead of always jumping to the home page. A post that exists in one language only declares no alternate.

- Docs: Cloudflare deploy-token steps updated to the current dashboard screens; added AGW-011 (renew the token before 2027-11-22).
