import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getProducts } from "@/services/api";
import HomeContent from "@/components/Home";

export default async function Home() {
  const queryClient = new QueryClient();

  const params = {
    rows: 8,
    sortBy: "id",
    orderBy: "DESC" as const,
  };

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["products", params],
    queryFn: ({ pageParam }) => getProducts({ ...params, page: pageParam as number }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeContent />
    </HydrationBoundary>
  );
}