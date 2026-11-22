import type { APIRoute } from "astro";
import { buildSitemap } from "../lib/discovery";
import { livePages, livePortfolio, livePosts } from "../lib/site";

export const GET: APIRoute = async ({ site }) => {
  const pages = livePages([...(await livePosts()), ...(await livePortfolio())]);
  return new Response(buildSitemap(String(site), pages), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
