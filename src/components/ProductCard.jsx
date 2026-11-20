
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`}>
        <div className="product-image">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
          />
        </div>

        <h3>{product.title}</h3>
      </Link>

      <p className="price">${product.price.toFixed(2)}</p>

      <button
        className="primary-btn"
        onClick={() => addToCart(product)}
        aria-label={`Add ${product.title} to cart`}
      >
        Add to Cart
      </button>
    </article>
  );
}
