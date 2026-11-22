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
    portfolio: "Portfolio",
    language: "Italiano",
    welcome: "Welcome",
    intro: "A static site: fast, free to host and easy to keep.",
    noPosts: "No posts yet.",
    noEntries: "No portfolio entries yet.",
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
    privacy: "Privacy",
    privacyIntro: "What this site does with your data: almost nothing.",
    privacyNoCookies: "No cookies, no tracking",
    privacyNoCookiesText:
      "This site sets no cookies, runs no analytics and shows no ads. It does not ask you to sign in or collect any personal data.",
    privacyHosting: "Hosting",
    privacyHostingText:
      "The site is served by Cloudflare Pages. Like any web host, it may keep standard server logs (such as your IP address) for security and reliability.",
    privacyContact: "If you write to me",
    privacyContactText:
      "If you email me, I use your address and message only to reply, and I do not share them.",
    privacySample:
      "Sample text: the owner replaces it with approved wording before anything goes live.",
    contact: "Contact",
    contactIntro: "The best way to reach me is by email.",
    contactEmail: "Email me",
    rss: "RSS feed",
    legal: "Legal",
    legalText: "Content is the author's. All rights reserved unless stated otherwise.",
    backPortfolio: "Back to the portfolio",
  },
  it: {
    siteTitle: "AG Website",
    skip: "Vai al contenuto",
    home: "Home",
    blog: "Blog",
    portfolio: "Portfolio",
    language: "English",
    welcome: "Benvenuto",
    intro: "Un sito statico: veloce, gratuito da ospitare e facile da mantenere.",
    noPosts: "Ancora nessun articolo.",
    noEntries: "Ancora nessun lavoro in portfolio.",
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
    privacy: "Privacy",
    privacyIntro: "Cosa fa questo sito con i tuoi dati: quasi nulla.",
    privacyNoCookies: "Nessun cookie, nessun tracciamento",
    privacyNoCookiesText:
      "Questo sito non imposta cookie, non usa analytics e non mostra pubblicità. Non chiede di accedere e non raccoglie dati personali.",
    privacyHosting: "Hosting",
    privacyHostingText:
      "Il sito è servito da Cloudflare Pages. Come ogni host web, può conservare i normali log del server (ad esempio il tuo indirizzo IP) per sicurezza e affidabilità.",
    privacyContact: "Se mi scrivi",
    privacyContactText:
      "Se mi scrivi via email, uso il tuo indirizzo e il tuo messaggio solo per risponderti e non li condivido.",
    privacySample:
      "Testo di esempio: il proprietario lo sostituisce con il testo approvato prima della pubblicazione.",
    contact: "Contatti",
    contactIntro: "Il modo migliore per raggiungermi è via email.",
    contactEmail: "Scrivimi",
    rss: "Feed RSS",
    legal: "Note legali",
    legalText:
      "I contenuti sono dell'autore. Tutti i diritti riservati, salvo diversa indicazione.",
    backPortfolio: "Torna al portfolio",
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

/** True when `id` (a "<language>/<slug>" id) has a counterpart with the same slug in the other language. */
export function hasCounterpart(id: string, ids: readonly string[]): boolean {
  const lang = postLang(id);
  return ids.some(
    (o) => postLang(o) !== lang && postLang(o) !== undefined && postSlug(o) === postSlug(id),
  );
}
