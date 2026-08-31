import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_SETTINGS } from "../repository/settings-repository";
import { AppearanceSettingsForm } from "./appearance-settings-form";
import { GeneralSettingsForm } from "./general-settings-form";
import { NotificationSettingsForm } from "./notification-settings-form";
import { UnsavedChangesDialog } from "./unsaved-changes-dialog";

afterEach(cleanup);

describe("settings forms", () => {
  it("renders General defaults, validates, saves, and resets dirty state", async () => {
    const user = userEvent.setup();
    const save = vi.fn(async (value) => value);
    render(<GeneralSettingsForm value={DEFAULT_SETTINGS.general} onSave={save} />);
    expect(screen.getByLabelText("Store name")).toHaveValue("Northstar Store");
    expect(screen.getByLabelText("Support email")).toHaveValue("support@northstar.example");
    expect(screen.getByRole("button", { name: "Save changes" })).toBeDisabled();
    await user.clear(screen.getByLabelText("Support email"));
    await user.type(screen.getByLabelText("Support email"), "invalid");
    await user.tab();
    expect(await screen.findByText("Enter a valid email address.")).toBeVisible();
    await user.clear(screen.getByLabelText("Support email"));
    await user.type(screen.getByLabelText("Support email"), "hello@northstar.example");
    await user.click(screen.getByRole("button", { name: "Save changes" }));
    await waitFor(() => expect(save).toHaveBeenCalledOnce());
    await waitFor(() => expect(screen.getByRole("button", { name: "Save changes" })).toBeDisabled());
    await user.clear(screen.getByLabelText("Store name")); await user.type(screen.getByLabelText("Store name"), "Changed store");
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByLabelText("Store name")).toHaveValue("Northstar Store");
  });

  it("toggles, resets, and saves Notifications", async () => {
    const user = userEvent.setup(); const save = vi.fn(async (value) => value);
    render(<NotificationSettingsForm value={DEFAULT_SETTINGS.notifications} onSave={save} />);
    const campaign = screen.getByRole("checkbox", { name: /Campaign completed/ });
    expect(campaign).not.toBeChecked(); await user.click(campaign); expect(screen.getByRole("button", { name: "Save changes" })).toBeEnabled();
    await user.click(screen.getByRole("button", { name: "Reset" })); expect(campaign).not.toBeChecked();
    await user.click(campaign); await user.click(screen.getByRole("button", { name: "Save changes" })); await waitFor(() => expect(save).toHaveBeenCalledOnce());
  });

  it("updates the Appearance preview immediately and supports reset and save", async () => {
    const user = userEvent.setup(); const save = vi.fn(async (value) => value);
    render(<AppearanceSettingsForm value={DEFAULT_SETTINGS.appearance} onSave={save} />);
    const preview = screen.getByLabelText("Appearance preview");
    await user.click(screen.getByRole("radio", { name: /compact/i })); expect(preview).toHaveAttribute("data-density", "compact");
    await user.click(screen.getByRole("button", { name: "Reset" })); expect(preview).toHaveAttribute("data-density", "comfortable");
    await user.click(screen.getByRole("radio", { name: /compact/i })); await user.click(screen.getByRole("button", { name: "Save changes" })); await waitFor(() => expect(save).toHaveBeenCalledOnce());
  });

  it("preserves input after a failed mutation and allows retry", async () => {
    const user = userEvent.setup(); const save = vi.fn().mockRejectedValueOnce(new Error("failed")).mockImplementation(async (value) => value);
    render(<GeneralSettingsForm value={DEFAULT_SETTINGS.general} onSave={save} />);
    const name = screen.getByLabelText("Store name"); await user.clear(name); await user.type(name, "Retry Store");
    await user.click(screen.getByRole("button", { name: "Save changes" })); await waitFor(() => expect(save).toHaveBeenCalledOnce()); expect(name).toHaveValue("Retry Store");
    await user.click(screen.getByRole("button", { name: "Save changes" })); await waitFor(() => expect(save).toHaveBeenCalledTimes(2));
  });

  it("keeps editing or discards from the accessible confirmation dialog", async () => {
    const user = userEvent.setup(); const discard = vi.fn(); const onOpenChange = vi.fn();
    render(<UnsavedChangesDialog open onOpenChange={onOpenChange} onDiscard={discard} />);
    expect(screen.getByRole("dialog", { name: "Discard unsaved changes?" })).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Keep editing" })); expect(onOpenChange).toHaveBeenCalledWith(false); expect(discard).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Discard changes" })); expect(discard).toHaveBeenCalledOnce();
  });
});
