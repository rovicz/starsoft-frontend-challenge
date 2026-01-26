import { useInfiniteQuery } from '@tanstack/react-query';
import { getProducts, GetProductsParams, ProductsResponse } from '../services/api';

export const useProducts = (params: Omit<GetProductsParams, 'page'> = {}) => {
  return useInfiniteQuery<ProductsResponse, Error>({
    queryKey: ['products', params],
    queryFn: ({ pageParam }) => getProducts({ ...params, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loadedProducts = allPages.flatMap((page) => page.products).length;
      if (loadedProducts < lastPage.count) {
        return allPages.length + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
