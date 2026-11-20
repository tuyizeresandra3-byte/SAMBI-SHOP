
const API_URL = "https://fakestoreapi.com";

export async function getProducts(signal) {
  const response = await fetch(`${API_URL}/products`, {
    signal
  });

  if (!response.ok) {
    throw new Error("Unable to load products. Please try again.");
  }

  return response.json();
}

export async function getProduct(id, signal) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    signal
  });

  if (!response.ok) {
    throw new Error("Product not found.");
  }

  return response.json();
}
