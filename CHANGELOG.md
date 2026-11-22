# Changelog

All notable changes. Format: Keep a Changelog; versions: SemVer.

## Unreleased

### Added

- Privacy and Contact pages in English and Italian (no cookies, no tracking; contact by email, address set with `PUBLIC_CONTACT_EMAIL`, sample until then), linked from a new footer. Per-language RSS feeds (`/en/rss.xml`, `/it/rss.xml`), `sitemap.xml`, `llms.txt` and `robots.txt`, all listing live content only.
- An About / Method page in English and Italian (sample text) explaining the hybrid human + AI process, linked from the menu. Every post shows a one-line AI disclosure linking to it in the post's language.

### Fixed

- The language switch and the alternate-language link now stay on the same page (for example Blog to Blog) instead of always jumping to the home page. A post that exists in one language only declares no alternate.

- Docs: Cloudflare deploy-token steps updated to the current dashboard screens; added AGW-011 (renew the token before 2027-11-22).
