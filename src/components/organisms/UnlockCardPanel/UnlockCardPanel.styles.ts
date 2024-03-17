import { css } from "@emotion/react";
import { palette } from "../../../theme/palette";

export const unlockCardPanel = (expanded: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 500;
  pointer-events: ${expanded ? 'all' : 'none'};
  opacity: ${expanded ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  will-change: z-index, opacity;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const unlockCardPanelContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: white;
  width: 60%;
  min-width: 300px;
`;

export const unlockableCardContainer = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;