import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { orderFixtures } from "../fixtures/orders";
import { OrdersCollection } from "./orders-collection";

describe("OrdersCollection", () => {
  it("renders order, customer, status, and detail links", () => {
    const order = orderFixtures[0];
    render(<OrdersCollection orders={[order]} returnUrl="/orders?status=delivered" />);
    expect(screen.getAllByText(`#${order.number}`).length).toBeGreaterThan(0);
    expect(screen.getAllByText(order.customer.name).length).toBeGreaterThan(0);
    expect(screen.getAllByText("Delivered").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: `View order ${order.number}` })).toHaveLength(1);
  });
});
