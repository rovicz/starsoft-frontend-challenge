import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoadMoreSection } from "@/components/LoadMore";

describe("LoadMore Component", () => {
  it("should render 'Carregar mais' when there are more items to load", () => {
    render(
      <LoadMoreSection
        currentCount={5}
        totalCount={10}
        isLoading={false}
        onLoadMore={jest.fn()}
      />
    );
    expect(screen.getByText("Carregar mais")).toBeInTheDocument();
    expect(screen.queryByText("Você já viu tudo")).not.toBeInTheDocument();
  });

  it("should render loading state when isLoading is true", () => {
    render(
      <LoadMoreSection
        currentCount={5}
        totalCount={10}
        isLoading={true}
        onLoadMore={jest.fn()}
      />
    );
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
    // Verify button is disabled
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should render 'Você já viu tudo' when all items are loaded", () => {
    render(
      <LoadMoreSection
        currentCount={10}
        totalCount={10}
        isLoading={false}
        onLoadMore={jest.fn()}
      />
    );
    expect(screen.getByText("Você já viu tudo")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should trigger onLoadMore when clicked", () => {
    const handleLoadMore = jest.fn();
    render(
      <LoadMoreSection
        currentCount={5}
        totalCount={10}
        isLoading={false}
        onLoadMore={handleLoadMore}
      />
    );

    const button = screen.getByText("Carregar mais");
    fireEvent.click(button);

    expect(handleLoadMore).toHaveBeenCalledTimes(1);
  });
});
