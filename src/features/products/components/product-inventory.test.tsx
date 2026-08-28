import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { productFixtures } from "../fixtures/products";
import { InventoryIndicator } from "./inventory-indicator";
import { ProductStatusBadge, StockHealthBadge } from "./product-badges";

describe("product inventory presentation", () => {
  it("shows lifecycle labels independently from stock health", () => {
    render(<><ProductStatusBadge status="draft" /><StockHealthBadge health="low" /></>);
    expect(screen.getByText("Draft")).toBeVisible();
    expect(screen.getByText("Low stock")).toBeVisible();
  });

  it("describes available inventory with accessible text", () => {
    const product = productFixtures.find((item) => item.inventory.available === 0);
    expect(product).toBeDefined();
    if (product) {
      render(<InventoryIndicator product={product} compact />);
      expect(screen.getByText("0 available")).toBeVisible();
      expect(screen.getByText("Out of stock")).toBeVisible();
    }
  });
});
