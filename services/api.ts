import axios from "axios";
import { z } from "zod";

export const ProductSchema = z.object({
  id: z
    .string()
    .or(z.number())
    .transform((val) => String(val)),
  name: z.string(),
  description: z.string().optional().or(z.literal("")),
  image: z.string(),
  price: z.preprocess((val) => Number(val), z.number()),
  createdAt: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductsResponseSchema = z.object({
  count: z.number(),
  products: z.array(ProductSchema),
});

export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export interface GetProductsParams {
  page?: number;
  limit?: number;
  rows?: number;
  sortBy?: string;
  orderBy?: "ASC" | "DESC";
}

export const getProducts = async (params: GetProductsParams = {}) => {
  const { data } = await api.get("/products", {
    params: {
      page: params.page || 1,
      rows: params.rows || 8,
      sortBy: params.sortBy || "id",
      orderBy: params.orderBy || "DESC",
    },
  });

  const result = ProductsResponseSchema.safeParse(data);

  if (!result.success) {
    console.error("API Response Validation Error:", result.error);
    throw new Error("Invalid API response structure");
  }

  return result.data;
};