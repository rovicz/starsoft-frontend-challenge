"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Card } from "@/components/card";
import { Footer } from "@/components/footer";
import { LoadMoreSection } from "@/components/load-more";

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
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setItems((prev) => {
      const nextCount = Math.min(prev.length + ITEMS_PER_PAGE, TOTAL_ITEMS);
      return GENERATE_MOCK_ITEMS(nextCount);
    });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#232323]">
      <Header />

      <main className="flex-1 flex flex-col mt-[189px] px-[8.531rem] pb-[189px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-[repeat(4,345px)] gap-[1.563rem] justify-center">
          {items.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              imageSrc={item.imageSrc}
            />
          ))}
        </div>

        <div className="mt-[189px] flex justify-center w-full">
          <LoadMoreSection
            currentCount={items.length}
            totalCount={TOTAL_ITEMS}
            isLoading={isLoading}
            onLoadMore={handleLoadMore}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
