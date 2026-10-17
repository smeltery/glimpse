import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("install journey, documentation, and accessible page families", async ({
  page,
  isMobile,
}) => {
  for (const route of ["/", "/docs/", "/docs/api/", "/brand/"]) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(audit.violations).toEqual([]);
  }
  await page.goto("/");
  await page.getByRole("link", { name: "Get started", exact: true }).click();
  await expect(page).toHaveURL(/\/docs\//);
  if (isMobile)
    await page.getByText("Documentation pages", { exact: true }).click();
  await page
    .getByRole("navigation", { name: "Documentation pages" })
    .getByRole("link", { name: "API overview" })
    .click();
  await expect(page.locator("h1")).toContainText("Perspective out.");
  await page
    .locator(".doc-content")
    .getByRole("link", { name: "Create a comment" })
    .click();
  await expect(page.locator("h1")).toHaveText("Review comments");
});

test("search, empty state, keyboard dismissal, and mobile menu", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const search = page.getByRole("button", {
    name: "Search documentation",
    exact: true,
  });
  await search.click();
  const dialog = page.getByRole("dialog", { name: "Find your next step." });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("searchbox").fill("zzzz-no-match");
  await expect(dialog.getByText("No matches this time.")).toBeVisible();
  await dialog.getByRole("button", { name: "Reset search" }).click();
  await expect(
    dialog.getByRole("link", { name: /Getting started/ }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(search).toBeFocused();
  if (isMobile) {
    const menu = page.getByRole("button", { name: "Menu", exact: true });
    await menu.click();
    await expect(
      page.getByRole("dialog", { name: "What’s next?" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await menu.click();
    await page
      .getByRole("dialog", { name: "What’s next?" })
      .getByRole("link", { name: "Use the local API" })
      .click();
    await expect(page).toHaveURL(/\/docs\/api\//);
  }
});

test("documentation diagrams, copy failure, assets, and missing routes", async ({
  page,
  request,
}) => {
  await page.goto("/docs/");
  await page.locator(".diagram").scrollIntoViewIfNeeded();
  await expect(page.locator(".diagram svg")).toBeVisible();
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("denied")) },
      configurable: true,
    }),
  );
  await page.getByRole("button", { name: "Copy code" }).first().click();
  await expect(page.getByText("Select code to copy")).toBeVisible();
  for (const asset of ["/logo.svg", "/og-image.png"])
    expect((await request.get(asset)).status()).toBe(200);
  expect((await request.get("/does-not-exist/")).status()).toBe(404);
});

test("all docs routes and internal links resolve", async ({
  page,
  request,
}) => {
  const routes = [
    "/",
    "/brand/",
    "/docs/",
    "/docs/cli/",
    "/docs/workflows/",
    "/docs/api/",
    "/docs/api/diff/",
    "/docs/api/comments/",
    "/docs/api/tree/",
    "/docs/api/github/",
    "/docs/development/",
  ];
  const checked = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((links) =>
        links.map((link) => link.getAttribute("href")!),
      )) {
      if (checked.has(href)) continue;
      checked.add(href);
      const response = await request.get(href.split("#")[0]);
      expect(response.ok(), href).toBe(true);
      const fragment = href.split("#")[1];
      if (fragment)
        expect(await response.text(), href).toContain(`id="${fragment}"`);
    }
  }
});
