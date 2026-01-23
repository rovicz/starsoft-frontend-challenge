"use client";

import Image from "next/image";
import Link from "next/link";
import { HeaderContainer, ContentWrapper, CartWrapper, CartCount } from "./style";
import { CartOverlay } from "../CartOverlay";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { toggleCart, setCartOpen } from "@/lib/redux/features/cart/cartSlice";

export function Header() {
  const dispatch = useAppDispatch();
  // Get cart items to calculate total quantity
  const { items, isOpen } = useAppSelector((state) => state.cart);
  
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

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
          <CartWrapper 
            onClick={() => dispatch(toggleCart())} 
            style={{ cursor: "pointer" }}
            aria-label={`Open cart, ${totalItems} items`}
          >
            <Image
              src="/bag.svg"
              alt="Carrinho"
              width={24}
              height={24}
            />
            <CartCount>{totalItems}</CartCount>
          </CartWrapper>
        </ContentWrapper>
      </HeaderContainer>

      {/* CartOverlay now controlled by Redux state, but props passed here for compatibility if Overlay hasn't been updated yet to use Redux internally for open state, 
          HOWEVER, it's better if Overlay reads isOpen from Redux too. 
          For this step, we pass Redux state to props as interim or final pattern depending on Overlay implementation. 
      */}
      <CartOverlay 
        isOpen={isOpen} 
        onClose={() => dispatch(setCartOpen(false))} 
      />
    </>
  );
}
