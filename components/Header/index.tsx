import Image from "next/image";
import Link from "next/link";
import { HeaderContainer, ContentWrapper, CartWrapper, CartCount } from "./style";

export function Header() {
  return (
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
        <CartWrapper>
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
  );
}
