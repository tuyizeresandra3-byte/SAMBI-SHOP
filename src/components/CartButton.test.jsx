
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";

const addToCart = vi.fn();

vi.mock("../context/CartContext", () => ({
  useCart: () => ({ addToCart })
}));

describe("ProductCard", () => {
  it("adds a product when clicked", async () => {
    const user = userEvent.setup();

    const product = {
      id: 1,
      title: "Test Shoes",
      price: 50,
      image: "https://example.com/shoes.jpg"
    };

    render(<ProductCard product={product} />);

    await user.click(
      screen.getByRole("button", {
        name: /add test shoes to cart/i
      })
    );

    expect(addToCart).toHaveBeenCalledWith(product);
  });
});
