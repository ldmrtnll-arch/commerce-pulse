import { expect, test } from "@playwright/test";

test("opens Products from navigation and displays the catalog", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  await page.goto("/");
  await page.getByRole("link", { name: "Products", exact: true }).click();
  await expect(page).toHaveURL(/\/products$/);
  await expect(page.getByRole("heading", { name: "Products", exact: true })).toBeVisible();
  await expect(page.getByRole("table", { name: "Product catalog" })).toBeVisible();
  await expect(page.getByText("Total products")).toBeVisible();
  expect(consoleErrors).toEqual([]);
});

test("debounces product search into the URL", async ({ page }) => {
  await page.goto("/products");
  await expect(page.getByRole("table", { name: "Product catalog" })).toBeVisible();
  await page.getByRole("searchbox", { name: "Search products" }).fill("Everyday Carry");
  await expect(page).toHaveURL(/search=Everyday(?:\+|%20)Carry/);
  const table = page.getByRole("table", { name: "Product catalog" });
  await expect(table.getByRole("link", { name: "Everyday Carry Backpack", exact: true })).toBeVisible();
  await expect(table.getByText("Studio Wireless Headphones")).toHaveCount(0);
});

test("filters all visible products by low stock", async ({ page }) => {
  await page.goto("/products");
  await page.getByLabel("Stock level").selectOption("low");
  await expect(page).toHaveURL(/stock=low/);
  const rows = page.getByRole("table", { name: "Product catalog" }).locator("tbody tr");
  await expect(rows.first()).toContainText("Low stock");
  const rowCount = await rows.count();
  for (let index = 0; index < rowCount; index += 1) await expect(rows.nth(index)).toContainText("Low stock");
});

test("filters the catalog by category", async ({ page }) => {
  await page.goto("/products");
  await page.getByLabel("Category").selectOption("electronics");
  await expect(page).toHaveURL(/category=electronics/);
  const rows = page.getByRole("table", { name: "Product catalog" }).locator("tbody tr");
  await expect(rows.first()).toContainText("Electronics");
  const rowCount = await rows.count();
  for (let index = 0; index < rowCount; index += 1) await expect(rows.nth(index)).toContainText("Electronics");
});

test("paginates through a real second product page", async ({ page }) => {
  await page.goto("/products");
  await expect(page.getByRole("link", { name: "Everyday Carry Backpack", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page).toHaveURL(/page=2/);
  await expect(page.getByRole("link", { name: "Essential Cotton Hoodie", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Everyday Carry Backpack", exact: true })).toHaveCount(0);
});

test("opens product details and returns to preserved filters", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  await page.goto("/products?category=accessories");
  await page.getByRole("link", { name: "Everyday Carry Backpack", exact: true }).click();
  await expect(page).toHaveURL(/\/products\/prod_backpack/);
  await expect(page.getByRole("heading", { name: "Everyday Carry Backpack", exact: true })).toBeVisible();
  await expect(page.getByText("SKU BAG-EC-001")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Inventory" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Performance" })).toBeVisible();
  await page.getByRole("link", { name: "Back to products" }).click();
  await expect(page).toHaveURL(/\/products\?category=accessories$/);
  expect(consoleErrors).toEqual([]);
});
