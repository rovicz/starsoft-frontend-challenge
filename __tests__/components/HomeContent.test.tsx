import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/lib/redux/features/cart/cartSlice";
import HomeContent from "@/components/Home/index";
import { useProducts } from "@/hooks/useProducts";

// Mock Child Components to simplify integration test
jest.mock("@/components/Footer", () => ({
  Footer: () => <footer data-testid="footer" />,
}));
jest.mock("@/components/Header", () => ({
  Header: () => <header data-testid="header" />,
}));
// We keep Card real or mock it? Real is fine, but for integration speed we can mock if complex. 
// Let's keep real Card to verify "Add to Cart" button interaction visually.
// Actually, Card uses next/image which is already mocked globally.

// Mock useProducts hook
jest.mock("@/hooks/useProducts");

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

describe("HomeContent Integration", () => {
  const mockProducts = [
    {
      id: 1,
      name: "Test Product 1",
      description: "Desc 1",
      price: 100,
      image: "/img1.jpg",
    },
    {
      id: 2,
      name: "Test Product 2",
      description: "Desc 2",
      price: 200,
      image: "/img2.jpg",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state", () => {
    (useProducts as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
    });

    renderWithRedux(<HomeContent />);
    expect(screen.getByText("Carregando produtos...")).toBeInTheDocument();
  });

  it("should render error state when API fails", () => {
    (useProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
    });

    renderWithRedux(<HomeContent />);
    expect(
      screen.getByText("Erro ao carregar produtos. Tente novamente mais tarde."),
    ).toBeInTheDocument();
  });

  it("should render products and load more button when success", () => {
    (useProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        pages: [{ products: mockProducts, count: 10 }],
      },
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
    });

    renderWithRedux(<HomeContent />);

    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();
    expect(screen.getByText("Carregar mais")).toBeInTheDocument();
  });

  it("should show loading state in Load More button when fetching next page", () => {
    (useProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        pages: [{ products: mockProducts, count: 10 }],
      },
      fetchNextPage: jest.fn(),
      isFetchingNextPage: true,
    });

    renderWithRedux(<HomeContent />);

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /carregando/i })).toBeDisabled();
  });

  it("should show 'You saw it all' message when all products are loaded", () => {
    (useProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        pages: [{ products: mockProducts, count: 2 }], // 2 items total, 2 items loaded
      },
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
    });

    renderWithRedux(<HomeContent />);

    expect(screen.getByText("Você já viu tudo")).toBeInTheDocument();
    expect(screen.queryByText("Carregar mais")).not.toBeInTheDocument();
  });

  it("should handle 'Add to Cart' interaction", () => {
    (useProducts as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        pages: [{ products: [mockProducts[0]], count: 10 }],
      },
    });

    const { store } = renderWithRedux(<HomeContent />);

    // Initial state: Cart empty
    expect(store.getState().cart.items).toHaveLength(0);

    // Find and Click Buy Button
    const buyButton = screen.getByRole("button", { name: "Comprar" });
    fireEvent.click(buyButton);

    // Assert Redux State Updated
    expect(store.getState().cart.items).toHaveLength(1);
    expect(store.getState().cart.items[0].id).toBe(1);
    expect(store.getState().cart.isOpen).toBe(true);

    // Assert UI Feedback (Button Text Changes)
    // Note: Since we are re-rendering with new Redux state, the button should update
    expect(screen.getByText("ADICIONADO AO CARRINHO")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ADICIONADO AO CARRINHO" })).toBeDisabled();
  });
});
