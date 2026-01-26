import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "@/components/Card";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe("ProductCard Component", () => {
  const mockProps = {
    title: "Test NFT",
    subtitle: "Test Description",
    imageSrc: "/test.jpg",
    price: 1.5,
    onBuy: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render product information correctly", () => {
    render(<Card {...mockProps} />);

    expect(screen.getByText("Test NFT")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("1.50 ETH")).toBeInTheDocument();

    expect(screen.getByRole("img", { name: "Test NFT" })).toHaveAttribute(
      "src",
      "/test.jpg",
    );
  });

  it("should call onBuy when the buy button is clicked", () => {
    render(<Card {...mockProps} />);

    const button = screen.getByRole("button", { name: /comprar/i });
    fireEvent.click(button);

    expect(mockProps.onBuy).toHaveBeenCalledTimes(1);
  });

  it("should display 'Adicionado' state correctly", () => {
    render(<Card {...mockProps} isAdded={true} />);

    const button = screen.getByRole("button", {
      name: /adicionado ao carrinho/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveStyle({ backgroundColor: "#494949" });
  });

  it("should render placeholder when no image source is provided", () => {
    render(<Card {...mockProps} imageSrc={undefined} />);

    const mainImage = screen.queryByRole("img", { name: "Test NFT" });
    expect(mainImage).not.toBeInTheDocument();
  });

  it("should handle image loading state", () => {
    render(<Card {...mockProps} />);

    const img = screen.getByRole("img", { name: "Test NFT" });
    
    // Initial state: Opacity 0 (loading)
    expect(img).toHaveStyle({ opacity: "0" });

    // Simulate load event
    fireEvent.load(img);

    // Loaded state: Opacity 1
    expect(img).toHaveStyle({ opacity: "1" });
  });
});
