import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  background-color: #2b2b2b;
  border-radius: 8px;
  padding: 20px 30px;
  gap: 20px;
  margin-bottom: 24px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 15px;
    gap: 15px;
  }
`;

export const ImageWrapper = styled.div`
  width: 161px;
  height: 161px;
  background-color: #22232c;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 139px;
    max-height: 139px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const Subtitle = styled.p`
  font-size: 12px;
  line-height: 12px;
  font-weight: 300;
  letter-spacing: 0px;
  margin-top: 5px;
  margin-bottom: 1px;
  color: #e1e1e6;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;

  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;

export const EthIcon = styled.div`
  width: 29px;
  height: 29px;
  position: relative;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`;

export const PriceValue = styled.span`
  font-size: 20px;
  font-weight: 600;
  line-height: 110%;
  letter-spacing: 0%;
  color: #ffffff;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  gap: 10px;

  @media (max-width: 480px) {
    margin-top: 12px;
  }
`;

export const QuantitySelector = styled.div`
  width: 115px;
  height: 49px;
  border-radius: 8px;
  padding: 12px 8px;
  background-color: #232323;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    width: 90px;
    height: 40px;
    padding: 8px 4px;
    gap: 4px;
  }
`;

export const QuantityButton = styled.button`
  background: transparent;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  flex-shrink: 0;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    color: #ff872c;
  }
`;

export const QuantityValue = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
`;

export const RemoveButton = styled.button`
  width: 43px;
  height: 43px;
  background-color: #ff872c;
  border: none;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
  color: #ffffff;
  flex-shrink: 0;

  &:hover {
    filter: brightness(0.9);
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;
