import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addToCart } from "@/lib/redux/features/cart/cartSlice";
import { Header } from "@/components/Header";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

jest.mock("@/components/CartOverlay", () => ({
  CartOverlay: ({ isOpen }: any) =>
    isOpen ? <div data-testid="cart-overlay">Overlay Open</div> : null,
}));

const renderWithRedux = (
  component: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({ reducer: { cart: cartReducer }, preloadedState }),
  }: any = {},
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render logo and cart icon", () => {
    renderWithRedux(<Header />);
    expect(screen.getByAltText("Starsoft")).toBeInTheDocument();
    expect(screen.getByAltText("Carrinho")).toBeInTheDocument();
  });

  it("should display correct item count", async () => {
    const { store } = renderWithRedux(<Header />);

    expect(screen.getByText("0")).toBeInTheDocument();

    act(() => {
      store.dispatch(
        addToCart({ id: 1, name: "Item", price: 10, image: "img" }),
      );
    });

    expect(await screen.findByText("1")).toBeInTheDocument();

    act(() => {
      store.dispatch(
        addToCart({ id: 1, name: "Item", price: 10, image: "img" }),
      );
    });

    expect(await screen.findByText("2")).toBeInTheDocument();
  });

  it("should toggle cart overlay on click", async () => {
    const { store } = renderWithRedux(<Header />);

    expect(screen.queryByTestId("cart-overlay")).not.toBeInTheDocument();

    const cartButton = screen.getByLabelText(/open cart/i);
    fireEvent.click(cartButton);

    expect(store.getState().cart.isOpen).toBe(true);

    expect(await screen.findByTestId("cart-overlay")).toBeInTheDocument();
  });
});
