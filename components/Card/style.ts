"use client";

import styled from "styled-components";

export const CardContainer = styled.div`
  width: 100%;
  max-width: 345px;
  height: 555px;
  background-color: #191A20;
  border-radius: 8px;
  padding: 1.531rem;
  display: flex;
  flex-direction: column;
`;

export const ImageContainer = styled.div`
  flex: 1;
  width: 100%;
  background-color: #232323;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 1.25;
`;

export const Subtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #CCCCCC;
  margin-top: 10px;
`;

export const BuyButton = styled.button`
  width: 100%;
  height: 66px;
  background-color: #FF8310;
  border-radius: 8px;
  color: #FFFFFF;
  font-weight: 600;
  font-size: 1rem;
  margin-top: auto;
  transition: background-color 0.2s;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #e0720e;
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
