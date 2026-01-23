import styled from "styled-components";
import { motion } from "framer-motion";

export const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 998;
`;

export const OverlayContainer = styled(motion.aside)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 679px;
  background-color: #232323;
  box-shadow: -4px 0px 30px rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 165px;
  background-color: #232323;
  z-index: 2;

  @media (max-width: 768px) {
    height: 120px;
  }
`;

export const BackButton = styled.button`
  position: absolute;
  top: 63px;
  left: 70px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #373737;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  transition: 0.2s;
  z-index: 3;
  border: none;

  &:hover {
    background-color: #202024;
    border-color: #ffffff;
  }

  @media (max-width: 768px) {
    left: 20px;
    top: 30px;
    width: 50px;
    height: 50px;
  }
`;

export const Title = styled.h2`
  position: absolute;
  top: 63px;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 500;
  line-height: 110%;
  color: #ffffff;
  pointer-events: none;

  @media (max-width: 768px) {
    top: 30px;
    height: 50px;
    font-size: 20px;
  }
`;

export const Content = styled.div`
  flex: 1;
  margin-top: 165px;
  padding: 0 30px 30px 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #2b2b30;
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    margin-top: 120px;
    padding: 0 20px 20px 20px;
  }
`;
