import { describe, expect, it } from "vitest";
import { buildLlms, buildRss, buildSitemap, escapeXml } from "../../src/lib/discovery";

const site = "https://example.org";
const post = {
  lang: "en" as const,
  url: "/en/blog/a/",
  title: "Fish & <chips>",
  date: new Date("2026-01-15"),
  description: 'Tom\'s "post"',
};

describe("discovery files", () => {
  it("escapes XML special characters", () => {
    expect(escapeXml(`<a href="x">&'`)).toBe("&lt;a href=&quot;x&quot;&gt;&amp;&apos;");
  });

  it("RSS lists only the posts given, newest first, with absolute links", () => {
    const older = { ...post, url: "/en/blog/b/", title: "Older", date: new Date("2025-01-01") };
    const xml = buildRss({ site, lang: "en", title: "T", description: "D", posts: [older, post] });
    expect(xml.indexOf("Fish &amp; &lt;chips&gt;")).toBeLessThan(xml.indexOf("Older"));
    expect(xml).toContain("<link>https://example.org/en/blog/a/</link>");
    expect(xml).toContain("<language>en</language>");
    expect(xml).not.toContain("<chips>");
  });

  it("sitemap links the other language only when it exists", () => {
    const xml = buildSitemap(site, [
      { lang: "en", url: "/en/blog/a/" },
      { lang: "en", url: "/en/about/", alternate: "/it/about/" },
    ]);
    expect(xml).toContain("<loc>https://example.org/en/blog/a/</loc>");
    expect(xml.match(/hreflang="it" href="https:\/\/example.org\/it\/about\/"/g)).toHaveLength(1);
    expect(xml).not.toContain("/it/blog/a/");
  });

  it("llms.txt lists entries and skips empty sections", () => {
    const text = buildLlms({
      site,
      title: "Site",
      summary: "About it",
      sections: [
        { heading: "Posts", entries: [{ title: "A", url: "/en/blog/a/", description: "d" }] },
        { heading: "Empty", entries: [] },
      ],
    });
    expect(text).toContain("# Site");
    expect(text).toContain("- [A](https://example.org/en/blog/a/): d");
    expect(text).not.toContain("Empty");
  });
});
