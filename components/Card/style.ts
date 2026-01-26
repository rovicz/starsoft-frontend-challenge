"use client";

import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const CardContainer = styled.div`
  width: 100%;
  max-width: 345px;
  height: 555px;
  background-color: #191a20;
  border-radius: 8px;
  padding: 1.531rem;
  display: flex;
  flex-direction: column;
`;

export const ImageContainer = styled.div`
  width: 296px !important;
  height: 258px !important;
  background-color: #22232c;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageSkeleton = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #22232c;
  background-image: linear-gradient(
    90deg,
    #22232c 0%,
    #32333e 50%,
    #22232c 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
  z-index: 1;
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  margin-top: 49px;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.25;
`;

export const Subtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #cccccc;
  margin-top: 10px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
`;

export const EthIcon = styled.div`
  width: 29px;
  height: 29px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const PriceValue = styled.span`
  font-family: var(--font-poppins), sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 110%;
  color: #ffffff;
`;

export const BuyButton = styled.button<{ $isAdded?: boolean }>`
  width: 100%;
  height: 66px;
  background-color: ${({ $isAdded }) => ($isAdded ? "#494949" : "#ff8310")};
  border-radius: 8px;
  color: #ffffff;
  font-weight: 600;
  font-style: SemiBold;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  margin-top: auto;
  transition: background-color 0.2s;
  cursor: ${({ $isAdded }) => ($isAdded ? "default" : "pointer")};
  border: none;
  text-transform: uppercase;

  &:hover {
    background-color: ${({ $isAdded }) => ($isAdded ? "#494949" : "#e0720e")};
  }
`;

export const PlaceholderIcon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #393939;
`;
