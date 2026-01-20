import { Header } from "@/components/header";
import { Card } from "@/components/card";
import { Footer } from "@/components/footer";

const MOCK_ITEMS = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  title: `Voucher NFT #${i + 1}`,
  subtitle: "Passe de acesso exclusivo para membros Starsoft.",
  imageSrc: "",
}));

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#232323]">
      <Header />

      <main className="flex-1 flex flex-col mt-[189px] px-[8.531rem] pb-[189px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-[repeat(4,345px)] gap-[1.563rem] justify-center">
          {MOCK_ITEMS.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              imageSrc={item.imageSrc}
            />
          ))}
        </div>

        <div className="mt-[189px] flex justify-center w-full">
          <button className="w-[403px] h-[86px] bg-secondary py-[30px] text-[#FFFFFF] text-[20px] rounded-[8px] hover:bg-[#FF8310] hover:text-white transition-colors font-semibold cursor-pointer">
            Carregar mais
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
