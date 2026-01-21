"use client";

import styled, { keyframes } from "styled-components";

export const LoadMoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 345px;
  gap: 1rem;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #393939;
  border-radius: 8px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $width: number }>`
  height: 100%;
  background-color: #FF8310;
  transition: width 0.5s ease-out;
  border-radius: 8px;
  width: ${(props) => props.$width}%;
`;

export const LoadMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 66px;
  background-color: #191A20;
  color: #FFFFFF;
  font-size: 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  border: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2a2b36;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const CompletionText = styled.p`
  color: #CCCCCC;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-right: 0.5rem;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
