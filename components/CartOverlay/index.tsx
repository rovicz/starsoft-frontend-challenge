"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import * as S from "./style";
import { CartItem } from "../CartItem";
import { CartFooter } from "../CartFooter";
import Image from "next/image";
import { useScrollLock } from "@/lib/useScrollLock";

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MockCartItem {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  quantity: number;
}

const INITIAL_MOCK_ITEMS: MockCartItem[] = [
  {
    id: 1,
    name: "Voucher NFT #01",
    subtitle: "Passe de acesso exclusivo para membros Starsoft.",
    price: 1.5,
    image: "/bag.svg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Voucher NFT #02",
    subtitle: "Acesso antecipado a drops e eventos.",
    price: 2.25,
    image: "/bag.svg",
    quantity: 2,
  },
];

export const CartOverlay = ({ isOpen, onClose }: CartOverlayProps) => {
  const [items, setItems] = useState<MockCartItem[]>(INITIAL_MOCK_ITEMS);

  useScrollLock(isOpen);

  const handleIncrement = (id: number | string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecrement = (id: number | string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const handleRemove = (id: number | string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <S.Backdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <S.OverlayContainer
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <S.Header>
              <S.BackButton onClick={onClose} aria-label="Close cart">
                <Image
                  src="/arrow-left.svg"
                  alt="Close cart"
                  width={33}
                  height={33}
                />
              </S.BackButton>
              <S.Title>Mochila de Compras</S.Title>
            </S.Header>

            <S.Content>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  title={item.name}
                  subtitle={item.subtitle}
                  image={item.image}
                  price={item.price}
                  quantity={item.quantity}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onRemove={handleRemove}
                />
              ))}

              {items.length === 0 && (
                <div
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    marginTop: "100px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <ShoppingBag size={48} color="#303034" />
                  <p>Sua mochila está vazia</p>
                </div>
              )}

              {items.length > 0 && <CartFooter total={total} />}
            </S.Content>
          </S.OverlayContainer>
        </>
      )}
    </AnimatePresence>
  );
};
