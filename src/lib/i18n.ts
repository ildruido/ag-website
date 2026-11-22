// Languages and the words the site itself uses (posts bring their own text).
export const languages = ["en", "it"] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = "en";

export const ui = {
  en: {
    siteTitle: "AG Website",
    skip: "Skip to content",
    home: "Home",
    blog: "Blog",
    language: "Italiano",
    welcome: "Welcome",
    intro: "A static site: fast, free to host and easy to keep.",
    noPosts: "No posts yet.",
    notFound: "This page does not exist.",
    back: "Back to the blog",
    about: "About / Method",
    aboutIntro: "How the content on this site is made.",
    aboutSample:
      "Sample text: the owner replaces it with approved wording before anything goes live.",
    aboutHuman: "What I do",
    aboutHumanText:
      "I choose the topics, set the direction, check every claim and approve every post before it is published.",
    aboutAi: "What AI does",
    aboutAiText:
      "AI helps me research, draft and translate. It never publishes anything on its own.",
    aboutApproval: "Nothing goes live without my approval",
    aboutApprovalText:
      "Every page and post is reviewed and approved by me first. The site publishes only what I have approved.",
    disclosure: "Written by a human with AI assistance.",
    disclosureLink: "How I work",
  },
  it: {
    siteTitle: "AG Website",
    skip: "Vai al contenuto",
    home: "Home",
    blog: "Blog",
    language: "English",
    welcome: "Benvenuto",
    intro: "Un sito statico: veloce, gratuito da ospitare e facile da mantenere.",
    noPosts: "Ancora nessun articolo.",
    notFound: "Questa pagina non esiste.",
    back: "Torna al blog",
    about: "Chi sono / Metodo",
    aboutIntro: "Come nascono i contenuti di questo sito.",
    aboutSample:
      "Testo di esempio: il proprietario lo sostituisce con il testo approvato prima della pubblicazione.",
    aboutHuman: "Cosa faccio io",
    aboutHumanText:
      "Scelgo gli argomenti, decido la direzione, verifico ogni affermazione e approvo ogni articolo prima della pubblicazione.",
    aboutAi: "Cosa fa l'AI",
    aboutAiText:
      "L'AI mi aiuta a fare ricerca, scrivere bozze e tradurre. Non pubblica mai nulla da sola.",
    aboutApproval: "Nulla va online senza la mia approvazione",
    aboutApprovalText:
      "Ogni pagina e articolo è rivisto e approvato da me. Il sito pubblica solo ciò che ho approvato.",
    disclosure: "Scritto da una persona con l'aiuto dell'AI.",
    disclosureLink: "Come lavoro",
  },
} satisfies Record<Lang, Record<string, string>>;

export function isLang(value: string | undefined): value is Lang {
  return (languages as readonly string[]).includes(value ?? "");
}

export function otherLang(lang: Lang): Lang {
  return lang === "en" ? "it" : "en";
}

/** The site-relative address of a page in a language, with the trailing slash the site uses. */
export function path(lang: Lang, rest = ""): string {
  return `/${lang}/${rest.replace(/^\/+/, "")}`.replace(/\/*$/, "/");
}

/** The language a post belongs to: its folder name ("en/hello" is English). */
export function postLang(id: string): Lang | undefined {
  const first = id.split("/")[0];
  return isLang(first) ? first : undefined;
}

/** The part of a post's id after its language folder ("en/hello" gives "hello"). */
export function postSlug(id: string): string {
  return id.split("/").slice(1).join("/");
}
