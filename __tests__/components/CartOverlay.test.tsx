import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addToCart } from "@/lib/redux/features/cart/cartSlice";
import { CartOverlay } from "@/components/CartOverlay";

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

describe("CartOverlay Component", () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not render when isOpen is false", () => {
    renderWithRedux(<CartOverlay isOpen={false} onClose={onCloseMock} />);
    expect(screen.queryByText("Mochila de Compras")).not.toBeInTheDocument();
  });

  it("should render empty state correctly", () => {
    renderWithRedux(<CartOverlay isOpen={true} onClose={onCloseMock} />);

    expect(screen.getByText("Mochila de Compras")).toBeInTheDocument();
    expect(screen.getByText("Sua mochila está vazia")).toBeInTheDocument();
    expect(screen.queryByText("FINALIZAR COMPRA")).not.toBeInTheDocument();
  });

  it("should render items when cart has products", async () => {
    const { store } = renderWithRedux(
      <CartOverlay isOpen={true} onClose={onCloseMock} />,
    );

    act(() => {
      store.dispatch(
        addToCart({
          id: 1,
          name: "Test Item 1",
          price: 1.5,
          image: "/test.jpg",
          subtitle: "Desc 1",
        }),
      );

      store.dispatch(
        addToCart({
          id: 2,
          name: "Test Item 2",
          price: 2.0,
          image: "/test.jpg",
          subtitle: "Desc 2",
        }),
      );
    });

    expect(await screen.findByText("Test Item 1")).toBeInTheDocument();
    expect(await screen.findByText("Test Item 2")).toBeInTheDocument();

    expect(screen.getByText("3.50 ETH")).toBeInTheDocument();

    expect(screen.getByText("FINALIZAR COMPRA")).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", () => {
    renderWithRedux(<CartOverlay isOpen={true} onClose={onCloseMock} />);

    const closeButton = screen.getByLabelText("Close cart");
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should remove item when trash button is clicked", async () => {
    const { store } = renderWithRedux(
      <CartOverlay isOpen={true} onClose={onCloseMock} />,
    );

    act(() => {
      store.dispatch(
        addToCart({
          id: 1,
          name: "Item To Remove",
          price: 1.0,
          image: "/test.jpg",
        }),
      );
    });

    expect(await screen.findByText("Item To Remove")).toBeInTheDocument();

    const removeButton = screen.getByLabelText("Remove item");
    fireEvent.click(removeButton);

    expect(
      await screen.findByText("Sua mochila está vazia"),
    ).toBeInTheDocument();
    expect(screen.queryByText("Item To Remove")).not.toBeInTheDocument();
    expect(store.getState().cart.items).toHaveLength(0);
  });

  it("should close the cart when clicking on the backdrop", () => {
    renderWithRedux(<CartOverlay isOpen={true} onClose={onCloseMock} />);

    const backdrop = screen.getByTestId("cart-backdrop");
    fireEvent.click(backdrop);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
