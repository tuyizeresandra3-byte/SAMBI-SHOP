
import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

export default function Home() {
  const { products, status, error } = useProducts();

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">WELCOME TO SAMBI-SHOP</p>
          <h1>Discover products you'll love.</h1>
          <p>
            Shop quality products at affordable prices.
            Find your next favourite today.
          </p>
          <Link to="/products" className="primary-btn">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OUR COLLECTION</p>
            <h2>Featured Products</h2>
          </div>
          <Link to="/products">View all →</Link>
        </div>

        {status === "loading" && <Loading />}

        {status === "error" && (
          <p className="error-message" role="alert">{error}</p>
        )}

        {status === "success" && products.length === 0 && (
          <p>No products available.</p>
        )}

        <div className="product-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
