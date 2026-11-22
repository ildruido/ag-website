// Plain builders for the machine-readable files (RSS, sitemap, llms.txt). No DOM, no Astro:
// the pages feed them the live content, so drafts and missing translations never appear here.
import { languages, type Lang } from "./i18n";

export interface Entry {
  lang: Lang;
  /** Site-relative address with trailing slash, e.g. /en/blog/hello/ */
  url: string;
  title: string;
  date: Date;
  description?: string;
  /** The same page in the other language, only if it exists. */
  alternate?: string;
}

export function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const abs = (site: string, url: string) => new URL(url, site).href;

export function buildRss(opts: {
  site: string;
  lang: Lang;
  title: string;
  description: string;
  posts: Entry[];
}): string {
  const items = [...opts.posts]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map(
      (p) =>
        `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${abs(opts.site, p.url)}</link>
      <guid isPermaLink="true">${abs(opts.site, p.url)}</guid>
      <pubDate>${p.date.toUTCString()}</pubDate>${
        p.description ? `\n      <description>${escapeXml(p.description)}</description>` : ""
      }
    </item>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(opts.title)}</title>
    <link>${abs(opts.site, `/${opts.lang}/`)}</link>
    <description>${escapeXml(opts.description)}</description>
    <language>${opts.lang}</language>
${items}
  </channel>
</rss>
`;
}

export function buildSitemap(site: string, pages: Pick<Entry, "url" | "alternate" | "lang">[]) {
  const urls = pages
    .map((p) => {
      const links = p.alternate
        ? [p.lang, languages.find((l) => l !== p.lang)!]
            .map((l) => {
              const href = l === p.lang ? p.url : p.alternate!;
              return `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(site, href)}"/>`;
            })
            .join("\n")
        : "";
      return `  <url>
    <loc>${abs(site, p.url)}</loc>${links ? `\n${links}` : ""}
  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

export function buildLlms(opts: {
  site: string;
  title: string;
  summary: string;
  sections: { heading: string; entries: { title: string; url: string; description?: string }[] }[];
}): string {
  const body = opts.sections
    .filter((s) => s.entries.length > 0)
    .map(
      (s) =>
        `## ${s.heading}\n\n` +
        s.entries
          .map(
            (e) =>
              `- [${e.title}](${abs(opts.site, e.url)})${e.description ? `: ${e.description}` : ""}`,
          )
          .join("\n"),
    )
    .join("\n\n");
  return `# ${opts.title}\n\n> ${opts.summary}\n\n${body}\n`;
}
