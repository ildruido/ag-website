import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// The built site, in both languages, on a desktop and on a phone (see playwright.config.ts).
const pages = [
  { lang: "en", url: "/en/", heading: "Welcome" },
  { lang: "it", url: "/it/", heading: "Benvenuto" },
  { lang: "en", url: "/en/blog/", heading: "Blog" },
  { lang: "it", url: "/it/blog/", heading: "Blog" },
  { lang: "en", url: "/en/blog/hello/", heading: "Hello" },
  { lang: "it", url: "/it/blog/ciao/", heading: "Ciao" },
];

test("the bare address goes to the English home page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en\/$/);
});

for (const { lang, url, heading } of pages) {
  test.describe(url, () => {
    test("loads in the right language with its alternate", async ({ page }) => {
      await page.goto(url);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
      const other = lang === "en" ? "it" : "en";
      // The sample posts exist in one language only, so they declare no alternate.
      const expected = url.includes("/blog/") && url !== `/${lang}/blog/` ? 0 : 1;
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
  await expect(page.locator("link[rel=alternate]")).toHaveCount(0);
});
