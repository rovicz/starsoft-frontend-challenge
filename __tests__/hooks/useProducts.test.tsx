import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProducts } from "../../hooks/useProducts";
import * as api from "../../services/api";

// Mock the API
jest.mock("../../services/api");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useProducts Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch initial products successfully", async () => {
    const mockData = {
      products: [{ id: 1, name: "Product 1", price: 10, image: "img1" }],
      count: 2,
    };

    (api.getProducts as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useProducts({}), {
      wrapper: createWrapper(),
    });

    // Initial state
    expect(result.current.isLoading).toBe(true);

    // Wait for success
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.pages[0]).toEqual(mockData);
    expect(api.getProducts).toHaveBeenCalledWith({ page: 1 });
  });

  it("should handle hasNextPage correctly when more items exist", async () => {
    const page1 = {
      products: [{ id: 1, name: "P1", price: 10, image: "img1" }],
      count: 2, // Total is 2, we have 1 -> should have next page
    };

    (api.getProducts as jest.Mock).mockResolvedValue(page1);

    const { result } = renderHook(() => useProducts({}), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.hasNextPage).toBe(true);
  });

  it("should handle hasNextPage correctly when no more items exist", async () => {
    const page1 = {
      products: [
        { id: 1, name: "P1", price: 10, image: "img1" },
        { id: 2, name: "P2", price: 10, image: "img2" },
      ],
      count: 2, // Total is 2, we have 2 -> should NOT have next page
    };

    (api.getProducts as jest.Mock).mockResolvedValue(page1);

    const { result } = renderHook(() => useProducts({}), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.hasNextPage).toBe(false);
  });

  it("should fetch next page when fetchNextPage is called", async () => {
    const page1 = {
      products: [{ id: 1, name: "P1", price: 10, image: "img1" }],
      count: 2,
    };
    const page2 = {
      products: [{ id: 2, name: "P2", price: 10, image: "img2" }],
      count: 2,
    };

    (api.getProducts as jest.Mock)
      .mockResolvedValueOnce(page1)
      .mockResolvedValueOnce(page2);

    const { result } = renderHook(() => useProducts({}), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.pages).toHaveLength(1);

    // Trigger next page
    await result.current.fetchNextPage();

    await waitFor(() => expect(result.current.data?.pages).toHaveLength(2));
    
    expect(result.current.data?.pages[1]).toEqual(page2);
    expect(api.getProducts).toHaveBeenCalledTimes(2);
    expect(api.getProducts).toHaveBeenLastCalledWith({ page: 2 });
  });
});
