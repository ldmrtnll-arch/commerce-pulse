import { describe, expect, it } from "vitest";
import { getStockHealth } from "./inventory";

describe("stock health", () => {
  it("returns out when no inventory is available", () => {
    expect(getStockHealth({ inventory: { available: 0, reserved: 3, reorderPoint: 8 } })).toBe("out");
  });

  it("returns low at and below the reorder point", () => {
    expect(getStockHealth({ inventory: { available: 4, reserved: 0, reorderPoint: 8 } })).toBe("low");
    expect(getStockHealth({ inventory: { available: 8, reserved: 0, reorderPoint: 8 } })).toBe("low");
  });

  it("returns healthy above the reorder point", () => {
    expect(getStockHealth({ inventory: { available: 9, reserved: 1, reorderPoint: 8 } })).toBe("healthy");
  });
});
