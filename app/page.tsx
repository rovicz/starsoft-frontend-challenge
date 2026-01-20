import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-8 py-8">
        {/* Conteúdo será inserido aqui */}
      </main>
    </div>
  );
}
