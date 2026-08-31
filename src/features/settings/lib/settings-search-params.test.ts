import { describe, expect, it } from "vitest";
import { parseSettingsSection, settingsSectionUrl } from "./settings-search-params";

describe("settings URL state", () => {
  it.each([["", "general"], ["section=general", "general"], ["section=notifications", "notifications"], ["section=appearance", "appearance"], ["section=unknown", "general"]])("parses %s", (query, expected) => expect(parseSettingsSection(new URLSearchParams(query))).toBe(expected));
  it("omits the default section", () => { expect(settingsSectionUrl("general")).toBe("/settings"); expect(settingsSectionUrl("appearance")).toBe("/settings?section=appearance"); });
});
