import { css } from "@emotion/react";
import { gridItemColor, gridItemShadowColor } from "./GameboardTile/GameboardTile.styles";
import { palette } from "../../../theme/palette";

export const gameboardContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const rowContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  position: relative;
`;

export const gameboardContainerOverlay = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  flex-grow: 1;
`;

export const gameBoardDepth = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  box-shadow: 0 16px 16px -12px #0004;
`;

export const depthItem = (gridItem: any, tileWidth: number) => css`
  width: ${tileWidth}px;
  height: ${tileWidth}px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: ${gridItemShadowColor(gridItem)};
  box-shadow: inset 0 -60px 45px -60px #0138;
`;

export const gameboardContainerParent = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 0 0 2px 2px #FFF1;
`;