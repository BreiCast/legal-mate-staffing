import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import { handleLead } from "../../src/lib/leads/handler";
import { MemoryLeadStore } from "../../src/lib/leads/store";
import { roles } from "../../src/content/roles";
import { practiceAreas } from "../../src/content/practice-areas";
import { resources } from "../../src/content/resources";

const paths = [
  "/",
  "/legal-staffing",
  "/about",
  "/process",
  "/contact",
  "/talent",
  "/request-candidates",
  "/confidentiality",
  "/privacy",
  "/terms",
  "/operations-staffing",
  "/resources",
  ...roles.map((r) => `/roles/${r.slug}`),
  ...practiceAreas.map((a) => `/practice-areas/${a.slug}`),
  ...resources.map((r) => `/resources/${r.slug}`),
];

test("all pages, metadata, internal links, and responsive widths", async ({
  page,
  request,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const destinations = new Set<string>();
  const titles = new Set<string>();
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("h1"), path).toHaveCount(1);
    const title = await page.title();
    expect(title).toContain("Legal Mate Staffing");
    expect(titles.has(title), `duplicate title ${path}`).toBe(false);
    titles.add(title);
    expect(
      await page.locator('meta[name="description"]').getAttribute("content"),
    ).toBeTruthy();
    expect(
      await page.locator('link[rel="canonical"]').getAttribute("href"),
    ).toBe(`http://localhost:3000${path === "/" ? "" : path}`);
    expect(
      await page.locator('meta[property="og:image"]').count(),
    ).toBeGreaterThan(0);
    expect(
      await page.locator('meta[name="twitter:card"]').getAttribute("content"),
    ).toBe("summary_large_image");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${path}`,
    ).toBe(true);
    expect(
      await page
        .locator('a[href="#"], a[href=""], a[href="mailto:"], a[href="tel:"]')
        .count(),
    ).toBe(0);
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")!)))
      destinations.add(href);
  }
  if (info.project.name === "desktop") {
    for (const href of destinations) {
      const response = await request.get(href);
      expect(response.status(), href).toBe(200);
    }
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    for (const path of paths)
      expect(xml).toContain(`http://localhost:3000${path}`);
    const robots = await request.get("/robots.txt");
    expect(await robots.text()).toContain("Disallow: /");
    for (const path of [
      "/icon.svg",
      "/favicon.ico",
      "/apple-icon.png",
      "/opengraph-image",
    ])
      expect((await request.get(path)).status()).toBe(200);
    expect((await request.get("/roles/not-a-role")).status()).toBe(404);
    expect((await request.get("/practice-areas/not-a-practice")).status()).toBe(
      404,
    );
    expect(
      (await request.get("/request-quote", { maxRedirects: 0 })).status(),
    ).toBe(308);
    expect((await request.get("/services", { maxRedirects: 0 })).status()).toBe(
      308,
    );
  }
  expect(errors).toEqual([]);
});

test("representative layouts meet automated accessibility checks", async ({
  page,
}, info) => {
  for (const path of [
    "/",
    "/request-candidates",
    "/roles/case-manager",
    "/practice-areas/personal-injury",
    "/contact",
  ]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      results.violations,
      `${info.project.name} ${path}: ${JSON.stringify(results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
    ).toEqual([]);
    if (path === "/" || path === "/request-candidates") {
      await mkdir(".verification/screenshots", { recursive: true });
      await page.screenshot({
        path: `.verification/screenshots/${info.project.name}-${path === "/" ? "home" : "form"}.png`,
        fullPage: true,
      });
    }
  }
});

test("navigation and candidate request prefill work with keyboard", async ({
  page,
}, info) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  if (info.project.name !== "desktop") {
    const toggle = page.locator("button[aria-controls=mobile-navigation]");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(axe.violations).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await page
      .getByRole("navigation", { name: "Mobile navigation", exact: true })
      .getByRole("link", { name: "How it works" })
      .click();
    await expect(page).toHaveURL(/\/process$/);
    await page.goto("/");
  }
  await page
    .getByRole("link", { name: "Request a profile like this" })
    .first()
    .click();
  await expect(page).toHaveURL(/request-candidates\?role=Case%20Manager/);
  await expect(page.getByLabel("What role do you need?")).toHaveValue(
    "Case Manager",
  );
  await page.goto("/practice-areas/immigration");
  await page.getByRole("link", { name: "Discuss your staffing needs" }).click();
  await page.getByText("Add a few details", { exact: false }).click();
  await expect(
    page.getByRole("combobox", { name: "Practice area", exact: true }),
  ).toHaveValue("Immigration");
});

async function fillForm(page: import("@playwright/test").Page) {
  await page.getByLabel("Your name").fill("Jane Example");
  await page.getByLabel("Work email").fill("jane@example.com");
  await page.getByLabel("Firm / company").fill("Example Firm");
  await page.getByLabel("What role do you need?").selectOption("Case Manager");
}

test("real unconfigured endpoint preserves details and never shows success", async ({
  page,
}) => {
  await page.goto("/request-candidates");
  await fillForm(page);
  await page
    .getByRole("button", { name: "Get my candidate shortlist" })
    .click();
  await expect(page.locator(".form-error[role=alert]")).toContainText(
    "Online requests are temporarily unavailable",
  );
  await expect(page.getByLabel("Work email")).toHaveValue("jane@example.com");
  await expect(
    page.getByRole("heading", { name: /Your next hire/ }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: /Email info@legalmatestaffing.com/ }),
  ).toBeVisible();
});

test("browser to real handler to controlled provider and back tracks one conversion", async ({
  page,
}) => {
  // Exercise the actual handler with an isolated store and fake email provider.
  // No message is sent to a real person by this test.
  const accepted: unknown[][] = [];
  const store = new MemoryLeadStore();
  let lead: Record<string, unknown> | undefined;
  await page.route("**/api/leads", async (route) => {
    const incoming = route.request();
    lead = incoming.postDataJSON();
    const response = await handleLead(
      new Request(incoming.url(), {
        method: "POST",
        headers: {
          "content-type": "application/json",
          origin: "http://127.0.0.1:3001",
        },
        body: incoming.postData(),
      }),
      {
        store,
        hashSecret: "test-only",
        email: {
          apiKey: "test-only",
          from: "test@example.com",
          to: "inbox@example.com",
        },
        fetcher: async (_url, init) => {
          accepted.push(JSON.parse(String(init?.body)));
          return Response.json({
            data: [{ id: "test-notification" }, { id: "test-confirmation" }],
          });
        },
        log: () => {},
      },
    );
    await route.fulfill({
      status: response.status,
      contentType: "application/json",
      body: await response.text(),
    });
  });
  await page.goto("/?utm_source=linkedin&utm_medium=social&utm_campaign=pi");
  await page.evaluate(() => {
    (window as unknown as { conversionEvents: unknown[] }).conversionEvents =
      [];
    window.addEventListener("legal-mate:analytics", (event) =>
      (
        window as unknown as { conversionEvents: unknown[] }
      ).conversionEvents.push((event as CustomEvent).detail),
    );
  });
  await page
    .getByRole("link", { name: "Get my candidate shortlist", exact: true })
    .first()
    .click();
  await fillForm(page);
  await page
    .getByRole("button", { name: "Get my candidate shortlist" })
    .click();
  await expect(
    page.getByRole("heading", { name: /Your next hire/ }),
  ).toBeVisible();
  expect(accepted).toHaveLength(1);
  expect(accepted[0]).toHaveLength(2);
  expect(lead?.attribution).toMatchObject({
    landingPage: "/",
    utm_source: "linkedin",
    utm_medium: "social",
    utm_campaign: "pi",
  });
  const events = await page.evaluate(
    () =>
      (window as unknown as { conversionEvents: { event: string }[] })
        .conversionEvents,
  );
  expect(events.filter((e) => e.event === "primary_cta_click")).toHaveLength(1);
  expect(events.filter((e) => e.event === "form_started")).toHaveLength(1);
  expect(events.filter((e) => e.event === "form_submitted")).toHaveLength(1);
  expect(JSON.stringify(events)).not.toContain("jane@example.com");
});
