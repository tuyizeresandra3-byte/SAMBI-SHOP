
import { describe, it, expect } from "vitest";
import { calculateTotal, cartReducer } from "./cart";

describe("Cart utilities", () => {
  it("calculates the correct cart total", () => {
    const items = [
      { id: 1, price: 100, qty: 2 },
      { id: 2, price: 50, qty: 1 }
    ];

    expect(calculateTotal(items)).toBe(250);
  });

  it("adds a product with quantity one", () => {
    const result = cartReducer([], {
      type: "add",
      product: { id: 1, price: 100 }
    });

    expect(result).toEqual([
      { id: 1, price: 100, qty: 1 }
    ]);
  });
});
