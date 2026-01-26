"use client";

import { Footer } from "@/components/Footer";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { LoadMoreSection } from "@/components/LoadMore"; // Correct import based on file content
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addToCart } from "@/lib/redux/features/cart/cartSlice";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/services/api";

import {
  PageContainer,
  MainContent,
  GridContainer,
  LoadMoreWrapper,
} from "./style";

export default function Home() {
  const itemsPerPage = 8;

  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useProducts({
      rows: itemsPerPage,
      sortBy: "id",
      orderBy: "DESC",
    });

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  // Flatten all pages to get a single list of products
  const products = data?.pages.flatMap((page) => page.products) || [];
  // Get total count from the first page (or any page, as it should be consistent)
  const totalItems = data?.pages[0]?.count || 0;

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        subtitle: product.description || "Descrição indisponível",
        price: product.price,
        image: product.image,
      }),
    );
  };

  return (
    <PageContainer>
      <Header />

      <MainContent>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
              color: "white",
              fontSize: "1.2rem",
            }}
          >
            Carregando produtos...
          </div>
        ) : isError ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
              color: "#ff6b6b",
              fontSize: "1.2rem",
            }}
          >
            Erro ao carregar produtos. Tente novamente mais tarde.
          </div>
        ) : (
          <>
            <GridContainer>
              {products.map((product) => (
                <Card
                  key={product.id}
                  title={product.name}
                  subtitle={product.description || "Descrição indisponível"}
                  imageSrc={product.image}
                  price={product.price}
                  onBuy={() => handleAddToCart(product)}
                  isAdded={cartItems.some(
                    (cartItem) => String(cartItem.id) === String(product.id),
                  )}
                />
              ))}
            </GridContainer>

            <LoadMoreWrapper>
              <LoadMoreSection
                currentCount={products.length}
                totalCount={totalItems}
                isLoading={isFetchingNextPage}
                onLoadMore={() => fetchNextPage()}
              />
            </LoadMoreWrapper>
          </>
        )}
      </MainContent>

      <Footer />
    </PageContainer>
  );
}
