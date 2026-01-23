import styled from "styled-components";

export const Container = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 10px;
`;

export const TotalLabel = styled.span`
  font-family: var(--font-poppins), sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 26px;
  letter-spacing: -1px;
  text-transform: uppercase;
  color: #ffffff;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const TotalValueWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const EthIcon = styled.div`
  width: 29px;
  height: 29px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const TotalValue = styled.span`
  font-family: var(--font-poppins), sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 110%;
  color: #ffffff;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const CheckoutButton = styled.button<{ $isFinalized?: boolean }>`
  margin-top: 70px;
  width: 100%;
  max-width: 620px;
  align-self: center;
  height: 81px;
  background-color: ${(props) => (props.$isFinalized ? "#27AE60" : "#FF872C")};
  border: none;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;

  font-family: var(--font-lato), sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;

  &:hover {
    filter: brightness(0.9);
  }

  @media (max-width: 768px) {
    margin-top: 30px;
    height: 60px;
    font-size: 15px;
  }
`;
