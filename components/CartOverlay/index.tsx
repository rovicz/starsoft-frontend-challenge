"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowLeft } from "lucide-react";

import * as S from "./style";
import { CartItem } from "../CartItem";
import { CartFooter } from "../CartFooter";
import { useScrollLock } from "@/lib/useScrollLock";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/lib/redux/features/cart/cartSlice";

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartOverlay = ({ isOpen, onClose }: CartOverlayProps) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);

  useScrollLock(isOpen);

  const handleIncrement = (id: number | string) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: number | string) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (id: number | string) => {
    dispatch(removeFromCart(id));
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
                <ArrowLeft size={24} />
              </S.BackButton>
              <S.Title>Mochila de Compras</S.Title>
            </S.Header>

            <S.Content>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  title={item.name}
                  subtitle={item.subtitle || ""}
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
