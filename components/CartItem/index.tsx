"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import * as S from "./style";

interface CartItemProps {
  id: number | string;
  image: string;
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
  onRemove: (id: number | string) => void;
  onIncrement: (id: number | string) => void;
  onDecrement: (id: number | string) => void;
}

export const CartItem = ({
  id,
  image,
  title,
  subtitle,
  price,
  quantity,
  onRemove,
  onIncrement,
  onDecrement,
}: CartItemProps) => {
  return (
    <S.Container>
      <S.ImageWrapper>
        <Image
          src={image}
          alt={title}
          width={139}
          height={139}
          style={{ borderRadius: "8px" }}
        />
      </S.ImageWrapper>

      <S.Content>
        <S.Title>{title}</S.Title>
        <S.Subtitle>{subtitle}</S.Subtitle>

        <S.PriceWrapper>
          <S.EthIcon>
            <Image src="/eth.png" alt="ETH" width={29} height={29} />
          </S.EthIcon>
          <S.PriceValue>{price.toFixed(2)} ETH</S.PriceValue>
        </S.PriceWrapper>

        <S.ActionsRow>
          <S.QuantitySelector>
            <S.QuantityButton
              onClick={() => onDecrement(id)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </S.QuantityButton>

            <S.QuantityValue>{quantity}</S.QuantityValue>

            <S.QuantityButton
              onClick={() => onIncrement(id)}
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </S.QuantityButton>
          </S.QuantitySelector>

          <S.RemoveButton onClick={() => onRemove(id)} aria-label="Remove item">
            <Image src="/delete.svg" alt="Remove item" width={25} height={25} />
          </S.RemoveButton>
        </S.ActionsRow>
      </S.Content>
    </S.Container>
  );
};
