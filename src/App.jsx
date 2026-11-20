
import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

const initialProducts = [
  { id: 1, name: "Classic Men's Shirt", category: "Men", type: "Clothing", price: 18000, stock: 20, sizes: ["S", "M", "L", "XL"], colors: ["White", "Black", "Blue"], image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=700" },
  { id: 2, name: "Casual Jacket", category: "Men", type: "Clothing", price: 35000, stock: 12, sizes: ["M", "L", "XL"], colors: ["Black", "Brown"], image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700" },
  { id: 3, name: "Basic T-Shirt", category: "Men", type: "Clothing", price: 12000, stock: 30, sizes: ["S", "M", "L", "XL"], colors: ["White", "Black", "Green"], image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700" },
  { id: 4, name: "Classic Sneakers", category: "Men", type: "Shoes", price: 45000, stock: 15, sizes: ["39", "40", "41", "42", "43"], colors: ["White", "Black"], image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700" },
  { id: 5, name: "Formal Shoes", category: "Men", type: "Shoes", price: 55000, stock: 10, sizes: ["40", "41", "42", "43"], colors: ["Black", "Brown"], image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=700" },
  { id: 6, name: "Elegant Dress", category: "Women", type: "Clothing", price: 32000, stock: 18, sizes: ["S", "M", "L"], colors: ["Pink", "Black", "Red"], image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=700" },
  { id: 7, name: "Women's Fashion Top", category: "Women", type: "Clothing", price: 16000, stock: 25, sizes: ["S", "M", "L"], colors: ["White", "Pink", "Blue"], image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=700" },
  { id: 8, name: "Women's Sneakers", category: "Women", type: "Shoes", price: 42000, stock: 14, sizes: ["36", "37", "38", "39", "40"], colors: ["White", "Pink"], image: "https://woman-trend.com/wp-content/uploads/2024/06/25-33.jpg" },
  { id: 9, name: "Elegant Heels", category: "Women", type: "Shoes", price: 38000, stock: 9, sizes: ["36", "37", "38", "39"], colors: ["Black", "Red"], image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700" },
  { id: 10, name: "Baby Outfit", category: "Babies", type: "Clothing", price: 15000, stock: 22, sizes: ["0-3M", "3-6M", "6-12M"], colors: ["White", "Pink", "Blue"], image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=700" },
  { id: 11, name: "Baby Romper", category: "Babies", type: "Clothing", price: 12000, stock: 17, sizes: ["0-3M", "3-6M", "6-12M"], colors: ["Yellow", "Pink"], image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=700" },
  { id: 12, name: "Baby Shoes", category: "Babies", type: "Shoes", price: 10000, stock: 20, sizes: ["16", "17", "18", "19"], colors: ["White", "Pink"], image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=700" }
];

const money = value => "RWF " + Number(value).toLocaleString();

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [products, setProducts] = useState(() =>
    readStorage("sambi-products", initialProducts)
  );
  const [orders, setOrders] = useState(() =>
    readStorage("sambi-orders", [])
  );
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(() =>
    readStorage("sambi-wishlist", [])
  );

  const [page, setPage] = useState("shop");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showAll, setShowAll] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem("sambi-products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("sambi-orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("sambi-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const filteredProducts = useMemo(() => {
    let result = products.filter(product =>
      (category === "All" || product.category === category) &&
      (type === "All" || product.type === type) &&
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === "low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [products, category, type, search, sortBy]);

  const displayedProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 8);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const deliveredRevenue = orders
    .filter(order => order.status === "Delivered")
    .reduce((sum, order) => sum + order.total, 0);

  function notify(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  }

  function openProduct(product) {
    setSelectedProduct(product);
    setSelectedSize(product.sizes?.[0] || "");
    setSelectedColor(product.colors?.[0] || "");
    setSelectedQuantity(1);
  }

  function addToCart(product, size, color, quantity = 1) {
    if (product.stock < quantity || quantity < 1) {
      notify("Sorry, the requested quantity is unavailable.");
      return;
    }

    const key = `${product.id}-${size}-${color}`;

    setCart(prev => {
      const existing = prev.find(item => item.key === key);
      const existingQuantity = existing?.quantity || 0;

      if (existingQuantity + quantity > product.stock) {
        notify("You have reached the available stock limit.");
        return prev;
      }

      if (existing) {
        return prev.map(item =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, {
        ...product,
        key,
        size,
        color,
        quantity
      }];
    });

    setSelectedProduct(null);
    notify("Product successfully added to your cart!");
  }

  function updateCart(key, amount) {
    setCart(prev =>
      prev.map(item =>
        item.key === key
          ? { ...item, quantity: Math.min(item.stock, item.quantity + amount) }
          : item
      ).filter(item => item.quantity > 0)
    );
  }

  function toggleWishlist(product) {
    const exists = wishlist.some(item => item.id === product.id);

    setWishlist(prev =>
      exists
        ? prev.filter(item => item.id !== product.id)
        : [...prev, product]
    );

    notify(exists ? "Removed from wishlist." : "Added to wishlist!");
  }

  function checkout(event) {
    event.preventDefault();

    if (!cart.length) return;

    const order = {
      id: "SB-" + Date.now().toString().slice(-8),
      customer,
      phone,
      address,
      payment,
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      })),
      total: cartTotal,
      status: "Pending",
      date: new Date().toLocaleString()
    };

    setOrders(prev => [order, ...prev]);

    setProducts(prev =>
      prev.map(product => {
        const quantity = cart
          .filter(item => item.id === product.id)
          .reduce((sum, item) => sum + item.quantity, 0);

        return quantity
          ? { ...product, stock: Math.max(0, product.stock - quantity) }
          : product;
      })
    );

    setCart([]);
    setCustomer("");
    setPhone("");
    setAddress("");
    setPayment("Cash on Delivery");
    setPage("shop");

    notify("Your order has been placed successfully!");
  }

  function updateStatus(id, status) {
    setOrders(prev =>
      prev.map(order => order.id === id ? { ...order, status } : order)
    );
    notify("Order status updated.");
  }

  function addProduct() {
    const name = prompt("Product name:");
    if (!name?.trim()) return;

    const price = Number(prompt("Price in RWF:"));
    if (!Number.isFinite(price) || price <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    const stock = Number(prompt("Available quantity:", "10"));
    if (!Number.isInteger(stock) || stock < 0) {
      alert("Please enter a valid stock quantity.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      price,
      stock,
      category: "Women",
      type: "Clothing",
      sizes: ["S", "M", "L"],
      colors: ["Black", "White"],
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700"
    };

    setProducts(prev => [newProduct, ...prev]);
    notify("New product added!");
  }

  function deleteProduct(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setProducts(prev => prev.filter(product => product.id !== id));
    notify("Product removed.");
  }

  return (
    <div className="app">

      <header className="topbar">
        <button className="logo" onClick={() => setPage("shop")}>
          SAMBI<span>-SHOP</span>
        </button>

        <nav>
          <button onClick={() => setPage("shop")}>Home</button>
          <button onClick={() => { setPage("shop"); setCategory("All"); }}>Shop</button>
          <button onClick={() => setPage("wishlist")}>♡ Wishlist ({wishlist.length})</button>
          <button onClick={() => setPage("cart")}>Cart ({cartCount})</button>
          <button className="admin-nav" onClick={() => setPage("admin")}>Admin</button>
        </nav>
      </header>

      {notice && (
        <div className="notice">
          {notice}
          <button onClick={() => setNotice("")}>×</button>
        </div>
      )}

      {page === "shop" && (
        <>
          <section className="hero">
            <div className="hero-content">
              <span className="eyebrow">WELCOME TO SAMBI-SHOP</span>
              <h1>Style that speaks.<br /><span> Fashion delivered</span></h1>
              <p>Discover beautiful clothing and shoes for men, women and your little ones.</p>
              <button className="primary" onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>
                Explore Collection
              </button>
              <div className="hero-note"> Quality fashion · Convenient online shopping</div>
            </div>
            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000" alt="Fashion collection" />
            </div>
          </section>

          <main className="content" id="products">
            <div className="section-heading">
              <div>
                <span className="eyebrow">SHOP YOUR STYLE</span>
                <h2>Explore our collection</h2>
                <p>Find something you love at SAMBI-SHOP.</p>
              </div>
              <span>{filteredProducts.length} products available</span>
            </div>

            <div className="category-buttons">
              {["All", "Men", "Women", "Babies"].map(item => (
                <button
                  key={item}
                  className={category === item ? "active" : ""}
                  onClick={() => { setCategory(item); setShowAll(false); }}
                >
                  {item === "All" ? "All Collections" : item}
                </button>
              ))}
            </div>

            <div className="toolbar">
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setShowAll(false); }}
                placeholder="Search products..."
              />
              <select value={type} onChange={e => { setType(e.target.value); setShowAll(false); }}>
                <option value="All">All types</option>
                <option value="Clothing">Clothing</option>
                <option value="Shoes">Shoes</option>
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            <div className="collection-info">
              <span>Showing {displayedProducts.length} of {filteredProducts.length} products</span>
              <span>♡ {wishlist.length} favourites</span>
            </div>

            <div className="product-grid">
              {displayedProducts.map((product, index) => (
                <article className="product-card" key={product.id} style={{ animationDelay: `${index * 60}ms` }}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <span className={`product-tag ${product.stock <= 0 ? "sold" : ""}`}>
                      {product.stock > 0 ? "AVAILABLE" : "SOLD OUT"}
                    </span>
                    <button
                      className={`wishlist-btn ${wishlist.some(item => item.id === product.id) ? "liked" : ""}`}
                      onClick={() => toggleWishlist(product)}
                    >
                      {wishlist.some(item => item.id === product.id) ? "♥" : "♡"}
                    </button>
                    <button className="quick-view" onClick={() => openProduct(product)}>
                      Quick View
                    </button>
                  </div>

                  <div className="product-info">
                    <small>{product.category} / {product.type}</small>
                    <h3>{product.name}</h3>
                    <strong>{money(product.price)}</strong>
                    <button className="availability-link" onClick={() => openProduct(product)}>
                      {product.stock > 0 ? `✓ ${product.stock} Available · View options` : "View product"}
                    </button>
                    <div className="product-actions">
                      <button className="add-button" disabled={product.stock <= 0} onClick={() => openProduct(product)}>
                        ORDER PRODUCT
                      </button>
                      <button className="details-button" onClick={() => openProduct(product)}>Details</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="empty">No products found. Try another search.</div>
            )}

            {filteredProducts.length > 8 && (
              <div className="see-more-container">
                <button className="see-more-btn" onClick={() => setShowAll(!showAll)}>
                  {showAll ? "Show Less ↑" : "Explore More Products →"}
                </button>
              </div>
            )}
          </main>
        </>
      )}

      {page === "wishlist" && (
        <main className="content">
          <span className="eyebrow">YOUR FAVOURITES</span>
          <h2>My Wishlist ♡</h2>
          {wishlist.length === 0 ? (
            <div className="empty">You have not saved any products yet. Explore our collection!</div>
          ) : (
            <div className="product-grid">
              {wishlist.map(product => (
                <article className="product-card" key={product.id}>
                  <div className="product-image"><img src={product.image} alt={product.name} /></div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <strong>{money(product.price)}</strong>
                    <button className="add-button" onClick={() => openProduct(products.find(p => p.id === product.id) || product)}>View Product</button>
                    <button className="remove" onClick={() => toggleWishlist(product)}>Remove</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      )}

      {page === "cart" && (
        <main className="content">
          <span className="eyebrow">YOUR SHOPPING BAG</span>
          <h2>Shopping Cart</h2>

          {cart.length === 0 ? (
            <div className="empty">
              Your shopping cart is empty.
              <br /><br />
              <button className="primary" onClick={() => setPage("shop")}>Continue Shopping</button>
            </div>
          ) : (
            <div className="cart-layout">
              <div>
                {cart.map(item => (
                  <div className="cart-item" key={item.key}>
                    <img src={item.image} alt={item.name} />
                    <div className="cart-description">
                      <h3>{item.name}</h3>
                      <strong>{money(item.price)}</strong>
                      <p>Size: {item.size || "Standard"} · Colour: {item.color || "Standard"}</p>
                      <div className="quantity">
                        <button onClick={() => updateCart(item.key, -1)}>−</button>
                        {item.quantity}
                        <button onClick={() => updateCart(item.key, 1)}>+</button>
                      </div>
                    </div>
                    <button className="remove" onClick={() => setCart(prev => prev.filter(p => p.key !== item.key))}>Remove</button>
                  </div>
                ))}
              </div>

              <form className="checkout" onSubmit={checkout}>
                <h3>Delivery information</h3>
                <label>Full name
                  <input required value={customer} onChange={e => setCustomer(e.target.value)} placeholder="Your full name" />
                </label>
                <label>Phone number
                  <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+250..." />
                </label>
                <label>Delivery address
                  <textarea required value={address} onChange={e => setAddress(e.target.value)} placeholder="District, sector, street..." />
                </label>
                <label>Payment method
                  <select value={payment} onChange={e => setPayment(e.target.value)}>
                    <option>Cash on Delivery</option>
                    <option>MTN Mobile Money</option>
                    <option>Airtel Money</option>
                  </select>
                </label>
                <div className="total-line">
                  <span>Total amount</span>
                  <strong>{money(cartTotal)}</strong>
                </div>
                <button className="primary full-button" type="submit">Confirm Order →</button>
                <small>Demo checkout: no real payment is processed.</small>
              </form>
            </div>
          )}
        </main>
      )}

      {page === "admin" && (
        <main className="content">
          <span className="eyebrow">BUSINESS MANAGEMENT SYSTEM</span>
          <h2>Admin Dashboard</h2>
          <p>Manage your online store, inventory, customers and deliveries.</p>

          <div className="stats">
            <div><span>▣</span><small>Total Products</small><h2>{products.length}</h2></div>
            <div><span>🛍</span><small>Total Orders</small><h2>{orders.length}</h2></div>
            <div><span>↗</span><small>Delivered Revenue</small><h2>{money(deliveredRevenue)}</h2></div>
            <div><span>◷</span><small>Pending Orders</small><h2>{orders.filter(o => o.status === "Pending").length}</h2></div>
          </div>

          <div className="admin-heading">
            <h3>Inventory Management</h3>
            <button className="primary" onClick={addProduct}>+ Add Product</button>
          </div>

          <div className="table-wrap">
            <table>
              <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Action</th></tr></thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category} / {product.type}</td>
                    <td>{money(product.price)}</td>
                    <td>{product.stock}</td>
                    <td><button className="remove" onClick={() => deleteProduct(product.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="admin-heading"><h3>Orders and Delivery Management</h3></div>

          {orders.length === 0 ? <div className="empty">No orders received yet.</div> : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Order ID</th><th>Customer</th><th>Contact</th><th>Amount</th><th>Payment</th><th>Status</th></tr></thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}<br /><small>{order.date}</small></td>
                      <td>{order.customer}<br /><small>{order.address}</small></td>
                      <td>{order.phone}</td>
                      <td>{money(order.total)}</td>
                      <td>{order.payment}</td>
                      <td>
                        <select value={order.status} onChange={e => updateStatus(order.id, e.target.value)}>
                          <option>Pending</option>
                          <option>Processing</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      )}

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>×</button>

            <div className="modal-image">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>

            <div className="modal-details">
              <span className="eyebrow">SAMBI-SHOP COLLECTION</span>
              <h2>{selectedProduct.name}</h2>
              <p className="modal-category">{selectedProduct.category} / {selectedProduct.type}</p>
              <h2 className="modal-price">{money(selectedProduct.price)}</h2>
              <p>Discover quality fashion selected for your everyday style. Choose your preferred options below.</p>

              <div className="availability-box">
                <strong>{selectedProduct.stock > 0 ? `✓ ${selectedProduct.stock} items available` : "Currently out of stock"}</strong>
              </div>

              <label className="option-label">Select size</label>
              <div className="option-buttons">
                {(selectedProduct.sizes || ["Standard"]).map(size => (
                  <button key={size} className={selectedSize === size ? "option-active" : ""} onClick={() => setSelectedSize(size)}>{size}</button>
                ))}
              </div>

              <label className="option-label">Select colour</label>
              <div className="option-buttons">
                {(selectedProduct.colors || ["Standard"]).map(color => (
                  <button key={color} className={selectedColor === color ? "option-active" : ""} onClick={() => setSelectedColor(color)}>{color}</button>
                ))}
              </div>

              <label className="option-label">Quantity</label>
              <div className="quantity">
                <button onClick={() => setSelectedQuantity(q => Math.max(1, q - 1))}>−</button>
                {selectedQuantity}
                <button onClick={() => setSelectedQuantity(q => Math.min(selectedProduct.stock, q + 1))}>+</button>
              </div>

              <button
                className="primary full-button"
                disabled={selectedProduct.stock <= 0}
                onClick={() => addToCart(selectedProduct, selectedSize, selectedColor, selectedQuantity)}
              >
                Add to Shopping Cart
              </button>

              <button className="details-button full-button" onClick={() => toggleWishlist(selectedProduct)}>
                ♡ Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      )}

      <footer>
        <h2>SAMBI-SHOP</h2>
        <p>Fashion Delivered to Your Doorstep.</p>
        <p>Men · Women · Babies · Clothing · Shoes</p>
        <p>© 2026 SAMBI-SHOP. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
