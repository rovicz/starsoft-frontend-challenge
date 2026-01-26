import cartReducer, {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  toggleCart,
} from "@/lib/redux/features/cart/cartSlice";

describe("Cart Reducer", () => {
  const initialState = {
    items: [],
    isOpen: false,
  };

  it("should handle initial state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual({
      items: [],
      isOpen: false,
    });
  });

  it("should handle addToCart (new item)", () => {
    const newItem = {
      id: 1,
      name: "Test Item",
      price: 100,
      image: "test.jpg",
      subtitle: "Test Subtitle",
    };

    const actual = cartReducer(initialState, addToCart(newItem));

    expect(actual.items).toHaveLength(1);
    expect(actual.items[0]).toEqual({ ...newItem, quantity: 1 });
    expect(actual.isOpen).toBe(true);
  });

  it("should handle addToCart (existing item)", () => {
    const existingState = {
      items: [
        {
          id: 1,
          name: "Test Item",
          price: 100,
          image: "test.jpg",
          subtitle: "Test Subtitle",
          quantity: 1,
        },
      ],
      isOpen: false,
    };

    const actual = cartReducer(
      existingState,
      addToCart({
        id: 1,
        name: "Test Item",
        price: 100,
        image: "test.jpg",
        subtitle: "Test Subtitle",
      }),
    );

    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].quantity).toBe(2);
  });

  it("should handle incrementQuantity", () => {
    const startState = {
      items: [{ id: 1, name: "Item", price: 10, image: "img", quantity: 1 }],
      isOpen: false,
    };

    const actual = cartReducer(startState, incrementQuantity(1));
    expect(actual.items[0].quantity).toBe(2);
  });

  it("should handle decrementQuantity", () => {
    const startState = {
      items: [{ id: 1, name: "Item", price: 10, image: "img", quantity: 2 }],
      isOpen: false,
    };

    const actual = cartReducer(startState, decrementQuantity(1));
    expect(actual.items[0].quantity).toBe(1);
  });

  it("should remove item via decrementQuantity when quantity is 1", () => {
    const startState = {
      items: [{ id: 1, name: "Item", price: 10, image: "img", quantity: 1 }],
      isOpen: false,
    };

    const actual = cartReducer(startState, decrementQuantity(1));
    expect(actual.items).toHaveLength(0);
  });

  // Adding the missing test for non-existent item to cover the implicit "else" of find()
  it("should do nothing if decrementing non-existent item", () => {
     const startState = {
      items: [{ id: 1, name: "Item", price: 10, image: "img", quantity: 1 }],
      isOpen: false,
    };
    const actual = cartReducer(startState, decrementQuantity(999));
    expect(actual.items).toEqual(startState.items);
  });

  it("should ignore decrementQuantity if item does not exist", () => {
    const startState = {
      items: [{ id: 1, name: "Item", price: 10, image: "img", quantity: 2 }],
      isOpen: false,
    };

    const actual = cartReducer(startState, decrementQuantity(999));
    expect(actual.items[0].quantity).toBe(2);
  });

  it("should increment quantity if item already exists in cart (addToCart)", () => {
    const startState = {
      items: [{ id: 1, name: "Item", price: 10, image: "img", quantity: 1 }],
      isOpen: false,
    };

    const actual = cartReducer(
        startState,
        addToCart({ id: 1, name: "Item", price: 10, image: "img" })
    );

    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].quantity).toBe(2);
  });

  it("should handle removeFromCart", () => {
    const startState = {
      items: [
        { id: 1, name: "Item 1", price: 10, image: "img", quantity: 1 },
        { id: 2, name: "Item 2", price: 20, image: "img", quantity: 1 },
      ],
      isOpen: false,
    };

    const actual = cartReducer(startState, removeFromCart(1));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].id).toBe(2);
  });

  it("should handle clearCart", () => {
    const startState = {
      items: [{ id: 1, name: "Item 1", price: 10, image: "img", quantity: 1 }],
      isOpen: true,
    };

    const actual = cartReducer(startState, clearCart());
    expect(actual.items).toHaveLength(0);
  });

  it("should handle toggleCart", () => {
    const actual = cartReducer(initialState, toggleCart());
    expect(actual.isOpen).toBe(true);

    const actual2 = cartReducer(actual, toggleCart());
    expect(actual2.isOpen).toBe(false);
  });
});
