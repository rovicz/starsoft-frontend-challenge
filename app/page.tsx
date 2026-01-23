"use client";

import { useState } from "react";

import { Footer } from "@/components/Footer";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { LoadMoreSection } from "@/components/LoadMore";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addToCart } from "@/lib/redux/features/cart/cartSlice";

import {
  PageContainer,
  MainContent,
  GridContainer,
  LoadMoreWrapper,
} from "./style";

const TOTAL_ITEMS = 32;
const ITEMS_PER_PAGE = 4;

const GENERATE_MOCK_ITEMS = (count: number) =>
  Array.from({ length: count }).map((_, i) => ({
    id: i,
    title: `Voucher NFT #${i + 1}`,
    subtitle: "Passe de acesso exclusivo para membros Starsoft.",
    imageSrc: "/bag.svg", // Using bag.svg as placeholder for now so it shows up in cart
    price: Number((Math.random() * 2 + 0.5).toFixed(2)),
  }));

export default function Home() {
  const [items, setItems] = useState(() => GENERATE_MOCK_ITEMS(8));
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleLoadMore = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setItems((prev) => {
      const nextCount = Math.min(prev.length + ITEMS_PER_PAGE, TOTAL_ITEMS);
      // In a real app we would append new items, but here GENERATE_MOCK_ITEMS generates from 0 to count
      // So we just regenerate the whole list with new count to simulate "load more" extending the list
      return GENERATE_MOCK_ITEMS(nextCount);
    });
    setIsLoading(false);
  };

  const handleAddToCart = (item: typeof items[0]) => {
    dispatch(addToCart({
      id: item.id,
      name: item.title,
      subtitle: item.subtitle,
      price: item.price,
      image: item.imageSrc || "/bag.svg",
    }));
  };

  return (
    <PageContainer>
      <Header />

      <MainContent>
        <GridContainer>
          {items.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              imageSrc={item.imageSrc}
              onBuy={() => handleAddToCart(item)}
            />
          ))}
        </GridContainer>

        <LoadMoreWrapper>
          <LoadMoreSection
            currentCount={items.length}
            totalCount={TOTAL_ITEMS}
            isLoading={isLoading}
            onLoadMore={handleLoadMore}
          />
        </LoadMoreWrapper>
      </MainContent>

      <Footer />
    </PageContainer>
  );
}