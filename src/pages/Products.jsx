
import { useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  Star,
  SlidersHorizontal,
  Eye,
  Plus,
  X,
  Check
} from "lucide-react";

import products from "../data/products";
import "./Products.css";

function formatPrice(price) {
  return `RWF ${price.toLocaleString("en-US")}`;
}

function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cartMessage, setCartMessage] = useState("");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ];

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, sort]);

  function addToCart(product) {
    const existingCart = JSON.parse(
      localStorage.getItem("sambiCart") || "[]"
    );

    const existingItem = existingCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        { ...product, quantity: 1 }
      ];
    }

    localStorage.setItem("sambiCart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("sambiCartUpdated"));

    setCartMessage(`${product.name} added to your cart!`);

    setTimeout(() => setCartMessage(""), 2500);
  }

  function toggleFavorite(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  return (
    <main className="products-page">

      {/* PAGE HEADER */}
      <section className="products-hero">
        <div className="hero-content">
          <span className="hero-label">WELCOME TO SAMBI SHOP</span>
          <h1>Discover Products You'll Love.</h1>
          <p>
            Shop quality products at affordable prices.
            Your favorite shopping destination starts here.
          </p>
          <a href="#product-list" className="hero-button">
            Explore Products <span>→</span>
          </a>
        </div>
      </section>

      {/* PAGE TITLE */}
      <section className="products-heading">
        <div>
          <span className="section-label">OUR COLLECTION</span>
          <h2>Explore Our Products</h2>
          <p>Find the perfect products for your everyday needs.</p>
        </div>

        <a href="/cart" className="cart-link">
          <ShoppingBag size={20} />
          My Cart
        </a>
      </section>

      {/* SEARCH AND FILTERS */}
      <section className="products-toolbar">

        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch("")} aria-label="Clear search">
              <X size={18} />
            </button>
          )}
        </div>

        <div className="sort-box">
          <SlidersHorizontal size={19} />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="featured">Featured Products</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="category-filters">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "category-btn active" : "category-btn"}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </section>

      {/* SUCCESS MESSAGE */}
      {cartMessage && (
        <div className="cart-success">
          <Check size={18} />
          {cartMessage}
          <a href="/cart">View Cart</a>
        </div>
      )}

      {/* PRODUCT LIST */}
      <section className="product-section" id="product-list">

        <div className="product-results">
          <p>
            Showing <strong>{filteredProducts.length}</strong> products
          </p>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>

              <div className="product-image">
                <img src={product.image} alt={product.name} />

                {product.oldPrice > product.price && (
                  <span className="discount-badge">
                    SALE
                  </span>
                )}

                <button
                  className={`favorite-btn ${
                    favorites.includes(product.id) ? "favorited" : ""
                  }`}
                  onClick={() => toggleFavorite(product.id)}
                  aria-label="Add to wishlist"
                >
                  <Heart
                    size={20}
                    fill={
                      favorites.includes(product.id)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>

                <button
                  className="quick-view-btn"
                  onClick={() => setSelectedProduct(product)}
                >
                  <Eye size={17} /> Quick View
                </button>
              </div>

              <div className="product-info">
                <span className="product-category">
                  {product.category}
                </span>

                <h3>{product.name}</h3>

                <div className="product-rating">
                  <Star size={16} fill="#f5a623" color="#f5a623" />
                  <span>{product.rating}</span>
                  <span className="stock-text">
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <div className="product-price">
                  <strong>{formatPrice(product.price)}</strong>
                  {product.oldPrice > product.price && (
                    <del>{formatPrice(product.oldPrice)}</del>
                  )}
                </div>

                <button
                  className="add-cart-btn"
                  disabled={product.stock === 0}
                  onClick={() => addToCart(product)}
                >
                  <Plus size={18} />
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-products">
            <Search size={40} />
            <h3>No products found</h3>
            <p>Try another search or select a different category.</p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="product-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product details"
            >
              <X size={22} />
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />

            <div className="modal-details">
              <span className="product-category">
                {selectedProduct.category}
              </span>

              <h2>{selectedProduct.name}</h2>

              <div className="product-rating">
                <Star size={17} fill="#f5a623" color="#f5a623" />
                {selectedProduct.rating} / 5
              </div>

              <h3>{formatPrice(selectedProduct.price)}</h3>

              <p>{selectedProduct.description}</p>

              <p>
                <strong>Available stock:</strong> {selectedProduct.stock}
              </p>

              <button
                className="add-cart-btn"
                disabled={selectedProduct.stock === 0}
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                <ShoppingBag size={19} />
                Add to Shopping Cart
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

export default Products;
