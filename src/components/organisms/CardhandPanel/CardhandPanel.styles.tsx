import { css, keyframes } from "@emotion/react";
import { palette } from "../../../theme/palette";

export const CardhandPanelContainer = css`
  width: 100%;
  height: 300px;
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 0.5rem;
  position: relative;
`;

export const cardhandPanelInner = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  flex-wrap: nowrap;
  max-width: 100%;
  width: 100%;
  overflow: visible;
  padding: 1rem 150px;
  box-sizing: border-box;
`;

export const nextTurnButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${palette.blue(500)};
  border: 1px solid ${palette.blue(530)};
  color: ${palette.primary(100)};
  box-shadow: 0 0 8px 0px ${palette.blue(480, 0.2)}, inset 0 0 14px 7px ${palette.blue(520, 1)};
  border-radius: 80px;
  padding: 0 1.5rem;
  padding-top: 3px;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out, padding 0.2s ease-in-out;
  font-family: "Baloo Bhaina 2", cursive;
  font-size: 1.0rem;    
  font-weight: 600;
  text-shadow: 0 1px 0px ${palette.blue(600)};
  height: 100%;
  margin: 0 -10px;
  z-index: 5;

  &:hover {
    background-color: ${palette.blue(520)};
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

export const dashboardContainer = css`
  position: absolute;
  top: -40px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  pointer-events: none;

  > * {
    pointer-events: all;
  }
`;

export const moneyButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 24px;
  min-width: 24px;
  padding: 0 8px 0 9px;
  border-radius: 80px;
  box-sizing: border-box;
  gap: 0.4rem;
  font-family: "Baloo Bhaina 2", cursive;
  color: #d27f33;
  font-weight: 600;
  font-size: 1.4rem;
  border-radius: 20px 0 0 20px;
  padding-right: 26px;

  span {
    padding-top: 5px;
  }
  svg {
    margin-right: -3px;
    margin-left: -2px;
  }
`

export const populationButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 24px;
  min-width: 24px;
  padding: 0 8px;
  border-radius: 80px;
  box-sizing: border-box;
  gap: 0.4rem;
  font-family: "Baloo Bhaina 2", cursive;
  color: #8b3438;
  border-radius: 20px;
  font-weight: 600;
  font-size: 1.4rem;
  border-radius: 0 20px 20px 0;
  padding-left: 26px;

  span {
    padding-top: 5px;
  }
`

const expand = keyframes`
  from {
    width: 0;
  }
  to {
    width: 150px;
  }
`

const collapse = keyframes`
  from {
    width: 150px;
    transform: translateY(0);
    opacity: 1;
    margin: 0 7px;
  }
  50% {
    width: 150px;
    transform: translateY(-100px);
    opacity: 0;
    margin: 0 7px;
  }
  to {
    width: 0;
    transform: translateY(-100px);
    opacity: 0;
    margin: 0 0;
  }
`

export const cardContainer = (index: number, shouldCollapse: boolean) => css`
  width: 150px;
  flex-shrink: 1;
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0 7px;
  ${
    shouldCollapse ? 
    css`animation: ${collapse} 0.3s ease-in-out both;` : 
    css`animation: ${expand} 0.15s ease-in-out both;` 
  }
  transition: transform 0.2s ease-in-out;

  > div {
    z-index: ${index};
    position: absolute;
  }
`

export const openDeckButton = css`
  position: absolute;
  top: -36px;
  left: 10px;
  color: ${palette.blue(700)};
  height: 36px;
  width: 36px;
  cursor: pointer;
  z-index: 100;
  transition: transform 0.1s ease-in-out, color 0.1s ease-in-out;
  will-change: transform, color;

  &:hover {
    transform: scale(1.1);
    color: ${palette.blue(800)};
  }

  svg {
    width: 100%;
    height: 100%;
  }
`