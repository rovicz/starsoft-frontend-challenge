"use client";

import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #232323;
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding-bottom: 30px;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 768px) {
    margin-top: 189px;
    padding-bottom: 189px;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  @media (min-width: 1024px) {
    padding-left: 5rem;
    padding-right: 5rem;
  }

  @media (min-width: 1280px) {
    padding-left: 8.531rem;
    padding-right: 8.531rem;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.563rem;
  justify-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1536px) {
    grid-template-columns: repeat(4, 345px);
  }
`;

export const LoadMoreWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  width: 100%;

  @media (min-width: 768px) {
    margin-top: 189px;
  }
`;
