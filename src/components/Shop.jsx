
import React, { useState } from "react";
import products from "../data/products";
import "../styles/Shop.css";

function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState("");

  const categories = [
    "All", "Women", "Men", "Shoes", "Accessories",
    "Beauty", "Kids", "Home", "Electronics"
  ];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "sale") return Number(b.isSale) - Number(a.isSale);
      return 0;
    });

  const addToCart = (product) => {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === product.id);

      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });

    setMessage(`${product.name} added to your cart!`);
    setTimeout(() => setMessage(""), 2500);
  };

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  const money = (amount) =>
    `RWF ${amount.toLocaleString("en-US")}`;

  return (
    <div className="shop-page">

      <header className="shop-header">
        <div className="shop-logo">SAMBI<span>-SHOP</span></div>

        <div className="header-links">
          <a href="/">Home</a>
          <a href="#products">Shop</a>
          <a href="#offers">Offers</a>
        </div>

        <div className="header-cart">
          🛒 Cart <span>{cartCount}</span>
        </div>
      </header>

      <section className="shop-hero" id="offers">
        <div className="hero-content">
          <span className="hero-tag">NEW COLLECTION 2026</span>
          <h1>Discover Your Style.<br />Shop Your Way.</h1>
          <p>
            Fashion, beauty, lifestyle and more.
            Everything you love in one place.
          </p>
          <a href="#products" className="hero-button">
            Explore Products →
          </a>
        </div>
      </section>

      <section className="shop-benefits">
        <div>🚚 <b>Easy Shopping</b><small>Convenient ordering</small></div>
        <div>💳 <b>Flexible Payments</b><small>Multiple payment options</small></div>
        <div>⭐ <b>Quality Products</b><small>Selected for you</small></div>
        <div>💬 <b>Customer Support</b><small>We are here to help</small></div>
      </section>

      <section className="shop-main" id="products">

        <div className="section-heading">
          <div>
            <span className="small-label">YOUR FAVORITE STORE</span>
            <h2>Explore Our Collection</h2>
            <p>Find something special for everyone.</p>
          </div>

          <div className="cart-summary">
            🛍️ {cartCount} items in cart
          </div>
        </div>

        <div className="shop-controls">
          <input
            type="search"
            placeholder="🔍 Search dresses, shoes, shirts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured Products</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="sale">Special Offers</option>
          </select>
        </div>

        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active-category" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {message && <div className="shop-message">✓ {message}</div>}

        <div className="products-count">
          Showing <b>{filteredProducts.length}</b> products
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>

              <div className="product-image">
                <img src={product.image} alt={product.name} loading="lazy" />

                {product.isSale && (
                  <span className="sale-badge">SPECIAL OFFER</span>
                )}

                <button
                  className="favorite-button"
                  onClick={() => toggleFavorite(product.id)}
                  aria-label="Add to favorites"
                >
                  {favorites.includes(product.id) ? "❤️" : "♡"}
                </button>
              </div>

              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <div className="product-rating">⭐ {product.rating} / 5</div>

                <div className="product-prices">
                  <strong>{money(
                    product.isSale
                      ? Math.round(product.price * 0.8)
                      : product.price
                  )}</strong>

                  {product.isSale && (
                    <del>{money(product.oldPrice)}</del>
                  )}
                </div>

                <button
                  className="add-cart-button"
                  onClick={() => addToCart(product)}
                >
                  + Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-products">
            <h2>No products found 😔</h2>
            <p>Try another search or category.</p>
            <button onClick={() => {
              setSearch("");
              setCategory("All");
            }}>
              View All Products
            </button>
          </div>
        )}

      </section>

      <footer className="shop-footer">
        <h2>SAMBI-SHOP</h2>
        <p>Your style, your choice, your shopping destination.</p>
        <p>© 2026 SAMBI-SHOP. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default Shop;
