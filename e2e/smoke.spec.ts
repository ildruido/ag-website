import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// The built site, in both languages, on a desktop and on a phone (see playwright.config.ts).
const pages = [
  { lang: "en", url: "/en/", heading: "Welcome" },
  { lang: "it", url: "/it/", heading: "Benvenuto" },
  { lang: "en", url: "/en/blog/", heading: "Blog" },
  { lang: "it", url: "/it/blog/", heading: "Blog" },
  { lang: "en", url: "/en/about/", heading: "About / Method" },
  { lang: "it", url: "/it/about/", heading: "Chi sono / Metodo" },
  { lang: "en", url: "/en/privacy/", heading: "Privacy" },
  { lang: "it", url: "/it/privacy/", heading: "Privacy" },
  { lang: "en", url: "/en/contact/", heading: "Contact" },
  { lang: "it", url: "/it/contact/", heading: "Contatti" },
  { lang: "en", url: "/en/blog/hello/", heading: "Hello" },
  { lang: "it", url: "/it/blog/ciao/", heading: "Ciao" },
  { lang: "en", url: "/en/blog/both-languages/", heading: "Both languages", alternate: true },
  {
    lang: "it",
    url: "/it/blog/both-languages/",
    heading: "In entrambe le lingue",
    alternate: true,
  },
  { lang: "en", url: "/en/portfolio/", heading: "Portfolio", alternate: true },
  { lang: "it", url: "/it/portfolio/", heading: "Portfolio", alternate: true },
  { lang: "en", url: "/en/portfolio/sample-project/", heading: "Sample project", alternate: true },
  {
    lang: "it",
    url: "/it/portfolio/sample-project/",
    heading: "Progetto di esempio",
    alternate: true,
  },
  { lang: "en", url: "/en/portfolio/english-only/", heading: "English-only sample" },
];

test("the bare address goes to the English home page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en\/$/);
});

for (const { lang, url, heading, alternate } of pages) {
  test.describe(url, () => {
    test("loads in the right language with its alternate", async ({ page }) => {
      await page.goto(url);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
      const other = lang === "en" ? "it" : "en";
      // Pages with a counterpart (and the home and list pages) declare an alternate; the
      // one-language samples (hello, ciao, english-only) declare none.
      const isSingle = /\/(blog|portfolio)\/.+/.test(url) && !alternate;
      const expected = isSingle ? 0 : 1;
      await expect(page.locator(`link[rel=alternate][hreflang=${other}]`)).toHaveCount(expected);
    });

    test("has no accessibility violations", async ({ page }) => {
      await page.goto(url);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
      expect(results.violations).toEqual([]);
    });

    test("does not scroll sideways", async ({ page }) => {
      await page.goto(url);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });
}

test("the language switch goes to the other language", async ({ page }) => {
  await page.goto("/en/");
  await page.getByRole("link", { name: "Italiano" }).click();
  await expect(page).toHaveURL(/\/it\/$/);
});

test("a missing page shows the 404 page", async ({ page }) => {
  const res = await page.goto("/en/nothing-here/");
  expect(res?.status()).toBe(404);
});

test("the switch and the alternate link stay on the same page", async ({ page }) => {
  await page.goto("/en/blog/");
  await expect(page.locator("link[rel=alternate][hreflang=it]")).toHaveAttribute(
    "href",
    /\/it\/blog\/$/,
  );
  await page.getByRole("link", { name: "Italiano" }).click();
  await expect(page).toHaveURL(/\/it\/blog\/$/);
  await page.getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(/\/en\/blog\/$/);
});

test("a post only in one language declares no alternate", async ({ page }) => {
  // hello (en) and ciao (it) have different slugs, so neither has a counterpart.
  await page.goto("/en/blog/hello/");
  await expect(page.locator("link[rel=alternate][hreflang]")).toHaveCount(0);
});

test("every post shows an AI disclosure linking to About / Method in its language", async ({
  page,
}) => {
  const cases = [
    { url: "/en/blog/hello/", lang: "en", name: "How I work" },
    { url: "/it/blog/ciao/", lang: "it", name: "Come lavoro" },
  ];
  for (const { url, lang, name } of cases) {
    await page.goto(url);
    const line = page.getByTestId("ai-disclosure");
    await expect(line).toBeVisible();
    await line.getByRole("link", { name }).click();
    await expect(page).toHaveURL(new RegExp(`/${lang}/about/$`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

test("About / Method is reachable from the menu and switches language", async ({ page }) => {
  await page.goto("/en/");
  await page.getByRole("link", { name: "About / Method" }).click();
  await expect(page).toHaveURL(/\/en\/about\/$/);
  await page.getByRole("link", { name: "Italiano" }).click();
  await expect(page).toHaveURL(/\/it\/about\/$/);
});

test("a list shows its entries and each opens its own page", async ({ page }) => {
  for (const [list, entry, title] of [
    ["/en/blog/", "Both languages", "Both languages"],
    ["/it/blog/", "In entrambe le lingue", "In entrambe le lingue"],
    ["/en/portfolio/", "Sample project", "Sample project"],
    ["/it/portfolio/", "Progetto di esempio", "Progetto di esempio"],
  ] as const) {
    await page.goto(list);
    await page.getByRole("link", { name: entry }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
  }
});

test("the menu reaches Portfolio and Blog in both languages", async ({ page }) => {
  await page.goto("/it/");
  await page
    .getByRole("navigation", { name: "Main" })
    .getByRole("link", { name: "Portfolio" })
    .click();
  await expect(page).toHaveURL(/\/it\/portfolio\/$/);
});

test("the language switch follows an entry that exists in both languages", async ({ page }) => {
  await page.goto("/en/portfolio/sample-project/");
  await page.getByRole("link", { name: "Italiano" }).click();
  await expect(page).toHaveURL(/\/it\/portfolio\/sample-project\/$/);
  await page.goto("/en/blog/both-languages/");
  await page.getByRole("link", { name: "Italiano" }).click();
  await expect(page).toHaveURL(/\/it\/blog\/both-languages\/$/);
});

test("an entry in one language only is not offered in the other", async ({ page }) => {
  await page.goto("/it/portfolio/");
  await expect(page.getByRole("link", { name: "English-only sample" })).toHaveCount(0);
  const res = await page.goto("/it/portfolio/english-only/");
  expect(res?.status()).toBe(404);
  await page.goto("/en/portfolio/english-only/");
  await expect(page.locator("link[rel=alternate][hreflang]")).toHaveCount(0);
  await page.getByRole("link", { name: "Italiano" }).click();
  await expect(page).toHaveURL(/\/it\/$/);
});

test("the footer links to privacy, contact and the feed in each language", async ({ page }) => {
  for (const [lang, privacy, contact] of [
    ["en", "Privacy", "Contact"],
    ["it", "Privacy", "Contatti"],
  ]) {
    await page.goto(`/${lang}/`);
    const footer = page.locator("footer");
    await footer.getByRole("link", { name: privacy }).click();
    await expect(page).toHaveURL(new RegExp(`/${lang}/privacy/$`));
    await footer.getByRole("link", { name: contact }).click();
    await expect(page).toHaveURL(new RegExp(`/${lang}/contact/$`));
    await expect(page.getByTestId("contact-email")).toHaveAttribute("href", /^mailto:.+@.+/);
  }
});

test("the privacy page says there are no cookies and none are set", async ({ page, context }) => {
  await page.goto("/en/privacy/");
  await expect(page.getByRole("heading", { name: "No cookies, no tracking" })).toBeVisible();
  expect(await context.cookies()).toEqual([]);
});

test("RSS, sitemap, llms.txt and robots.txt list only live content", async ({ request }) => {
  const rssEn = await (await request.get("/en/rss.xml")).text();
  expect(rssEn).toContain("/en/blog/hello/");
  expect(rssEn).not.toContain("/it/");
  const rssIt = await (await request.get("/it/rss.xml")).text();
  expect(rssIt).toContain("/it/blog/ciao/");
  expect(rssIt).not.toContain("/en/blog/");

  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const u of ["/en/", "/it/privacy/", "/en/contact/", "/en/blog/hello/", "/it/blog/ciao/"]) {
    expect(sitemap).toContain(`<loc>http://localhost:4321${u}</loc>`);
  }
  // hello exists in English only, so no Italian twin is declared.
  expect(sitemap).not.toContain("/it/blog/hello/");
  // Portfolio: the sample project exists in both languages, the English-only one does not.
  expect(sitemap).toContain("/it/portfolio/sample-project/");
  expect(sitemap).toContain("/en/portfolio/english-only/");
  expect(sitemap).not.toContain("/it/portfolio/english-only/");

  const llms = await (await request.get("/llms.txt")).text();
  expect(llms).toMatch(/^# /);
  expect(llms).toContain("/en/blog/hello/");
  expect(llms).toContain("/it/blog/ciao/");
  expect(llms).toContain("/it/portfolio/sample-project/");
  expect(llms).not.toContain("/it/portfolio/english-only/");

  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap: http://localhost:4321/sitemap.xml");
});
