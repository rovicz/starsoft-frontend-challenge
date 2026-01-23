"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeaderContainer, ContentWrapper, CartWrapper, CartCount } from "./style";
import { CartOverlay } from "../CartOverlay";

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <HeaderContainer>
        <ContentWrapper>
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Starsoft"
              width={101}
              height={38}
              priority
            />
          </Link>
          <CartWrapper onClick={() => setIsCartOpen(true)} style={{ cursor: "pointer" }}>
            <Image
              src="/bag.svg"
              alt="Carrinho"
              width={24}
              height={24}
            />
            <CartCount>2</CartCount>
          </CartWrapper>
        </ContentWrapper>
      </HeaderContainer>

      <CartOverlay 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
}