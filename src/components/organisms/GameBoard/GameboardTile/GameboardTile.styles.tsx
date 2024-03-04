import { css } from "@emotion/react";
import { GridItem } from "../../../../types/gameboard";
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