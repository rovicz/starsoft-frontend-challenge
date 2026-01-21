"use client";

import styled from "styled-components";

export const HeaderContainer = styled.header`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 2.6875rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.21);
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CartWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.563rem;
`;

export const CartCount = styled.span`
  color: #FFFFFF;
  font-weight: 500;
`;
