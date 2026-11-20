
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { calculateTotal } from "../utils/cart";

export default function Cart() {
  const {
    cart,
    increase,
    decrease,
    removeFromCart,
    clearCart
  } = useCart();

  const total = calculateTotal(cart);

  if (cart.length === 0) {
    return (
      <main className="section empty-state">
        <h1>Your cart is empty</h1>
        <p>Discover something you love!</p>
        <Link to="/products" className="primary-btn">
          Start Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="section">
      <h1> Cart With us</h1>

      <div className="cart-layout">
        <div>
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />

              <div className="cart-info">
                <h3>{item.title}</h3>
                <p>${item.price.toFixed(2)}</p>

                <div className="quantity">
                  <button
                    onClick={() => decrease(item.id)}
                    aria-label={`Decrease ${item.title} quantity`}
                  >
                    −
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() => increase(item.id)}
                    aria-label={`Increase ${item.title} quantity`}
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>

              <strong>
                ${(item.price * item.qty).toFixed(2)}
              </strong>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>
          <p>Items: {cart.reduce((sum, item) => sum + item.qty, 0)}</p>
          <h3>Total: ${total.toFixed(2)}</h3>
          <p className="muted">Shipping calculated at checkout.</p>

          <button
            className="primary-btn full-btn"
            onClick={() => alert("Demo checkout: Order placed successfully!")}
          >
            Checkout
          </button>

          <button className="remove-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </aside>
      </div>
    </main>
  );
}
