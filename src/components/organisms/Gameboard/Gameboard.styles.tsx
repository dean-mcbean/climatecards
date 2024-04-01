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

export const gameboardContainerParent = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 0 0 2px 2px #FFF1;
`;