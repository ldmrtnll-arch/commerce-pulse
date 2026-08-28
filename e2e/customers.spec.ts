import { expect, test } from "@playwright/test";

test("opens Customers from navigation and displays customer value", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/");
  await page.getByRole("link", { name: "Customers" }).click();
  await expect(page).toHaveURL(/\/customers$/);
  await expect(page.getByRole("heading", { name: "Customers" })).toBeVisible();
  await expect(page.getByRole("table", { name: "Customer relationships and value" })).toBeVisible();
  await expect(page.getByText("Total customers")).toBeVisible();
  await expect(page.getByText("30", { exact: true }).first()).toBeVisible();
  expect(errors).toEqual([]);
});

test("debounces customer search into the URL", async ({ page }) => {
  await page.goto("/customers");
  await page.getByRole("searchbox", { name: "Search customers" }).fill("Olivia Martin");
  await expect(page).toHaveURL(/\/customers\?search=Olivia(?:\+|%20)Martin/);
  const rows = page.getByRole("table", { name: "Customer relationships and value" }).getByRole("row");
  await expect(rows).toHaveCount(2);
  await expect(rows.nth(1)).toContainText("Olivia Martin");
});

test("filters every visible customer by Loyal segment", async ({ page }) => {
  await page.goto("/customers");
  await page.getByLabel("Segment").selectOption("loyal");
  await expect(page).toHaveURL(/segment=loyal/);
  const dataRows = page.getByRole("table", { name: "Customer relationships and value" }).locator("tbody tr");
  await expect(dataRows).toHaveCount(9);
  for (const row of await dataRows.all()) await expect(row).toContainText("Loyal");
});

test("sorts customers by highest lifetime value", async ({ page }) => {
  await page.goto("/customers");
  await page.getByLabel("Sort by").selectOption("highest-value");
  await expect(page).toHaveURL(/sort=highest-value/);
  const firstRow = page.getByRole("table", { name: "Customer relationships and value" }).locator("tbody tr").first();
  await expect(firstRow).toContainText("Daniel Green");
  await expect(firstRow).toContainText("$2,094.55");
});

test("paginates through the real customer base", async ({ page }) => {
  await page.goto("/customers");
  await page.getByRole("button", { name: "Page 2" }).click();
  await expect(page).toHaveURL(/page=2/);
  await expect(page.getByRole("table", { name: "Customer relationships and value" }).locator("tbody tr").first()).toContainText("Amelia Harris");
  await expect(page.getByText(/Showing 11–20 of 30 customers/)).toBeVisible();
});

test("opens customer details with metrics and real order history", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/customers?acquisition=organic_search");
  await page.getByRole("link", { name: "Olivia Martin", exact: true }).click();
  await expect(page).toHaveURL(/\/customers\/customer_001\?returnTo=/);
  await expect(page.getByRole("heading", { name: "Olivia Martin" })).toBeVisible();
  await expect(page.getByText("$232.18", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Order history" })).toBeVisible();
  await expect(page.getByRole("table", { name: "Order history for Olivia Martin" }).locator("tbody tr")).toHaveCount(3);
  expect(errors).toEqual([]);
});

test("opens the existing Order Details and returns to the customer", async ({ page }) => {
  await page.goto("/customers/customer_001?returnTo=%2Fcustomers%3Fsegment%3Dnew");
  await page.getByRole("link", { name: "#ORD-1090" }).click();
  await expect(page).toHaveURL(/\/orders\/order_1090\?returnTo=/);
  await expect(page.getByRole("heading", { name: "Order #ORD-1090" })).toBeVisible();
  await page.getByRole("link", { name: "Back to customer" }).click();
  await expect(page).toHaveURL(/\/customers\/customer_001\?returnTo=/);
  await expect(page.getByRole("heading", { name: "Olivia Martin" })).toBeVisible();
  await page.getByRole("link", { name: "Back to customers" }).click();
  await expect(page).toHaveURL(/\/customers\?segment=new/);
});
