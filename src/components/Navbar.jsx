
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { count } = useCart();

  return (
    <header className="navbar">
      <Link to="/" className="logo"> SAMBISHOP.</Link>

      <nav aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart" className="cart-link">
          Cart <span className="cart-count">{count}</span>
        </NavLink>
      </nav>
    </header>
  );
}
