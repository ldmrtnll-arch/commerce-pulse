import { expect, test } from "@playwright/test";

test("opens Orders from the dashboard and displays the order table", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  await page.goto("/");
  await page.getByRole("link", { name: "Orders", exact: true }).click();

  await expect(page).toHaveURL(/\/orders$/);
  await expect(page.getByRole("heading", { name: "Orders", exact: true })).toBeVisible();
  await expect(page.getByRole("table", { name: "Customer orders" })).toBeVisible();
  expect(consoleErrors).toEqual([]);
});

test("debounces search into the URL and filters customers", async ({ page }) => {
  await page.goto("/orders");
  await expect(page.getByRole("table", { name: "Customer orders" })).toBeVisible();

  await page.getByRole("searchbox", { name: "Search orders" }).fill("Olivia");
  await expect(page).toHaveURL(/search=Olivia/);
  const table = page.getByRole("table", { name: "Customer orders" });
  await expect(table.getByText("Olivia Martin").first()).toBeVisible();
  await expect(table.getByText("Ethan Williams")).toHaveCount(0);
});

test("filters every visible result by delivered status", async ({ page }) => {
  await page.goto("/orders");
  await page.getByLabel("Status").selectOption("delivered");
  await expect(page).toHaveURL(/status=delivered/);

  const rows = page.getByRole("table", { name: "Customer orders" }).locator("tbody tr");
  await expect(rows.first()).toContainText("Delivered");
  const rowCount = await rows.count();
  for (let index = 0; index < rowCount; index += 1) await expect(rows.nth(index)).toContainText("Delivered");
});

test("moves to the next real page of results", async ({ page }) => {
  await page.goto("/orders");
  await expect(page.getByRole("link", { name: "#ORD-1090", exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page).toHaveURL(/page=2/);
  await expect(page.getByRole("link", { name: "#ORD-1080", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "#ORD-1090", exact: true })).toHaveCount(0);
});

test("opens order details and returns to the preserved list state", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  await page.goto("/orders?status=delivered");
  await page.getByRole("link", { name: "#ORD-1090", exact: true }).click();

  await expect(page).toHaveURL(/\/orders\/order_1090/);
  await expect(page.getByRole("heading", { name: "Order #ORD-1090" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Order summary" })).toBeVisible();
  const customerCard = page.getByRole("heading", { name: "Customer" }).locator("..").locator("..");
  await expect(customerCard.getByText("Olivia Martin", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "Back to orders" }).click();
  await expect(page).toHaveURL(/\/orders\?status=delivered$/);
  expect(consoleErrors).toEqual([]);
});
