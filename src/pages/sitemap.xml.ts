import type { APIRoute } from "astro";
import { buildSitemap } from "../lib/discovery";
import { livePages, livePosts } from "../lib/site";

export const GET: APIRoute = async ({ site }) => {
  const pages = livePages(await livePosts());
  return new Response(buildSitemap(String(site), pages), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
