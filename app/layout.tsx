import type { Metadata } from "next";
import { Poppins, Lato } from "next/font/google";
import { ReduxProvider } from "@/lib/redux/provider";
import QueryProvider from "@/lib/query-provider";
import StyledComponentsRegistry from "@/lib/registry";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: {
    template: "Starsoft NFT | %s",
    default: "Starsoft NFT Marketplace",
  },
  description:
    "Descubra, colecione e venda NFTs extraordinários no Starsoft NFT Marketplace.",
  keywords: [
    "NFT",
    "Marketplace",
    "Crypto",
    "Ethereum",
    "Starsoft",
    "Arte Digital",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://starsoft-nft.vercel.app/",
    siteName: "Starsoft NFT",
    title: "Starsoft NFT Marketplace",
    description: "Descubra, colecione e venda NFTs extraordinários.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Starsoft NFT Marketplace",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${lato.variable} antialiased`}
        suppressHydrationWarning
      >
        <StyledComponentsRegistry>
          <ReduxProvider>
            <QueryProvider>{children}</QueryProvider>
          </ReduxProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
