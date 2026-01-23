"use client";

import React, { useState } from "react";
import * as S from "./style";
import Image from "next/image";

interface CartFooterProps {
  total: number;
}

export const CartFooter = ({ total }: CartFooterProps) => {
  const [isFinalized, setIsFinalized] = useState(false);

  const handleCheckout = () => {
    setIsFinalized(true);
    // Here logic for actual checkout would go
    setTimeout(() => {
        setIsFinalized(false);
    }, 3000);
  };

  return (
    <S.Container>
      <S.TotalRow>
        <S.TotalLabel>Total</S.TotalLabel>
        <S.TotalValueWrapper>
          <S.EthIcon>
             <Image 
                src="/eth.png" 
                alt="ETH" 
                width={29} 
                height={29} 
             />
          </S.EthIcon>
          <S.TotalValue>{total.toFixed(2)} ETH</S.TotalValue>
        </S.TotalValueWrapper>
      </S.TotalRow>

      <S.CheckoutButton 
        onClick={handleCheckout} 
        $isFinalized={isFinalized}
        disabled={isFinalized}
      >
        {isFinalized ? "COMPRA FINALIZADA!" : "FINALIZAR COMPRA"}
      </S.CheckoutButton>
    </S.Container>
  );
};
