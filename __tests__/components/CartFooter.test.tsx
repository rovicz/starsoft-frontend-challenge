import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { CartFooter } from "@/components/CartFooter";

describe("CartFooter Component", () => {
  it("should render correctly with total 0 ETH", () => {
    render(<CartFooter total={0} />);
    expect(screen.getByText("Total")).toBeInTheDocument();
    // Use a regex or exact string match depending on how it's rendered
    expect(screen.getByText("0.00 ETH")).toBeInTheDocument();
    expect(screen.getByText("FINALIZAR COMPRA")).toBeInTheDocument();
  });

  it("should render correctly with a positive total", () => {
    render(<CartFooter total={5.5} />);
    expect(screen.getByText("5.50 ETH")).toBeInTheDocument();
  });

  it("should handle checkout flow correctly", () => {
    jest.useFakeTimers();
    render(<CartFooter total={10} />);

    const button = screen.getByText("FINALIZAR COMPRA");

    // Click to checkout
    fireEvent.click(button);

    // Check loading state
    expect(screen.getByText("COMPRA FINALIZADA!")).toBeInTheDocument();
    expect(button).toBeDisabled();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Check reverted state
    expect(screen.getByText("FINALIZAR COMPRA")).toBeInTheDocument();
    expect(button).not.toBeDisabled();

    jest.useRealTimers();
  });
});
