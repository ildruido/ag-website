import type { APIRoute } from "astro";
import { languages, ui, type Lang } from "../../lib/i18n";
import { buildRss } from "../../lib/discovery";
import { livePosts } from "../../lib/site";

export function getStaticPaths() {
  return languages.map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = async ({ params, site }) => {
  const lang = params.lang as Lang;
  const posts = (await livePosts()).filter((p) => p.lang === lang);
  const body = buildRss({
    site: String(site),
    lang,
    title: `${ui[lang].siteTitle} | ${ui[lang].blog}`,
    description: ui[lang].intro,
    posts,
  });
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
