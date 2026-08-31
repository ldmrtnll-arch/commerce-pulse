import { expect, test, type Page } from "@playwright/test";

const storageKey = "commerce-pulse.settings.v1";

async function openCleanSettings(page: Page) {
  await page.goto("/settings");
  await page.evaluate((key) => localStorage.removeItem(key), storageKey);
  await page.reload();
  await expect(page.getByRole("heading", { name: "Settings", exact: true })).toBeVisible();
}

test.beforeEach(async ({ page }) => openCleanSettings(page));

test("opens Settings from navigation with General defaults", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Settings", exact: true }).click();
  await expect(page).toHaveURL(/\/settings$/);
  await expect(page.getByLabel("Store name")).toHaveValue("Northstar Store");
  await expect(page.getByLabel("Support email")).toHaveValue("support@northstar.example");
  await expect(page.getByRole("button", { name: "Save changes" })).toBeDisabled();
});

test("validates the General support email on blur", async ({ page }) => {
  await page.getByLabel("Support email").fill("not-an-email");
  await page.getByLabel("Store name").focus();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
});

test("saves and reloads General settings while preserving section isolation", async ({ page }) => {
  await page.getByLabel("Store name").fill("Temporary Store");
  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.getByLabel("Store name")).toHaveValue("Northstar Store");
  await page.getByLabel("Store name").fill("Aurora Store");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("status")).toContainText("General settings saved.");
  await page.reload();
  await expect(page.getByLabel("Store name")).toHaveValue("Aurora Store");
  await page.getByRole("navigation", { name: "Settings sections" }).getByRole("button", { name: "Notifications" }).click();
  await expect(page.getByRole("navigation", { name: "Settings sections" }).getByRole("button", { name: "Notifications" })).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("checkbox", { name: /Campaign completed/ })).not.toBeChecked();
});

test("saves and reloads a Notification preference", async ({ page }) => {
  await page.getByRole("navigation", { name: "Settings sections" }).getByRole("button", { name: "Notifications" }).click();
  await expect(page).toHaveURL(/section=notifications/);
  const campaign = page.getByRole("checkbox", { name: /Campaign completed/ });
  await campaign.check();
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("status")).toContainText("Notifications settings saved.");
  await page.reload();
  await expect(campaign).toBeChecked();
});

test("updates the compact Appearance preview and persists it", async ({ page }) => {
  await page.getByRole("navigation", { name: "Settings sections" }).getByRole("button", { name: "Appearance" }).click();
  await expect(page.getByRole("navigation", { name: "Settings sections" }).getByRole("button", { name: "Appearance" })).toHaveAttribute("aria-current", "page");
  const preview = page.getByLabel("Appearance preview");
  await page.getByRole("radio", { name: /compact/i }).check();
  await expect(preview).toHaveAttribute("data-density", "compact");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("status")).toContainText("Appearance settings saved.");
  await page.reload();
  await expect(page.getByRole("radio", { name: /compact/i })).toBeChecked();
  await expect(preview).toHaveAttribute("data-density", "compact");
});

test("keeps editing and then discards when changing sections", async ({ page }) => {
  await page.getByLabel("Store name").fill("Unsaved Store");
  await page.getByRole("navigation", { name: "Settings sections" }).getByRole("button", { name: "Notifications" }).click();
  const dialog = page.getByRole("dialog", { name: "Discard unsaved changes?" });
  await expect(dialog).toBeVisible();
  await page.getByRole("button", { name: "Keep editing" }).click();
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/\/settings$/);
  await expect(page.getByLabel("Store name")).toHaveValue("Unsaved Store");
  await page.getByRole("navigation", { name: "Settings sections" }).getByRole("button", { name: "Notifications" }).click();
  await page.getByRole("button", { name: "Discard changes" }).click();
  await expect(page).toHaveURL(/section=notifications/);
  await page.getByRole("navigation", { name: "Settings sections" }).getByRole("button", { name: "General" }).click();
  await expect(page.getByLabel("Store name")).toHaveValue("Northstar Store");
});
