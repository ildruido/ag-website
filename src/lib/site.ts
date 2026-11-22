// Everything the machine-readable files and the footer need to know about live pages.
import { getCollection } from "astro:content";
import {
  hasCounterpart,
  languages,
  otherLang,
  path,
  postLang,
  postSlug,
  ui,
  type Lang,
} from "./i18n";
import type { Entry } from "./discovery";

/** The fixed pages every language has. */
export const staticPages = ["", "blog/", "portfolio/", "about/", "privacy/", "contact/"] as const;

export async function livePosts(): Promise<Entry[]> {
  const posts = await getCollection("posts", (p) => !p.data.draft && postLang(p.id) !== undefined);
  return posts.map((p) => {
    const lang = postLang(p.id)!;
    const slug = postSlug(p.id);
    const hasOther = posts.some((q) => postLang(q.id) !== lang && postSlug(q.id) === slug);
    return {
      lang,
      url: path(lang, `blog/${slug}/`),
      title: p.data.title,
      date: p.data.date,
      description: p.data.description,
      alternate: hasOther ? path(otherLang(lang), `blog/${slug}/`) : undefined,
    };
  });
}

export async function livePortfolio(): Promise<Entry[]> {
  const items = await getCollection(
    "portfolio",
    (p) => !p.data.draft && postLang(p.id) !== undefined,
  );
  return items.map((p) => {
    const lang = postLang(p.id)!;
    const slug = postSlug(p.id);
    return {
      lang,
      url: path(lang, `portfolio/${slug}/`),
      title: p.data.title,
      date: p.data.date,
      description: p.data.summary,
      alternate: hasCounterpart(
        p.id,
        items.map((q) => q.id),
      )
        ? path(otherLang(lang), `portfolio/${slug}/`)
        : undefined,
    };
  });
}

export function livePages(posts: Entry[]) {
  const fixed = languages.flatMap((lang) =>
    staticPages.map((rest) => ({
      lang,
      url: path(lang, rest),
      alternate: path(otherLang(lang), rest),
      title: rest === "" ? ui[lang].siteTitle : titleOf(lang, rest),
    })),
  );
  return [...fixed, ...posts];
}

function titleOf(lang: Lang, rest: string) {
  const t = ui[lang];
  const map: Record<string, string> = {
    "blog/": t.blog,
    "portfolio/": t.portfolio,
    "about/": t.about,
    "privacy/": t.privacy,
    "contact/": t.contact,
  };
  return map[rest] ?? rest;
}

/** The public contact address. Set PUBLIC_CONTACT_EMAIL at build time; the default is a sample. */
export const contactEmail = process.env.PUBLIC_CONTACT_EMAIL ?? "contact@example.com";
