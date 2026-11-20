
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setStatus("loading");
      setError("");

      try {
        const data = await getProduct(id, controller.signal);
        setProduct(data);
        setStatus("success");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setStatus("error");
        }
      }
    }

    load();
    return () => controller.abort();
  }, [id]);

  if (status === "loading") {
    return <main className="section"><p role="status">Loading product...</p></main>;
  }

  if (status === "error") {
    return <main className="section"><p role="alert">{error}</p><Link to="/products">Back to products</Link></main>;
  }

  return (
    <main className="section">
      <Link to="/products">← Back to products</Link>

      <div className="details-layout">
        <img src={product.image} alt={product.title} />

        <div>
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <h2 className="price">${product.price.toFixed(2)}</h2>
          <p>{product.description}</p>
          <p>Rating: {product.rating?.rate ?? "Not rated"} / 5</p>

          <button
            className="primary-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
