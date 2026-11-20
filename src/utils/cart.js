
export function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const existing = state.find(
        (item) => item.id === action.product.id
      );

      if (existing) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...state, { ...action.product, qty: 1 }];
    }

    case "remove":
      return state.filter((item) => item.id !== action.id);

    case "increase":
      return state.map((item) =>
        item.id === action.id
          ? { ...item, qty: item.qty + 1 }
          : item
      );

    case "decrease":
      return state
        .map((item) =>
          item.id === action.id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0);

    case "clear":
      return [];

    default:
      return state;
  }
}

export function calculateTotal(items) {
  return items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
}
