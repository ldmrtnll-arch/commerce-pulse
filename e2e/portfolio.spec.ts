import { expect, test } from "@playwright/test";

test("main routes expose consistent page titles and active navigation", async ({ page }) => {
  const routes = [
    ["/", "Overview", "Overview | CommercePulse"],
    ["/orders", "Orders", "Orders | CommercePulse"],
    ["/products", "Products", "Products | CommercePulse"],
    ["/customers", "Customers", "Customers | CommercePulse"],
    ["/analytics", "Analytics", "Analytics | CommercePulse"],
    ["/campaigns", "Campaigns", "Campaigns | CommercePulse"],
    ["/settings", "Settings", "Settings | CommercePulse"],
  ] as const;

  for (const [route, label, title] of routes) {
    await page.goto(route);
    await expect(page).toHaveTitle(title);
    await expect(page.getByRole("link", { name: label, exact: true })).toHaveAttribute("aria-current", "page");
  }
});

test("the polished 404 returns visitors to Overview", async ({ page }) => {
  await page.goto("/route-that-does-not-exist");
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  await page.getByRole("link", { name: "Return to overview" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("mobile navigation closes after reaching every primary route", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  for (const [label, path] of [["Orders", "/orders"], ["Products", "/products"], ["Customers", "/customers"], ["Analytics", "/analytics"], ["Campaigns", "/campaigns"], ["Settings", "/settings"], ["Overview", "/"]] as const) {
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const drawer = page.getByRole("dialog", { name: "Navigation menu" });
    await drawer.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(path);
    await expect(drawer).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});
