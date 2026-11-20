
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="section empty-state">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="primary-btn">
        Go Home
      </Link>
    </main>
  );
}
