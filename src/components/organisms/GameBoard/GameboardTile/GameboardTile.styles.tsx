import { css, keyframes } from "@emotion/react";
import { GridItem, GridItemWarning } from "../../../../types/gameboard";
import { palette } from "../../../../theme/palette";

export function gridItemColor(gridItem: GridItem, shade: number = 500) {
  return gridItem.isWater ? palette.blue(shade) : gridItem.isRaised ? palette.green(shade * 1.1) : palette.green(shade);
}

export const GameboardTileContainer = (gridItem: GridItem) => css`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
  
export const buildingContainer = css`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  z-index: 4;

  svg {
    width: 50%;
    height: 50%;
    color: ${palette.brown()};
    z-index: 4;
  }
`;

export const gameboardTile = (gridItem: GridItem) => css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: ${gridItemColor(gridItem)};
  box-shadow: inset 0 0 1px 1px ${gridItemColor(gridItem, 530)}, inset -2px 2px 4px 0px ${gridItemColor(gridItem, 470)},  inset 2px -2px 4px 0px ${gridItemColor(gridItem, 520)};
  border-radius: 2px;
  z-index: 2;
  position: relative;
  top: ${gridItem.isRaised ? '-20px' : gridItem.isWater ? '0' : '-10px'};
`;

export const gameboardTileDepth = (gridItem: GridItem) => css`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: ${gridItemColor(gridItem, 580)};
  z-index: 1;
`;

export const buildingShadow = (gridItem: GridItem) => css`
  position: absolute;
  width: 50%;
  height: 12px;
  background-color: ${gridItemColor(gridItem, 550)};
  z-index: 3;
  border-radius: 50px;
  bottom: 20%;
`;

const waveMove = keyframes`
  0% {
    right: -10px;
    opacity: 0;
  }
  100% {
    right: 0;
    opacity: 1;
  }
`;

export const waveContainer = css`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  transform: scaleX(-1);
  animation: ${waveMove} 0.2s ease-in-out both;

  svg {
    width: 60%;
    height: 60%;
    color: ${palette.blue(600)};
    z-index: 40;
  }
`;

const warningFlash = keyframes`
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.2;
  }
`;

export const warningContainer = (warning: GridItemWarning) => css`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 8;
  animation: ${warningFlash} 1.5s ease-in-out both infinite;
  background-color: ${warning.type == 'flooding' ? palette.blue(500, 0.4) : palette.brown(500, 0.4)};
  border: 2px dashed ${warning.type == 'flooding' ? palette.blue(600) : palette.brown(600)};
  box-sizing: border-box;

  svg {
    width: 60%;
    height: 60%;
    color: ${warning.type == 'flooding' ? palette.blue(600) : palette.brown(600)};
    z-index: 42;
  }
`;

export const inundationContainer = css`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  border: 2px solid ${palette.blue(600, 0.2)};
  background-color: ${palette.blue(500, 0.7)};
  box-sizing: border-box;

  svg {
    width: 60%;
    height: 60%;
    color: ${palette.blue(600)};
    z-index: 42;
  }
`;

export const inundationCountdown = (inundation: number) => css`
  border-radius: 50px;
  box-sizing: border-box;
  height: 70%;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${palette.blue(700)};
  z-index: 430;
  padding: 0.5rem;
  background-color: ${palette.blue(600, 0.2)};
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 800;
`;

export const buildingHealth = (gridItem: GridItem) => css`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  z-index: 5;
  padding-top: 0.5rem;
`;

export const buildingHealthPip = (gridItem: GridItem, index: number) => css`
  width: 6px;
  height: 6px;
  background-color: ${gridItem.building && gridItem.building?.health > index ? palette.green(600) : palette.red(600)};
  border-radius: 50%;
`;