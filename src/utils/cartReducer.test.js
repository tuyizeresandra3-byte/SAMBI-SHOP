
import { describe, it, expect } from "vitest";
import { cartReducer } from "./cart";

describe("Cart reducer", () => {
  it("increases product quantity", () => {
    const state = [{ id: 1, price: 100, qty: 1 }];

    const result = cartReducer(state, {
      type: "increase",
      id: 1
    });

    expect(result[0].qty).toBe(2);
  });

  it("removes a product", () => {
    const state = [{ id: 1, price: 100, qty: 1 }];

    expect(cartReducer(state, {
      type: "remove",
      id: 1
    })).toEqual([]);
  });
});
