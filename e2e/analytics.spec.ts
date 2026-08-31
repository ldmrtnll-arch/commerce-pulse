import { expect, test } from "@playwright/test";

test("opens Analytics from the primary navigation with reconciled KPIs", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  await page.goto("/");
  await page.getByRole("link", { name: "Analytics", exact: true }).click();
  await expect(page).toHaveURL(/\/analytics$/);
  await expect(page.getByRole("heading", { name: "Analytics", exact: true })).toBeVisible();
  await expect(page.getByText("$10,912.52").first()).toBeVisible();
  expect(consoleErrors).toEqual([]);
});

test("stores non-default period selection in the URL and updates metrics", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  await page.goto("/analytics");
  await expect(page.getByText("$10,912.52").first()).toBeVisible();
  await page.getByLabel("Analysis period").selectOption("7d");
  await expect(page).toHaveURL(/period=7d/);
  await expect(page.getByText("$2,619.29").first()).toBeVisible();
  await expect(page.getByText("Aug 22").first()).toBeVisible();
  await page.getByLabel("Analysis period").selectOption("90d");
  await expect(page).toHaveURL(/period=90d/);
  await expect(page.getByText("$32,309.66").first()).toBeVisible();
  await expect(page.getByText("No previous data")).toHaveCount(4);
  expect(consoleErrors).toEqual([]);
});

test("shows the verified default KPI set and comparison context", async ({ page }) => {
  await page.goto("/analytics");
  await expect(page.getByText("$10,912.52").first()).toBeVisible();
  await expect(page.getByText("Orders created", { exact: true })).toBeVisible();
  await expect(page.getByText("30", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("$419.71")).toBeVisible();
  await expect(page.getByText("No change")).toHaveCount(2);
});

test("renders revenue and category charts with accessible names", async ({ page }) => {
  await page.goto("/analytics");
  await expect(page.getByRole("img", { name: /Daily net sales chart totaling/ })).toBeVisible();
  await expect(page.getByRole("img", { name: "Gross merchandise sales by category" })).toBeVisible();
});

test("presents real product, customer, status, and acquisition insights", async ({ page }) => {
  await page.goto("/analytics");
  await expect(page.getByRole("link", { name: "Lightweight Field Jacket" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Active customer segments" })).toBeVisible();
  await expect(page.getByText("Delivered", { exact: true })).toBeVisible();
  await expect(page.getByRole("table", { name: "Performance by customer acquisition channel" })).toBeVisible();
});

test("opens a top product and returns to the selected analytics period", async ({ page }) => {
  await page.goto("/analytics?period=7d");
  const productLink = page.getByRole("link", { name: "Lightweight Field Jacket" });
  await expect(productLink).toBeVisible();
  await productLink.click();
  await expect(page).toHaveURL(/\/products\/prod_jacket/);
  await expect(page.getByRole("heading", { name: "Lightweight Field Jacket", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Back to analytics" }).click();
  await expect(page).toHaveURL(/\/analytics\?period=7d$/);
  await expect(page.getByText("$2,619.29").first()).toBeVisible();
});

test("offers recovery from a controlled analytics error", async ({ page }) => {
  await page.goto("/analytics?error=true");
  await expect(page.getByRole("heading", { name: "Unable to load analytics" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Try again" })).toBeVisible();
});
