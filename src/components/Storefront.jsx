
import { useState } from "react";

const money = (amount) =>
  new Intl.NumberFormat("en-RW").format(amount) + " RWF";

export default function Storefront({ products, onPlaceOrder }) {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [payment, setPayment] = useState("Mobile Money");
  const [message, setMessage] = useState("");

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category)),
  ];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || p.category === category)
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const addToCart = (product) => {
    if (product.stock <= 0) {
      setMessage("Sorry, this product is out of stock.");
      return;
    }

    setCart((previous) => {
      const existing = previous.find((item) => item.id === product.id);

      if (existing) {
        if (existing.quantity >= product.stock) {
          setMessage("You have reached the available stock.");
          return previous;
        }

        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });

    setMessage(`${product.name} added to your cart.`);
  };

  const changeQuantity = (id, amount) => {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const checkout = (e) => {
    e.preventDefault();

    if (!cart.length) {
      setMessage("Your shopping cart is empty.");
      return;
    }

    if (cart.some((item) => item.quantity > item.stock)) {
      setMessage("Some products no longer have enough stock.");
      return;
    }

    const order = {
      id: "#SAM" + Date.now().toString().slice(-6),
      customer: customer.name,
      phone: customer.phone,
      address: customer.address,
      product: cart.map(
        (item) => `${item.name} x ${item.quantity}`
      ).join(", "),
      items: cart,
      amount: cartTotal,
      payment,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };

    onPlaceOrder(order);
    setCart([]);
    setCustomer({ name: "", phone: "", address: "" });
    setMessage("Your order has been placed successfully!");
  };

  return (
    <div className="storefront">

      <header className="shop-header">
        <div className="shop-brand">
          <span className="shop-logo">S</span>
          <div>
            <strong>SAMBI<span>SHOP</span></strong>
            <small>Shop smart. Live better.</small>
          </div>
        </div>

        <div className="shop-header-right">
          <a href="#shop-products">Shop</a>
          <a href="#shop-contact">Contact</a>
          <a href="#shop-cart">
            🛒 Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </a>
        </div>
      </header>

      <section className="shop-hero">
        <div>
          <span className="shop-eyebrow">WELCOME TO SAMBISHOP</span>
          <h1>Find what you love.<br />Shop with confidence.</h1>
          <p>
            Discover quality products, enjoy convenient shopping
            and get your favourite items delivered.
          </p>
          <a href="#shop-products" className="shop-cta">
            Explore Products →
          </a>
        </div>
        <div className="hero-decoration">S</div>
      </section>

      <section id="shop-products" className="shop-products">
        <div className="shop-section-title">
          <div>
            <span className="shop-eyebrow">OUR COLLECTION</span>
            <h2>Explore Products</h2>
            <p>Find products that match your style and needs.</p>
          </div>
          <span>{filteredProducts.length} products</span>
        </div>

        <input
          className="shop-search"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "category-active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="shop-product-grid">
          {filteredProducts.map((product) => (
            <article className="shop-product-card" key={product.id}>
              <div className="shop-product-image">
                <img src={product.image} alt={product.name} />
                {product.stock <= 5 && (
                  <span className="shop-stock-tag">
                    {product.stock === 0 ? "Out of stock" : "Limited stock"}
                  </span>
                )}
              </div>

              <div className="shop-product-info">
                <small>{product.category}</small>
                <h3>{product.name}</h3>
                <strong>{money(product.price)}</strong>
                <p>{product.stock} available</p>
                <button
                  disabled={product.stock <= 0}
                  onClick={() => addToCart(product)}
                >
                  {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </article>
          ))}
        </div>

        {!filteredProducts.length && (
          <p className="empty-message">No products found.</p>
        )}
      </section>

      <section id="shop-cart" className="shop-cart-section">
        <div>
          <span className="shop-eyebrow">YOUR SELECTION</span>
          <h2>Shopping Cart</h2>
        </div>

        {!cart.length ? (
          <p>Your cart is empty. Add some products to get started.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="shop-cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <small>{money(item.price)}</small>
                </div>
                <div className="quantity-control">
                  <button onClick={() => changeQuantity(item.id, -1)}>−</button>
                  <span>{item.quantity}</span>
                  <button
                    disabled={item.quantity >= item.stock}
                    onClick={() => changeQuantity(item.id, 1)}
                  >+</button>
                </div>
                <strong>{money(item.price * item.quantity)}</strong>
              </div>
            ))}

            <h3 className="cart-total">Total: {money(cartTotal)}</h3>

            <form className="shop-checkout" onSubmit={checkout}>
              <h3>Checkout Details</h3>

              <input
                required
                placeholder="Full name"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
              />

              <input
                required
                type="tel"
                placeholder="Phone number"
                value={customer.phone}
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
              />

              <input
                required
                placeholder="Delivery address"
                value={customer.address}
                onChange={(e) =>
                  setCustomer({ ...customer, address: e.target.value })
                }
              />

              <label>Choose payment method</label>
              <select
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              >
                <option>Mobile Money</option>
                <option>Bank Transfer</option>
                <option>Cash on Delivery</option>
              </select>

              <button className="shop-checkout-button" type="submit">
                Place Order · {money(cartTotal)}
              </button>
            </form>
          </>
        )}

        {message && <p className="shop-message">{message}</p>}
      </section>

      <section id="shop-contact" className="shop-contact">
        <h2>Need Help? Contact Us</h2>
        <p>We are happy to help with your shopping experience.</p>
        <div className="contact-links">
          <a href="https://wa.me/250798024962" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href="tel:+250798024962">Call Us</a>
          <a href="mailto:info@sambishop.com">Email Us</a>
        </div>
        <small>Replace the sample phone number and email with your real business contacts.</small>
      </section>

      <footer className="shop-footer">
        © 2026 SambiShop. All rights reserved.
      </footer>
    </div>
  );
}
