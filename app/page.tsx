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

      {/* Main Content 
          Top spacing: 289px from top of page.
          Header is 100px. So margin-top is 189px relative to header.
          Padding X: Responsive (1rem mobile -> 8.531rem desktop).
      */}
      <main className="flex-1 flex flex-col mt-[30px] md:mt-[189px] px-4 md:px-10 lg:px-20 xl:px-[8.531rem] pb-[30px] md:pb-[189px]">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-[repeat(4,345px)] gap-[1.563rem] justify-items-center justify-center">
          {items.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              imageSrc={item.imageSrc}
            />
          ))}
        </div>

        {/* Load More Section - Spaced 189px from grid bottom (handled by parent padding-bottom or margin here) */}
        <div className="mt-[30px] md:mt-[189px] flex justify-center w-full">
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
