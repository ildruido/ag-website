import type { APIRoute } from "astro";
import { buildLlms } from "../lib/discovery";
import { ui } from "../lib/i18n";
import { livePages, livePosts } from "../lib/site";

export const GET: APIRoute = async ({ site }) => {
  const posts = await livePosts();
  const postUrls = new Set(posts.map((p) => p.url));
  const pages = livePages(posts).filter((p) => !postUrls.has(p.url));
  const sections = (["en", "it"] as const).flatMap((lang) => [
    {
      heading: lang === "en" ? "Pages (English)" : "Pagine (Italiano)",
      entries: pages.filter((p) => p.lang === lang),
    },
    {
      heading: lang === "en" ? "Posts (English)" : "Articoli (Italiano)",
      entries: posts.filter((p) => p.lang === lang),
    },
  ]);
  const body = buildLlms({
    site: String(site),
    title: ui.en.siteTitle,
    summary: `${ui.en.intro} Bilingual (English and Italian) portfolio and blog. Posts are written by a human with AI assistance; see the About / Method page.`,
    sections,
  });
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
