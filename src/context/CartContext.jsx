
import {
  createContext,
  useContext,
  useEffect,
  useReducer
} from "react";
import { cartReducer } from "../utils/cart";

const CartContext = createContext(null);

function getInitialCart() {
  try {
    const saved = localStorage.getItem("shopease-cart");
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    undefined,
    getInitialCart
  );

  useEffect(() => {
    localStorage.setItem("shopease-cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    dispatch({ type: "add", product });
  }

  function removeFromCart(id) {
    dispatch({ type: "remove", id });
  }

  function increase(id) {
    dispatch({ type: "increase", id });
  }

  function decrease(id) {
    dispatch({ type: "decrease", id });
  }

  function clearCart() {
    dispatch({ type: "clear" });
  }

  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        count,
        addToCart,
        removeFromCart,
        increase,
        decrease,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
