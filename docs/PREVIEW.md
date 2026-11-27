# Hosting and previews (Cloudflare, free)

The site is plain files, published to Cloudflare's free static hosting (Pages) by `.github/workflows/deploy.yml`. Nothing runs on a server. Cost: the hosting is free; only a domain name costs money (optional: the free `ag-website.pages.dev` address works).

## Set-up (once, about 10 minutes, on a computer)

1. Sign up (free) at dash.cloudflare.com.
2. Copy your **Account ID**: dash.cloudflare.com > Workers & Pages > the "Account ID" box on the right.
3. Make the deploy key: top right profile icon > Profile > API credentials > API Tokens > Create token > name it `ag-website-deploy` > Policies: Start from scratch > Start with an Account policy > pick your account > search "Pages" > Cloudflare Pages: Edit > close the panel > Token expiration: 1 year > Continue to summary > Create Token. Copy the token now (it is shown once). Note the expiry date: the deploy stops working then, so renew it before (see `AGW-011` in the backlog).
4. In GitHub, the `ag-website` repo > Settings > Secrets and variables > Actions > Secrets > New repository secret. Add `CLOUDFLARE_API_TOKEN` (the token) and `CLOUDFLARE_ACCOUNT_ID` (the Account ID).
5. GitHub > Actions > Deploy > Run workflow (branch main). The first run creates the Cloudflare project and publishes the live site at `https://ag-website-2ko.pages.dev` (the name `ag-website` was already taken on pages.dev, so Cloudflare added a suffix; the Deploy run now prints the real address). If the repo has a different name from the Cloudflare project you want, add a repository variable `CLOUDFLARE_PROJECT` first (Settings > Secrets and variables > Actions > Variables > New repository variable).
6. Optional, your own domain: Cloudflare > Workers & Pages > the project > Custom domains > Set up a domain. Then add the repository variable `SITE_URL` with the full address (for example `https://example.com`) so canonical and alternate links use it.

From then on a release (a merge that changes `version` in `package.json`) publishes by itself. Until step 4 is done, previews and deploys say what is missing; they do not fail ordinary PRs.

## Previews: one link per pull request

Every ready PR from this repo is published at `https://pr-<number>.ag-website-2ko.pages.dev`, and the link is posted on the PR (the comment is updated on each push).

**Previews are public.** Anyone with the link can open one. They are not listed anywhere and send `X-Robots-Tag: noindex, nofollow` (so search engines skip them), but a link shared by mistake shows a draft to the world. Keep unpublished or private content out of previews, or protect them as below.

**Protect previews with Cloudflare Access (one click).** Cloudflare dashboard > Workers & Pages > `ag-website` > Settings > General > **Enable access policy**. This locks every preview address behind a Cloudflare sign-in for your Cloudflare account (the live site and your domain stay public). The first time, Cloudflare may ask you to set up Zero Trust: choose the Free plan (up to 50 users) and a team name. To let other people see previews, add them in Cloudflare Zero Trust > Access > Policies (the policy is named after the project). The PR comment still shows the link; it asks for sign-in.

**Switch previews off.** GitHub > Settings > Secrets and variables > Actions > Variables > New repository variable `PREVIEWS` = `off`. Delete it to turn them back on.

## Content from a separate repo (optional)

By default posts live in `content-sample/` in this repo, one file per post and language: `en/<slug>.mdx`, `it/<slug>.mdx`. To keep real content in another repo:

1. Put the same layout in the content repo (`en/…`, `it/…`).
2. Here: Settings > Secrets and variables > Actions > Variables: `CONTENT_REPO` = `owner/content-repo`, and optionally `CONTENT_REF` = a branch, tag or commit (default `main`; pin a tag or commit to publish only reviewed content).
3. If the content repo is private: GitHub profile > Settings > Developer settings > Personal access tokens > Fine-grained tokens > Generate new token. Repository access: Only select repositories > the content repo. Permissions: Repository permissions > Contents > Read-only. Copy it into a repository secret here named `CONTENT_REPO_TOKEN`.
4. Previews and the live site then build with that content. CI and the browser tests always use `content-sample/`, so they need no token.
5. To publish when the content repo changes, add a workflow there that runs on a push to its `main` and calls `gh api repos/<owner>/ag-website/dispatches -f event_type=content-updated` with a token secret that may write to this repo (Contents: Read and write). The Deploy workflow here then redeploys main with the newest content.

A merge in the content repo is then a publish: protect that repo's `main` the way this one is protected.

## Content repo: private previews and publishing (once, about 30 minutes, on a computer)

The content repo is `ildruido/ag-content`. A merge there is your approval and publishes the site. Its draft previews sit behind Cloudflare Access and a blocking check fails any PR whose preview a signed-out visitor could read. The two workflow files to copy are in `docs/content-repo/`. This site repo is public, so the content repo needs no key to read the site code.

**A. Create the repo.** GitHub > New repository > owner `ildruido`, name `ag-content`, **Private**, add a README. Put posts in `en/` and `it/` (same layout as `content-sample/`).

**B. Make your Merge the only way to publish.** Note: on GitHub's Free plan, rulesets are not enforced on private repos. If Settings > Rules says so, upgrade is not needed: skip B, use fallback (a) or (b) from step F, and still do the other steps. In `ag-content`: Settings > Rules > Rulesets > New ruleset > New branch ruleset.

1. Ruleset 1, name `Only the owner updates main`. Enforcement: Active. Bypass list > Add bypass > Repository admin, mode "For pull requests only". Target branches > Add target > Include default branch. Rules: tick **Restrict updates** and **Block force pushes**. Create.
2. Ruleset 2, name `Checks for everyone`. Enforcement: Active. Bypass list: leave empty (so the checks bind you too). Target: default branch. Rules: tick **Require a pull request before merging** and **Require status checks to pass** > Add checks > `private-preview` (it appears after the first PR has run; add it then). Create.
3. Settings > General > Pull Requests: untick **Allow auto-merge**.

**C. Cloudflare Access for previews** (free, up to 50 people).

1. Cloudflare dashboard > Workers & Pages > Create > Pages > Upload assets > project name `ag-content-preview` > upload any one small file > Deploy.
2. That project > Settings > General > **Enable access policy**. If asked to set up Zero Trust, choose the Free plan and a team name.
3. Zero Trust > Access > Applications > the one named after the project > Policies: allow **Emails** = your email, login method One-time PIN (a code is emailed to you).

**D. Secrets and workflows in `ag-content`.**

1. Settings > Secrets and variables > Actions > New repository secret: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` (the same values as in the site repo; the token is shown only once, so paste the one you saved or make a new one with Step 3 above).
2. GitHub profile > Settings > Developer settings > Personal access tokens > Fine-grained tokens > Generate new token. Name `ag-content-publish`, Expiration 1 year, Repository access: Only select repositories > `ag-website`, Repository permissions > Contents > **Read and write**. Copy it into an `ag-content` secret named `SITE_DISPATCH_TOKEN`. Note the expiry date: publishing stops then.
3. Add the two files from `docs/content-repo/` (`content-preview.yml`, `publish.yml`) to `ag-content` under `.github/workflows/`, on a branch, and open a PR. Its check `private-preview` must pass; if it fails with "PUBLIC", step C is not done.

**E. Let the site read the content when it publishes.** Another fine-grained token: Repository access: only `ag-content`, Contents **Read-only**, 1 year. In this repo: Settings > Secrets and variables > Actions > Secret `CONTENT_REPO_TOKEN` = the token; Variable `CONTENT_REPO` = `ildruido/ag-content`. Note the expiry date too.

**F. Prove it.** (1) Open the preview link from step D3 in a private browser window: it must ask for an email code, not show the page. (2) Ask Claude to try merging a throwaway PR in `ag-content`: GitHub must refuse. If it does not, tell Claude: the plan's fallback (a) (a separate free GitHub account for Claude) or (b) (a written rule plus an alert on every publish) is then your choice. (3) Merge that PR yourself and watch Actions: `Publish` here and `Deploy` in this repo run, and the live site shows the new content.

Site-code previews in this repo are still public. When `CONTENT_REPO` is set they show only content you have already published (its `main`).

## Notes

- The deploy token can publish this one Cloudflare account's Pages projects and nothing else. Keep it only in the GitHub secret, never in the repo, issues or chat.
- A PR that changes `.github/workflows/` or the npm scripts can read the deploy secrets when its preview runs: review those changes first (the reviewer checklist says so).
- Previews are deleted by Cloudflare after 30 days (the 100 newest are kept).
