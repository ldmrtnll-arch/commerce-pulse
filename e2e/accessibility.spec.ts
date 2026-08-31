import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/orders", "/products", "/customers", "/analytics", "/campaigns", "/settings"] as const;

for (const route of routes) {
  test(`${route} has no serious or critical accessibility violations`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const highImpactViolations = results.violations.filter(({ impact }) => impact === "serious" || impact === "critical");
    expect(highImpactViolations).toEqual([]);
  });
}
