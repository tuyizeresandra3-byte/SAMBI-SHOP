
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setStatus("loading");
      setError("");

      try {
        const data = await getProducts(controller.signal);
        setProducts(data);
        setStatus("success");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setStatus("error");
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, []);

  return { products, status, error };
}
