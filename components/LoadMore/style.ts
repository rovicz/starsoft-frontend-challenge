"use client";

import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

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

export const ProgressBarFill = styled(motion.div)`
  height: 100%;
  background-color: #ff8310;
  border-radius: 8px;
`;

export const LoadMoreButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 66px;
  background-color: #191a20;
  color: #ffffff;
  font-size: 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  border: none;
  /* Keep background transition for hover color change, let motion handle scale */
  transition: background-color 0.2s;

  &:hover {
    background-color: #2a2b36;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const CompletionText = styled(motion.p)`
  color: #cccccc;
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

export const SpinnerContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
