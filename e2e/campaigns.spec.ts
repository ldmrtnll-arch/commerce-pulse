import { expect, test } from "@playwright/test";

test("opens Campaigns from navigation and shows the global portfolio", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  await page.goto("/");
  await page.getByRole("link", { name: "Campaigns", exact: true }).click();
  await expect(page).toHaveURL(/\/campaigns$/);
  await expect(page.getByRole("heading", { name: "Campaigns", exact: true })).toBeVisible();
  await expect(page.getByRole("table", { name: "Marketing campaigns" })).toBeVisible();
  await expect(page.getByText("Active campaigns")).toBeVisible();
  expect(consoleErrors).toEqual([]);
});

test("debounces campaign search into the URL", async ({ page }) => {
  await page.goto("/campaigns");
  await expect(page.getByRole("table", { name: "Marketing campaigns" })).toBeVisible();
  await page.getByRole("searchbox", { name: "Search campaigns" }).fill("Brand Defense");
  await expect(page).toHaveURL(/search=Brand(?:\+|%20)Defense/);
  await expect(page.getByRole("link", { name: "Search Brand Defense", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Search Brand Defense September", exact: true })).toBeVisible();
});

test("filters every visible campaign by Active status", async ({ page }) => {
  await page.goto("/campaigns");
  await page.getByLabel("Status").selectOption("active");
  await expect(page).toHaveURL(/status=active/);
  const rows = page.getByRole("table", { name: "Marketing campaigns" }).locator("tbody tr");
  await expect(rows).toHaveCount(7);
  for (let index = 0; index < await rows.count(); index += 1) await expect(rows.nth(index)).toContainText("Active");
});

test("filters campaign cards by Social channel", async ({ page }) => {
  await page.goto("/campaigns");
  await page.getByLabel("Channel").selectOption("social");
  await expect(page).toHaveURL(/channel=social/);
  const rows = page.getByRole("table", { name: "Marketing campaigns" }).locator("tbody tr");
  await expect(rows).toHaveCount(8);
  for (let index = 0; index < await rows.count(); index += 1) await expect(rows.nth(index)).toContainText("Social");
});

test("sorts campaigns by highest ROAS", async ({ page }) => {
  await page.goto("/campaigns");
  const firstRow = page.getByRole("table", { name: "Marketing campaigns" }).locator("tbody tr").first();
  await expect(firstRow).toBeVisible();
  const defaultName = await firstRow.getByRole("link").first().textContent();
  await page.getByLabel("Sort by").selectOption("highest-roas");
  await expect(page).toHaveURL(/sort=highest-roas/);
  await expect(firstRow).not.toContainText(defaultName ?? "");
  await expect(firstRow).not.toContainText("—");
});

test("paginates through a real second campaign page", async ({ page }) => {
  await page.goto("/campaigns");
  await expect(page.getByRole("table", { name: "Marketing campaigns" })).toBeVisible();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page).toHaveURL(/page=2/);
  await expect(page.getByText(/Showing 11/)).toBeVisible();
});

test("opens campaign details with financial and attribution metrics", async ({ page }) => {
  await page.goto("/campaigns?search=Brand%20Defense");
  await page.getByRole("link", { name: "Search Brand Defense", exact: true }).click();
  await expect(page).toHaveURL(/\/campaigns\/campaign_001/);
  await expect(page.getByRole("heading", { name: "Search Brand Defense", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Performance" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Budget" })).toBeVisible();
  await expect(page.getByText("$1,080.00").first()).toBeVisible();
  await expect(page.getByText("$2,093.90").first()).toBeVisible();
  await expect(page.getByText("1.94×").first()).toBeVisible();
  await expect(page.getByRole("table", { name: "Customers attributed to Search Brand Defense" })).toBeVisible();
});

test("navigates from a campaign to the real customer and returns", async ({ page }) => {
  await page.goto("/campaigns/campaign_001");
  await page.getByRole("link", { name: "Ethan Williams", exact: true }).click();
  await expect(page).toHaveURL(/\/customers\/customer_002/);
  await expect(page.getByRole("heading", { name: "Ethan Williams", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Back to customers" }).click();
  await expect(page).toHaveURL(/\/campaigns\/campaign_001/);
  await expect(page.getByRole("heading", { name: "Search Brand Defense", exact: true })).toBeVisible();
});
