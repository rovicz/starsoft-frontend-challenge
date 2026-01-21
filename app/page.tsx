"use client";

import { useState } from "react";

import { Footer } from "@/components/Footer";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { LoadMoreSection } from "@/components/LoadMore";

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
    imageSrc: "",
  }));

export default function Home() {
  const [items, setItems] = useState(() => GENERATE_MOCK_ITEMS(8));
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setItems((prev) => {
      const nextCount = Math.min(prev.length + ITEMS_PER_PAGE, TOTAL_ITEMS);
      return GENERATE_MOCK_ITEMS(nextCount);
    });
    setIsLoading(false);
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
