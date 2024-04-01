import { css, keyframes } from "@emotion/react";
import { palette } from "../../../theme/palette";

export const CardhandPanelContainer = css`
  width: 100%;
  height: 310px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 0.5rem;
  position: relative;
  background: linear-gradient(0deg, #0f5a71, #0f7899);
  box-shadow: inset 0 7px 2px -5px #92e2ff38, inset 0 -8px 15px 0px #00425f4a;
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
  padding: 1rem 1rem;
  box-sizing: border-box;
`;

export const dashboardButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #00445980;
  cursor: pointer;
  transition: color 0.1s ease-in-out, transform 0.1s ease-in-out;
  font-family: "Baloo Bhaina 2", cursive;
  font-size: 1.1rem;    
  font-weight: 500;
  text-shadow: 0 1px 0px ${palette.blue(600)};
  z-index: 5;
  gap: 8px;
  transform: scale(1);

  &:hover {
    color: #004459;
    transform: scale(1.1);
  }

  svg {
    width: 100px;
    height: 100px;
  }
`;

export const dashboardContainer = css`
  position: absolute;
  top: -40px;
  height: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  
  width: 100%;
  box-sizing: border-box;
  pointer-events: none;

  > * {
    pointer-events: all;
  }
`;

export const dashboardLine = css`
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #1e758f40;
`;

export const moneyButton = css`
  background: #ffb443;
  font-family: "Baloo Bhaina 2", cursive;
  color: #b15b00;
  border-radius: 30px;
  font-weight: 800;
  font-size: 2.5rem;
  height: 60px;
  box-sizing: border-box;
  display: flex;
  gap: 8px;
  box-shadow: inset -2px -4px 1px -2px #cd7c00, inset -24px -24px 16px -22px #cd7c0080;
  z-index: 900;
  align-items: center;
  padding: 0 24px 0 2px;
  
  svg {
    width: 56px;
    height: 56px;
  }

  > span {
    padding-top: 11px;

    

    > span {
      font-size: 1rem;
      padding-left: 4px;
    }
  }
`

export const populationButton = css`
  background: #76e77e;
  font-family: "Baloo Bhaina 2", cursive;
  color: #268143;
  border-radius: 30px;
  font-weight: 800;
  font-size: 2.5rem;
  height: 60px;
  box-sizing: border-box;
  display: flex;
  gap: 8px;
  box-shadow: inset -2px -4px 1px -2px #1d6d488a, inset -24px -24px 16px -22px #1d6d4840;
  z-index: 900;
  align-items: center;
  padding: 0 24px 0 2px;

  svg {
    width: 56px;
    height: 56px;
  }

  > span {
    padding-top: 11px;
    flex-grow: 1;
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

export const cardContainer = (index: number, shouldCollapse: boolean, canAfford: boolean) => css`
  width: 150px;
  flex-shrink: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 7px;
  ${
    shouldCollapse ? 
    css`animation: ${collapse} 0.3s ease-in-out both;
        pointer-events: none;` : 
    css`animation: ${expand} 0.15s ease-in-out both;` 
  }
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out, filter 0.2s ease-in-out;
  opacity: ${canAfford ? 1 : 0.3};
  filter: ${canAfford ? 'none' : 'grayscale(100%)'};
  pointer-events: ${canAfford ? 'all' : 'none'};

  > div {
    z-index: ${index};
    position: absolute;
  }
`

export const cardhandPanelSideInner = css`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: nowrap;
  overflow: visible;
  padding: 1rem 0;
  box-sizing: border-box;
  flex-grow: 0;
  width: 310px;
  gap: 3rem;
  padding-top: 3rem;
  height: 100%;
`;