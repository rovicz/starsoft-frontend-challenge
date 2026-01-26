import { getProducts, api } from "../../services/api";
import axios from "axios";

// Mock axios immediately
jest.mock("axios", () => {
  const mockAxiosInstance = {
    get: jest.fn(),
  };
  return {
    create: jest.fn(() => mockAxiosInstance),
    // Add other axios methods if necessary, but 'create' is key here
    isAxiosError: jest.fn(),
  };
});

describe("API Service", () => {
  const mockedApi = api as jest.Mocked<typeof api>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    const validResponse = {
      count: 2,
      products: [
        {
          id: "1",
          name: "Product 1",
          description: "Desc 1",
          image: "img1.jpg",
          price: 100,
          createdAt: "2023-01-01",
        },
        {
          id: 2, // Check number to string transform
          name: "Product 2",
          description: "", // Check optional/empty handling
          image: "img2.jpg",
          price: "200.50", // Check string to number preprocess
        },
      ],
    };

    it("should fetch products with default parameters successfully", async () => {
      // Setup mock response
      (mockedApi.get as jest.Mock).mockResolvedValue({ data: validResponse });

      const result = await getProducts();

      // Verify Axios call
      expect(mockedApi.get).toHaveBeenCalledWith("/products", {
        params: {
          page: 1,
          rows: 8,
          sortBy: "id",
          orderBy: "DESC",
        },
      });

      // Verify Data transformation
      expect(result.count).toBe(2);
      expect(result.products[0].id).toBe("1");
      expect(result.products[1].id).toBe("2"); // Transformed from number
      expect(result.products[1].price).toBe(200.5); // Preprocessed from string
    });

    it("should fetch products with custom parameters", async () => {
      (mockedApi.get as jest.Mock).mockResolvedValue({ data: validResponse });

      const params = {
        page: 2,
        rows: 20,
        sortBy: "price",
        orderBy: "ASC" as const,
      };

      await getProducts(params);

      expect(mockedApi.get).toHaveBeenCalledWith("/products", {
        params: {
          page: 2,
          rows: 20,
          sortBy: "price",
          orderBy: "ASC",
        },
      });
    });

    it("should throw error when API returns invalid structure (Zod validation failure)", async () => {
      const invalidResponse = {
        wrongKey: "test",
      };

      (mockedApi.get as jest.Mock).mockResolvedValue({ data: invalidResponse });

      // Suppress console.error for this test as the code logs the zod error
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      await expect(getProducts()).rejects.toThrow(
        "Invalid API response structure",
      );

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it("should propagate axios errors", async () => {
      const networkError = new Error("Network Error");
      (mockedApi.get as jest.Mock).mockRejectedValue(networkError);

      await expect(getProducts()).rejects.toThrow("Network Error");
    });
  });
});
