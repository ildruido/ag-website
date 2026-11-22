# OpenRouter Post-Publish GitHub Actions Workflow

## Setup Instructions
1. Save the YAML block below into your repository at `.github/workflows/post-publish-ai.yml` (or tell Claude Code: *"Extract the YAML from `post-publish-ai.md` into `.github/workflows/post-publish-ai.yml`"*).
2. In your GitHub repository, navigate to **Settings $\rightarrow$ Secrets and variables $\rightarrow$ Actions** and add a repository secret named `OPENROUTER_API_KEY`.
3. By default, the workflow uses OpenRouter's free auto-router (`openrouter/free`) at **$0 cost**. When you add your $19 prepaid credit later, update `OPENROUTER_MODEL` to `google/gemini-2.5-flash` or `anthropic/claude-haiku-4.5`.

---

## Workflow File (`.github/workflows/post-publish-ai.yml`)

```yaml
name: Post-Publish AI Distribution & Summary

on:
  push:
    branches:
      - main
    paths:
      - 'src/content/writing/*.mdx'

permissions:
  contents: read
  issues: write # Posts generated social drafts as a GitHub Issue for easy mobile copy-paste

jobs:
  generate-distribution-assets:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - name: Detect newly added or modified MDX article
        id: changed_files
        run: |
          CHANGED_FILE=$(git diff --name-only --diff-filter=AM HEAD~1 HEAD -- 'src/content/writing/*.mdx' | head -n 1)
          echo "file=$CHANGED_FILE" >> $GITHUB_OUTPUT

      - name: Generate LinkedIn & X Threads via OpenRouter
        if: steps.changed_files.outputs.file != ''
        env:
          OPENROUTER_API_KEY: ${{ secrets.OPENROUTER_API_KEY }}
          # Default: Free tier auto-router ($0 cost).
          # Optional upgrade (with $19 prepaid credit): change to 'google/gemini-2.5-flash' or 'anthropic/claude-haiku-4.5'
          OPENROUTER_MODEL: 'openrouter/free'
          ARTICLE_PATH: ${{ steps.changed_files.outputs.file }}
        run: |
          node -e '
            const fs = require("fs");
            const content = fs.readFileSync(process.env.ARTICLE_PATH, "utf8");

            // Skip drafts
            if (/draft:\s*true/i.test(content)) {
              console.log("Article is marked as draft. Skipping AI distribution generation.");
              process.exit(0);
            }

            async function run() {
              const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                  "Content-Type": "application/json",
                  "HTTP-Referer": "https://github.com/${{ github.repository }}",
                  "X-Title": "Personal Publishing OS"
                },
                body: JSON.stringify({
                  model: process.env.OPENROUTER_MODEL,
                  messages: [
                    {
                      role: "system",
                      content: "You are an executive communications strategist. Given an MDX blog post or paper, generate: (1) A crisp, insightful LinkedIn post with a strong hook and 3 key takeaways, and (2) A 4-post X/Twitter thread. Output clean Markdown."
                    },
                    {
                      role: "user",
                      content: `Generate distribution assets for this newly published piece:\n\n${content}`
                    }
                  ]
                })
              });

              const data = await response.json();
              if (!response.ok) {
                console.error("OpenRouter API Error:", data);
                process.exit(1);
              }

              const output = data.choices[0].message.content;
              fs.writeFileSync("social-drafts.md", output);
              console.log("Successfully generated social-drafts.md");
            }
            run();
          '

      - name: Create GitHub Issue with Ready-to-Post Copy
        if: steps.changed_files.outputs.file != '' && hashFiles('social-drafts.md') != ''
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const body = fs.readFileSync('social-drafts.md', 'utf8');
            const file = '${{ steps.changed_files.outputs.file }}';
            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `📣 Social Distribution Copy: ${file}`,
              body: `Here are your AI-generated LinkedIn and X drafts for **\`${file}\`**:\n\n---\n\n${body}`
            });
```