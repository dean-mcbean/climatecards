import { css, keyframes } from "@emotion/react";
import { GridItem, GridItemWarning } from "../../../../types/gameboard";
import { palette } from "../../../../theme/palette";
import { RoundedCorners, measureElevationOfGridItem } from "./utils";

export function gridItemColor(gridItem: GridItem) {
  return gridItem.isWater ? palette.blue(500) : gridItem.isRaised ? '#82A771' : '#99cb82';
}

export function gridItemShadowColor(gridItem: GridItem) {
  return gridItem.isWater ? palette.blue(600) : gridItem.isRaised ? '#4c825b' : '#6bb580';
}

export const GameboardTileContainer = (tileWidth: number) => css`
  width: ${tileWidth}px;
  height: ${tileWidth}px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const buildingRaise = keyframes`
  0% {
    height: 0;
    width: 0;
  }
  100% {
    height: 50%;
    width: 50%;
  }
`;
  
export const buildingContainer = css`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 4;
  box-sizing: border-box;

  > svg {
    width: 50%;
    height: 50%;
    position: absolute;
    bottom: 25%;
    color: ${palette.brown()};
    z-index: 4;
    animation: ${buildingRaise} 0.3s ease-in-out both;
  }
`;

export const gameboardTile = (gridItem: GridItem, roundedCorners: RoundedCorners) => css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: ${gridItemColor(gridItem)};
  z-index: 2;
  position: relative;
  top: ${measureElevationOfGridItem(gridItem) * -10}px;
  transition: top 0.5s ease-in-out, background-color 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
  ${roundedCorners.topLeft ? 'border-top-left-radius: 8px;' : ''}
  ${roundedCorners.topRight ? 'border-top-right-radius: 8px;' : ''}
  ${roundedCorners.bottomLeft ? 'border-bottom-left-radius: 8px;' : ''}
  ${roundedCorners.bottomRight ? 'border-bottom-right-radius: 8px;' : ''}
`;

export const gameboardTileDepth = (gridItem: GridItem, roundedCorners: RoundedCorners) => css`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  top: ${(measureElevationOfGridItem(gridItem) - 1) * -10}px;
  background-color: ${gridItemShadowColor(gridItem)};
  z-index: 1;
  transition: background-color 0.2s ease-in-out;
  ${roundedCorners.topLeft ? 'border-top-left-radius: 8px;' : ''}
  ${roundedCorners.topRight ? 'border-top-right-radius: 8px;' : ''}
  ${roundedCorners.bottomLeft ? 'border-bottom-left-radius: 8px;' : ''}
  ${roundedCorners.bottomRight ? 'border-bottom-right-radius: 8px;' : ''}
`;

export const buildingShadow = (gridItem: GridItem) => css`
  position: absolute;
  width: 55%;
  height: 28%;
  background-color: ${gridItemShadowColor(gridItem)};
  z-index: 3;
  border-radius: 50px;
  bottom: 15%;
  transition: background-color 0.2s ease-in-out;
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

export const inundationContainer = (inundation: number) => css`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  box-sizing: border-box;
  opacity: ${inundation > 0 ? 1 : 0};
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;

  svg {
    width: 50%;
    height: 50%;
    color: ${palette.blue(600)};
    z-index: 42;
  }
`;

export const inundationCountdown = (inundation: number) => css`
  border-radius: 16px;
  box-sizing: border-box;
  height: ${inundation > 0 ? 60 + 10 * inundation : 0}%;
  width: ${inundation > 0 ? 60 + 10 * inundation : 0}%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${palette.blue(700)};
  z-index: 430;
  padding: 0.5rem;
  background-color: ${palette.blue(500, 0.6)};
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 800;
  transition: height 0.2s ease-in-out, width 0.2s ease-in-out, border-radius 0.2s ease-in-out;
  box-shadow: inset 0 0 4px 4px ${palette.blue(600, 0.4)};
`;

export const inundationBuilding = (inundation: number) => css`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 42;
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
  padding-top: 10%;
  box-sizing: border-box;
`;

export const buildingHealthPip = (gridItem: GridItem, index: number) => css`
  width: 6px;
  height: 6px;
  background-color: ${gridItem.building && gridItem.building?.health > index ? palette.green(600) : palette.red(600)};
  border-radius: 50%;
  transition: background-color 0.2s ease-in-out;
`;

export const selectionContainer = (highlight: string) => {

  let highlightStyle = css``;
  switch (highlight) {
    case 'highlight':
      highlightStyle = css`
      `;
      break;
    case 'outline':
      highlightStyle = css`
      `;
      break;
    case 'dim':
      highlightStyle = css`
        background-color: ${palette.red(500, 0.4)};
        color: ${palette.red(500, 0.4)};
      `;
      break;
    case 'hidden':
      highlightStyle = css`
        opacity: 0;
        background-color: transparent;
      `;
      break;
  }

  
  return css`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
  opacity: 1;
  ${highlightStyle}
  box-sizing: border-box;
  pointer-events: none;
  transition: border 0.2s ease-in-out, background-color 0.2s ease-in-out, opacity 0.2s ease-in-out;

  svg {
    width: 30px;
    height: 30px;
  }
`;
}