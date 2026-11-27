# AG Website — project instructions

Read this first in every session. It applies to every change in this repo.

## App profile

The skills and agents in `.claude/` are the shared studio harness, copied from `app-studio`. They know nothing about this app: they read this table and the two lists below for everything app-specific. Keep it current.

| Field          | Value                                                                       |
| -------------- | --------------------------------------------------------------------------- |
| App | AG Website |
| Phase | `build` |
| Id prefix | `AGW` (backlog items are `AGW-001`, `AGW-002`, …) |
| Stack | `static-site` |
| User | the reader (a product peer, recruiter, hiring manager or founder), and the site owner who approves content |
| Repo | https://github.com/ildruido/ag-website (public since 2026-11-27; real unpublished content never lives here) |
| Release target | https://ag-website-2ko.pages.dev (Cloudflare Pages; custom domain later) |
| Preview target | a public preview link per PR (`docs/PREVIEW.md`); previews of the separate content repo must be private (Cloudflare Access) |
| Capabilities | none (a static site reaches no host capability) |
| AI | `off` (the published site makes no AI calls) |
| AI plan | none |
| Access model | `anyone, no login (public website)` |
| Storage shape | `none (no data is stored)` |
| Decision log   | `docs/PRD.md` "Decisions" (default; change it only if the app keeps its own decision log, and give its path) |
| Owner-merged repos | `ildruido/ag-content` |
| AI public use | n/a (AI is off) |

**Owner-merged repos.** Repos where only the App Creator merges, e.g. a content repo that publishes on merge. In them Claude never merges, switches on auto-merge or approves a PR: it opens the PR and says it waits for the App Creator. List them as `owner/repo`, comma-separated; `none` (the default, also when the row is missing) means no such repo.

**Phase.** In `discovery` an app has no stack, starter code or CI yet, and any row except App, Id prefix, Repo and Phase may say `TBD` (optionally `TBD (decided at build start)`): "not decided yet", never a made-up value. `build-feature`, `release` and `test-handoff` stop in discovery. In `build` the health check fails on any `TBD`. The App Creator's "start building" switches the phase (`new-app`, "Start building").

The AI, Access model and Storage shape rows are the **Features** the spec phase (`prd-intake`) records, one question at a time, with no preselected answer. The harness never picks them: an app starts with none of these features until the App Creator chooses.

### Domain rules

Rules about this app's subject that every plan, prompt and diff must respect. The planner lists them under Risks, prd-intake checks requests against them, and the reviewer treats a breach as blocking.

- **Nothing goes live without the owner's explicit approval.** Published content lives in `ildruido/ag-content`, where only the owner merges (Owner-merged repos). This repo never holds real unpublished content: tests and CI use sample content only.
- **Content previews are private.** Previews of content PRs sit behind Cloudflare Access; a publicly readable content preview is a blocking failure. Site-code previews (sample content only) may be public.
- **Bilingual from day one:** every page and post exists in English and Italian.
- **AI disclosure:** every post carries a short one-line disclosure of its hybrid AI use, linking to the About / Method page.
- **Low cost:** new spend ceiling for the MVP is the domain plus £10 in total; use free tiers. Tell the owner before any step that would cost money.
- **Deterministic where it must be consistent:** AI only where it adds value; repeatable checks and publishing steps are plain code run by CI.
- **Confidentiality:** portfolio entries about real work may be named or anonymised; never publish client-confidential detail.

### Stack notes

Build, QA and release steps that depend on the stack. Skills say "the stack notes" when they mean this list **plus** the docs of each stack pack the app has (`.claude/packs/<name>/`, listed under `packs` in `.claude/studio/lock.json`): `STACK.md` (rules and limits), `RELEASE.md`, `QA.md` and `REVIEW.md`. Keep this list to what is specific to this app; the packs cover the rest.

- **Build:** `npm run build` produces the static site in `dist/` (Astro); see `.claude/packs/static-site/STACK.md`.
- **QA:** `.claude/packs/static-site/QA.md`; browser tests run against `content-sample/`; check both languages and mobile width.
- **Release:** `.claude/packs/static-site/RELEASE.md`; the pack's `deploy.yml` deploys to Cloudflare Pages (setup: `docs/PREVIEW.md`).
- **Preview:** `deploy.yml` posts a preview link per PR; public unless Cloudflare Access protects it (`docs/PREVIEW.md`).

## Roles

<!-- studio:begin roles (harness-owned: a sync replaces everything up to the end marker; keep app-specific roles outside it) -->
- **The App Creator (PM) and the Tester.** The App Creator is also the Tester unless someone else tests. The App Creator describes requirements and sets priority by ordering the backlog; the Tester tests releases and reports results. Neither writes code, runs commands or manages git. The few things only the Admin can do (creating a repo, adding a repository secret, a host's settings) Claude hands over as exact clicks.
- **Claude (engineer).** Owns all code, tests, versioning, releases and the harness. Turns the App Creator's words into PRD and backlog changes, builds, ships and hands over a test script.
- Ask the App Creator only when a requirement is genuinely ambiguous or a decision is product-level. Ask one question at a time, each with a recommended answer and one line on why. Everything technical is ours to decide.
<!-- studio:end roles -->
- **Where decisions are recorded.** Product decisions go in the app's decision log (App profile, Decision log row; `docs/PRD.md` "Decisions" when the row is left at its default). Technical decisions go in the PR description.

## The product in one paragraph

A personal professional website for thought leadership and career credibility: a bilingual (EN/IT) portfolio and blog with an About / Method page, built AI-first with automation by design. Readers are product peers, recruiters and founders. The one rule that matters most: nothing goes live without the owner's explicit approval. See `docs/PRD.md` and `docs/BACKLOG.md` (finished items are archived in `docs/BACKLOG-DONE.md`; read it only to look one up).

## Stack and commands

Every app defines these npm scripts; the harness relies on them.

| Command            | What it does                                                   |
| ------------------ | -------------------------------------------------------------- |
| `npm run dev`      | Local dev server                                               |
| `npm run check`    | Format check, lint, unit tests, build. Run before every push   |
| `npm test`         | Unit tests                                                     |
| `npm run test:e2e` | Build, then the browser tests (`-- e2e/<name>.spec.ts` for one area) |
| `npm run build`    | Production build                                               |

Layout: `src/` app code (keep logic that doesn't touch the DOM in plain modules so it is unit-testable), `tests/unit/` unit tests, `e2e/` browser tests, `docs/` PRD and backlog, `.claude/` harness.

Scripts: `build` builds the app's primary target; `build:artifact` and `build:web` build one target each (added by the stack packs; a static site has only `build`). Browser tests live in `e2e/<target>/` (a static site: `e2e/`).

Platform layer: every host capability (storage, sign-in, downloads, and AI calls when the app uses AI) is reached through one platform module, so the artifact and web builds swap implementations without touching features. (A static site has no platform layer: it has no host capabilities to reach.)

CI (`.github/workflows/ci.yml`, a starter file from the stack pack that is now this app's own) runs once per PR and on `main`, scaled to what changed: Markdown-only and harness-only (`.claude/`) changes run only the quick `CI gate` job on a PR (the `Harness` workflow checks them) and nothing on `main`, a version bump skips the browser tests, draft PRs wait until marked ready, and `main` runs only the quick checks after a merge (start the full suite by hand before a release). Push once per feature.

## Runtime rules

- Every host capability (storage, sign-in, downloads, and AI if the app uses it) may be missing or denied. Design for absence: the app still renders and explains itself.
- The app declares exactly the capabilities the code uses (App profile, Capabilities). Adding one is a release-note item, because the App Creator gets a new consent prompt.
- Only if the App profile says AI is on: AI calls happen only on a user action, never in a loop or timer. Branch on the error code; never retry automatically. Use the cheapest model tier that does the job (App profile, AI plan). Tests fake every AI call; they never call a real model.
- Tests fake every host capability; they never reach the real host.
- Only load what the stack allows from outside (see the stack notes); bundle everything else.

## Backlog and roadmap

The repo is the single source of truth: the backlog is `docs/BACKLOG.md`. **The Roadmap list is optional**: it exists only when the app has the `roadmap` module (`.claude/packs/roadmap/` is there; `pack add roadmap`). An app without it has no Roadmap list, no roadmap script and no roadmap test, and nothing below that mentions the Roadmap list applies to it; the coordinator keeps priorities in the order of the backlog's Ready section. With the module, the roadmap is the **Roadmap** list (Now / Next / Later ids, in priority order) at the top of `docs/BACKLOG.md`, and a roadmap page, if the app has one, is rebuilt from it (`npm run roadmap:data`), never edited by hand.

- **The coordinator (the Project chat) owns the App Creator's product decisions:** new ideas, priorities and order. It has the backlog change made in a short thread of its own (no standing roadmap thread, which would be a long-idle thread revived over and over), and that thread places new items in the Roadmap list and rebuilds the roadmap page (with the module).
- **Planning threads** may add App Creator-approved items to the backlog in their own PR (the plan and its items stay together) but, with the module, must place every new open item in the Roadmap list. The coordinator gives a planning thread an ID range up front.
- **Backlog ids are never picked blindly.** Parallel threads each choosing "the next number" gave two items the same id. (1) The coordinator reserves ids: when it starts a thread that adds items, it names the ids (or a range) in the thread's brief, and a thread uses only those. (2) A thread without ids reads `docs/BACKLOG.md` and `docs/BACKLOG-DONE.md` on the latest `origin/main` and in every open PR, takes the next number above all of them, and checks again right before opening its PR and after any rebase; if the id was taken meanwhile it renumbers its own item (and every reference to it). (3) The harness health check (the pre-commit hook) fails when two items share an id, so a duplicate can't be committed.
- **Feature threads** keep marking their own items To test and Done (`test-handoff`) and, with the module, move them out of the Roadmap list when they reach Done.
- **A check keeps it honest (with the module):** the unit test `tests/unit/roadmap.test.ts` (and `npm run roadmap:check`, for Markdown-only PRs that start no CI) fails when an open item is missing from the Roadmap list, listed twice, or listed but not open.

## Definition of done

A backlog item is done when all of these are true:

1. Every acceptance criterion in `docs/BACKLOG.md` is met.
2. New logic has unit tests; any new user flow has a browser test.
3. `npm run check` and the e2e specs for the changed area pass locally, and CI (the full suite) is green on the PR.
4. The `reviewer` agent has reviewed the diff and its blocking findings are fixed.
5. `CHANGELOG.md` has an entry under `Unreleased`.
6. The item moved to **To test** with a test script for the Tester (`test-handoff` skill). It moves to **Done** only after the Tester confirms.

## Git workflow

- Never commit straight to `main`. One branch per backlog item: `feat/<id>-<slug>`, `fix/<id>-<slug>`, `chore/<slug>`.
- **Conventional Commits** for every commit: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`, `ci:`, `build:`. Add a scope when useful. Breaking changes use `!` or a `BREAKING CHANGE:` footer. Reference the backlog id in the body (`Refs: <XX>-012`).
- **Tests green before every push.** Run `npm run check` first; the Stop hook also runs the unit tests. Never push red, never skip hooks.
<!-- studio:begin merge-rule (harness-owned: a sync replaces everything up to the end marker; keep app-specific rules outside it) -->
- **Merging a PR** (every skill that says "merge it" means this). Open it ready for review with a Conventional Commit title. **Never open a draft PR: its checks are skipped and it never merges, silently.** Read it back (`pull_request_read`, `get`); if `draft` is `true`, mark it ready (`update_pull_request`, `draft: false`) before you hand back. Then squash-merge once `CI gate` and `health` are green, else switch on auto-merge (`enable_pr_auto_merge`, `SQUASH`) and follow the PR (`subscribe_pr_activity` plus a wake-up about 3 minutes out). Never bypass a check or merge a blocked PR. The full procedure is `.claude/skills/build-feature/merge.md`.
  - **Owner-merged repos** (App profile): never merge, auto-merge or approve there; open the PR and say it waits for the App Creator.
  - **No safety checks, no merge.** If the session did not start with "Studio harness loaded" (see `.claude/skills/harness-sync/harness.md`, "Cloud sessions"), say so in your first reply and leave merging to the App Creator unless `/tmp/studio-hooks.log` shows hooks ran.
  - **`app-studio` is never changed from here, with no exceptions** (no approval lifts it): decline in one line and file a `harness-idea` issue instead. Issues and comments there stay allowed.
<!-- studio:end merge-rule -->
- **The checks.** Every PR gets `CI gate` (it sums up the `CI` jobs: a job rightly skipped, as for a Markdown- or `.claude/`-only change, counts as passed, and a draft never passes) and `health` (the `Harness` workflow). Only each check's latest run counts (a re-run replaces the older one), on GitHub and in the merge hook. Never merge around them.
- Never force-push `main`. Never rewrite a published tag.

## Versioning and releases

- **SemVer tags** `vMAJOR.MINOR.PATCH` on `main`, matching `package.json`'s `version`. While below 1.0.0: `feat` bumps MINOR, `fix` bumps PATCH, breaking changes bump MINOR.
- `CHANGELOG.md` follows Keep a Changelog. Work lands under `Unreleased`; a release moves it under the new version with the date.
- Releases follow the `release` skill: only from a green `main`, then the stack notes' release steps, so the App Creator's link never changes.

## Harness

- Shared harness, copied from `app-studio` (the master copy) and pinned in `.claude/studio/lock.json`: skills `prd-intake`, `build-feature`, `test-handoff`, `release`, `new-app`, `harness-sync`, `harness-idea`, `migrate-app`; agents `planner`, `reviewer`, `qa`; hook scripts `.claude/hooks/check.mjs`, `.claude/hooks/cloud-setup.mjs` and the git hook `.claude/hooks/pre-commit`; and the stack packs' docs in `.claude/packs/`. Anything app-specific goes in the App profile above.
- **The harness changes only in `app-studio`'s own Project or session, never from this app's work.** Don't edit these files here and don't change `app-studio` from here: send ideas with the `harness-idea` skill (it opens an issue on app-studio), and pull released changes with the `harness-sync` skill when the App Creator asks.
- A stack pack's starter files (CI workflow, configs, server, platform adapters) were copied in once and are this app's own code. When `app-studio` improves one, the session-start check says so; merge it by hand and run `node .claude/studio/studio-sync.mjs ack`.
- Hooks in `.claude/settings.json`: ESLint on every edited TS/JS file, and again when a turn ends on every TS/JS file changed since the last push (so files written by shell commands are linted too), unit tests when a turn ends, a harness sync warning when a session starts, a harness health check before every `git commit` (`node .claude/studio/studio-sync.mjs health`: shared files unedited, this App profile filled in, hooks wired, the app's own skills and agents well formed, doc links working, the `Harness` workflow present), a merge gate on the GitHub merge tool (blocks until the PR's checks were read and are all green), and a block on writing files to this repo through the GitHub API (use the local clone, so the health check runs). The health check is also a real git pre-commit hook (`core.hooksPath` = `.claude/hooks`), which every `studio-sync.mjs` command turns on, so it holds for any commit. A lint, test, health or merge hook failure is a blocker: fix it, don't bypass it (no `--no-verify`).
- The `Harness` workflow (`.github/workflows/harness.yml`) runs the same health check on PRs that touch `.claude/`, Markdown or workflows, so a harness- or docs-only change is still checked.

## Cloud sessions (claude.ai/code)

- **One branch.** A cloud session is given one branch (e.g. `claude/…`) and may push only there. Use it for every PR in turn: after a squash-merge, reset it to `origin/main` (`git reset --hard origin/main`) before the next item, and push only together with that item's first commit. Never push the bare reset: GitHub deletes the branch on merge and that push would recreate it as a leftover. Don't push any other branch from a cloud session; open the PR from the session branch. The PR title and `Refs:` carry the item id.
- **Tags are made by CI.** A cloud session can't push tags (the git proxy refuses them), so the `Release tag` workflow tags each release when its PR merges (`release` skill, step 8). Only an app without that workflow lists pending tags in `docs/RELEASES.md` for a local session to push.
- **Several repos attached (always, in a Claude Code Project).** The session then starts in the folder above this repo, and Claude Code loads skills, agents and `.claude/settings.json` only from that start folder, so nothing of this app's harness loads by itself. The **"app-studio apps" cloud environment** fixes that before the session starts: its setup script (`app-studio/scripts/env-setup.sh`) installs a launcher in the start folder and wires it in the user settings (`~/.claude/settings.json`; cloud sessions run no hooks from a folder's `.claude/settings.json`). At every session start and hook the launcher links this app's skills and agents there, runs this app's hooks, installs dependencies (`cloud-setup`), sets `PW_CHROMIUM` and turns on the git pre-commit check, and the session opens with "Studio harness loaded for the app repo …". Hooks are silent when they pass; each run is logged in `/tmp/studio-hooks.log` (time, hook, exit code), so `tail /tmp/studio-hooks.log` shows they ran. **Without that message the safety hooks did not load:** tell the App Creator (see "Merging a PR", step 6; the Project may not be on that environment), then run `node <this repo>/.claude/studio/studio-sync.mjs check` before any other work: it turns on the git pre-commit check and forwards the lint, test, merge and write hooks to the user settings, which the session re-reads mid-session (best effort; the git pre-commit check holds either way, and the merge and write rules in "Git workflow" apply even if no hook stops you). Then run `npm ci` here if the app has dependencies.
- **One repo attached.** This repo's own `.claude/` loads, and the `SessionStart` hook `.claude/hooks/cloud-setup.mjs` (cloud sessions only) installs dependencies (the container's global Prettier is older than the repo's, so `npm run check` fails on untouched files until `npm ci` has run), sets `PW_CHROMIUM`, and runs the app's own `scripts/cloud-setup.sh` if it has one (e.g. a local database for server tests). Output: `/tmp/cloud-setup.log`. The environment's setup script runs that script too.
- **E2E:** the container's Chromium may not match Playwright's, so `PW_CHROMIUM` points at it (set by the environment or `cloud-setup`). If it's unset: `PW_CHROMIUM=/opt/pw-browsers/chromium-<n>/chrome-linux64/chrome npm run test:e2e` (`chrome-linux` on older images; check the folder names under `/opt/pw-browsers`). Never run `playwright install`.
- **Keep command output small.** Pipe test, build and CI output through `| tail -n 40` (or list only failing test names); read the failing CI job's log, not the whole run. Agents return short findings, not command transcripts.

## Models and threads

In a Claude Code Project these are Project settings, which `new-app` asks the coordinator to set; the Project instructions (template: `app-studio/plugins/studio/templates/project-instructions.md`) repeat the thread rules for every thread.

- **Opus:** the Project coordinator, and reviews of risky diffs (AI prompts, storage, capabilities, auth).
- **Sonnet (medium effort):** feature, backlog, release and harness-sync threads.
- Raise effort or model only after a thread fails twice, never up front.
- **A thread stays inside its backlog item.** When the item is done or blocked it hands back (the PR description and a short message) and stops; it never proposes, plans or starts the next item or phase, even if offered. Only the coordinator picks the next item and starts its thread. If a thread catches itself about to go past its item, it stops and tells the coordinator.
<!-- studio:begin thread-reports (harness-owned: a sync replaces everything up to the end marker; keep app-specific rules outside it) -->
- **Point, don't repeat.** The App Creator reads and answers in threads. A thread puts everything the App Creator must act on in its own message: the result in plain English, the test steps, and any product decision about its own item (one question, with a recommended answer; a release question about its own item too). The coordinator then posts only "<what is needed> - open the thread", with the thread link. It does not restate the result, the test steps or PR numbers, and it adds no question of its own, even though a coordinator's habit is to relay results. With parallel threads it posts one such line per thread. A summary is for a matter that spans threads (ordering, the next item, one release covering several). The App Creator can ask a thread for a shorter recap.
<!-- studio:end thread-reports -->
- One thread per backlog item. A bug found in the Tester's testing gets a new thread that reads the backlog item and its PR. Don't reopen the old thread.
- **Never resume a thread that has been idle for over an hour.** Its cached context has expired, so the first step re-pays the whole context. Start a new thread that reads the backlog item and its PR instead; that's why every PR description ends with a hand-over (what changed, what's left, how to test).

## Writing for the App Creator

Plain English, no jargon. Lead with what changed for the user, then how to check it. Test scripts are numbered steps with an expected result each.

Before saying something is done, check it, and say plainly what you did not check (for example, "no code tests ran" or "not tried on a phone").
