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
  title: "Starsoft",
  description: "An NFT Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${lato.variable} antialiased`}>
        <StyledComponentsRegistry>
          <ReduxProvider>
            <QueryProvider>{children}</QueryProvider>
          </ReduxProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
