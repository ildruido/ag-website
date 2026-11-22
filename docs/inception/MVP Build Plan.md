# MVP Build Plan (v2)

**Status:** APPROVED by the user, 2026-11-22. Written 2026-11-22 against **User Confirmed Intent** and **Report and Recommendations** (3.8–3.10, section 4). Harness facts are checked against app-studio's latest version on GitHub (0.28.1, 2026-11-18). v2 replaces v1 after a deeper review of the app-studio gap and the merge/approval issue.

---

## 1. The problem v2 solves

- **Your Merge is the approval for content** (3.9). App-studio's threads **merge their own code PRs** once checks pass, and they act with **your GitHub identity**, so GitHub cannot tell "you pressed Merge" from "Claude merged".
- In **one repo**, code and content share the same merge rights. A rule and a hook can *ask* Claude not to merge content, but **nothing in GitHub stops it**. GitHub's path-based push rules, which could restrict content folders, appear to need a paid Team plan *(verify)*.
- **Conclusion:** approval should be enforced by **structure**, not by a promise. That means separating code from content.

## 2. Architecture: two repos, two Projects

| | **Site** (build & maintain) | **Publishing** (business as usual) |
|---|---|---|
| Repo | `site` (private, working name): code, design, templates, content schema, publishing tools, CI, deploy, sample content for tests | `content` (private, working name): everything published (posts EN/IT, portfolio, About/Method, legal text), briefs, source snapshots, LinkedIn texts, decision log |
| Claude Code Project | **Site** Project, using **app-studio**, with `app-studio` and `site` attached | **Publishing** Project with only `content` attached; a light editorial setup (its own `CLAUDE.md` and workflow skills), not app-studio |
| Who merges | Claude, automatically when checks pass (normal app-studio) | **Only you.** Your Merge publishes |
| Rhythm | Project-like: backlog, milestones, releases | Continuous: one thread per post |
| You use it for | Testing site changes, asking for features or fixes | The whole content workflow, from idea to approval (your single interface for publishing) |

**How go-live works**
- A content PR is opened by a Publishing thread. Automatic checks run:
  - blocking checks (quotes, secrets, build, language option);
  - style warnings;
  - the Gemini second opinion, posted as a comment;
  - a preview of the whole site with that content.
- **You press Merge.** Automation then builds the site with the new content, deploys it, confirms it is live, posts the EN and IT LinkedIn texts, and notifies you.
- When the Site Project merges a code change, the site is rebuilt with the current approved content.

**How "only you can merge" is enforced, strongest first**
1. **Repo rules on `content`:** a rule that only the owner (admin) can update the live branch, plus a separate rule requiring the blocking checks *for everyone, you included*. If Claude's cloud threads use the Claude GitHub App rather than your personal token, GitHub *can* tell you apart, and Claude's merge is refused. This is **not verified**, so a deterministic test in step 4 tries a Claude merge and expects a refusal.
2. **If the test fails** (Claude acts as you), a product choice for you:
   - (a) a free, separate GitHub account for Claude with write-but-not-merge rights. This is true enforcement, and creating it is your action;
   - (b) accept a Claude rule + a merge-blocking hook + an audit notification on every publish.
3. **Always:** auto-merge is off on `content`, and the Site Project never has `content` attached, so a build thread cannot reach it at all. Publishing happens only in the cloud Project, never from a local session (local sessions use your personal token).

## 3. Why this is better (and what it costs)

| Benefit | Detail |
|---|---|
| Approval is structural | Every merge in `content` is a publish by you, and the audit is trivial |
| App-studio fits cleanly | `site` is a normal app; its auto-merge stays exactly as designed |
| Single interface for publishing | The Publishing Project is the one place you use for content; building the site is a different job with its own place |
| Lighter token use | Publishing threads don't load the app-building harness, and deterministic checks run in CI, not in Claude (Intent §15) |
| Content survives tech changes | Plain files, independent of the site framework |
| Clean boundary | Publishing threads only edit content; a site change requested there becomes an issue for the Site Project |

**Costs:**
- A second repo and Project, about 10 more minutes of your setup.
- One cross-repo access key (a read-only deploy key or token *(verify which)*, as exact clicks).
- Deploys run from GitHub Actions rather than Cloudflare's own Git connection.
- Each check takes a CI round-trip (1–2 minutes) within the 3,000 free minutes.

**Considered and rejected**
- **One repo with a guard hook:** not enforceable (section 1).
- **Content in Notion, Google Docs or a hosted CMS:** an "approved" status there is just a field Claude can also edit, and you lose free checks, previews, diffs and history. It adds a vendor and possible cost.
- **A Git-based editor such as Decap CMS on top of `content`:** kept as a **later option** for the custom review page's edit box (3.9 design 2), since it is free and works on the same repo *(verify)*.
- **No app-studio:** loses a proven process you already know (PRD, backlog, QA/reviewer agents, test scripts). With the split, the only gap left is the stack pack.

## 4. Harness ideas for app-studio (for you to approve)

| ID | Idea | Why |
|---|---|---|
| HI-1 | **`static-site` stack pack:** Astro, Cloudflare static hosting deployed from GitHub Actions, a preview per PR, `CI gate` and `health` compatible, with an option for content coming from a separate repo and sample content for tests. Includes updating the "Known limits" in app-studio's README and `packs/README.md`, which today say a website means paid Render hosting | The site is a free static site; the current packs are a Vite artifact or a paid Render server. Built and smoke-tested in app-studio **before** the site bootstrap, so the site starts with `pack add static-site` and needs no workaround |
| HI-2 | **Owner-merged repos:** an App profile field listing repos Claude must never merge in; the existing merge-gate hook refuses them | Defence in depth if someone ever attaches `content` to a build Project |

## 5. Steps

Each milestone ends with a test script and your OK.

**Step 0. Close inception (this session).** You OK this plan. I create the private `site` repo and push this folder into `docs/inception/` (the confirmed intent and report are the inputs, the Gemini drafts are history). I file HI-1 and HI-2 as GitHub issues in app-studio.

**Step 1. App-studio change (app-studio Project).** Build HI-1 and HI-2 per app-studio governance; you approve.

**Step 2. Site bootstrap (new Site Project, `new-app` thread).** Core harness plus `static-site` pack. The App profile, domain rules and the PRD/backlog are produced from `docs/inception/`.

**Step 3. Site foundation.** Bilingual Astro site, mobile-first and accessible, on Cloudflare's free address. Previews, legal pages, contact route, RSS, sitemap and `llms.txt`, using sample content.

**Step 4. Content repo and publishing pipeline (Site Project builds it).**
- Create `content` and its repo rules, then run the **"Claude cannot merge" test** (section 2).
- Build cross-repo preview and deploy, the blocking and warning checks, the go-live chain and the approval record.
- **Private previews (decided 2026-11-22):** previews of `content` PRs sit behind Cloudflare Access (free; the owner signs in with an email code) **before the first real content PR**. A **blocking check** opens the preview while signed out and expects the login page; a publicly readable preview stops the post. Site-code previews (sample content only) may stay public. Why: the static-site pack's previews are public by default (app-studio #183), and a public draft, above all an unchecked portfolio entry, would be early publishing.
- **The first real use:** portfolio entries (with the confidentiality checklist), the About/Method page and the disclosure line go live through your Merge.

**Step 5. Workflow design, then tools.** A design conversation with you covering stages, brief template, categories, and which steps are deterministic or AI-assisted. Then:
- the Publishing Project's skills and `CLAUDE.md` (in `content`);
- the deterministic tools (in `site`, run by CI on `content`);
- the Gemini second-opinion check.

**Step 6. LinkedIn auto-post.** Runs after the live check, with an alert before the access token expires.

**Step 7. First post end to end = MVP done.** Done in the Publishing Project, and includes the research test. The domain is connected before this step.

## 6. What you will have to do (all of it)

| When | What | Time |
|---|---|---|
| Step 0 | OK this plan; OK me creating the repo and filing HI-1 and HI-2 | 5 min |
| Step 1 | Approve the app-studio changes in its Project | 10 min |
| Step 2 | Create the **Site** Project (attach `app-studio` + `site`, select the "app-studio apps" environment), paste the kickoff message I give you, do the repo-settings clicks | 15 min |
| Step 3 | Create a free Cloudflare account; create the deploy token and add it as a GitHub secret (exact clicks) | 15 min |
| Step 4 | Create the `content` repo rules and the cross-repo key (exact clicks); create the **Publishing** Project; if the merge test fails, choose (a) or (b) | 20 min |
| Step 4 | Upload your CV, product notes and 2–3 writing samples; approve portfolio, Method page and disclosure text; press Merge | 1 session |
| Step 5 | Workflow design conversation; create a Gemini API key and add it as a secret (exact clicks, never in chat) | 1 session |
| Step 6 | Create a LinkedIn developer app and authorise it once. It may require a LinkedIn Page *(verify)* | 10 min |
| Before step 7 | Choose the site name; buy the domain (~£10/yr, your payment) | 15 min |
| Each milestone | Follow the test script; say OK or what's wrong | 10–20 min |
| Step 7 | First post in the Publishing Project; press Merge | 1 session |

## 7. Risks and checks
- **Claude merge test (step 4)** decides whether enforcement is structural or needs your choice.
- **Claude Pro usage** across two Projects: app-studio defaults kept (Sonnet threads, Opus coordinator); usage checked after step 3.
- **Web research in cloud threads** must work *(verify in step 5)*.
- **Cross-repo access** from `content` CI to the private `site` repo *(verify the simplest key type, and whether it expires)*.
- All *(verify)* items in Report section 4.
