import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusBadge } from "./status-badge";

describe("StatusBadge", () => {
  it("presents the order status", () => {
    render(<StatusBadge status="delivered" />);

    expect(screen.getByText("Delivered")).toBeVisible();
  });
});
