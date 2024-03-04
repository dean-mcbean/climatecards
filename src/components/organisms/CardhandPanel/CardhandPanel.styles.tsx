import { css } from "@emotion/react";
import { palette } from "../../../theme/palette";

export const CardhandPanelContainer = css`
  width: 100%;
  height: 250px;
  padding: 12px;
  box-sizing: border-box;
  background-color: ${palette.primary()};
  border-top: 2px solid ${palette.primary(300)};
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 0.5rem;
  position: relative;
`;

export const cardhandPanelInner = css`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 100%;
  width: 100%;
  overflow-x: auto;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 8px;
  background: ${palette.gradient.etherealPrimary()};
  border: 1px solid ${palette.primary(400)};
  box-shadow: inset 0 8px 30px -8px ${palette.primary(700, 0.4)}, 0 0 8px 0 ${palette.primary(600)};
`;

export const nextTurnButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.2;
  width: 4rem;
  margin-top: -2px;
  position: absolute;
  top: -28px;
  height: 40px;
  background-color: ${palette.primary(540)};
  color: ${palette.primary(100)};
  border: 2px solid ${palette.primary(300)};
  border-bottom: none;
  border-radius: 80px;
  padding: 0 1.5rem;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out, padding 0.2s ease-in-out;

  &:hover {
    background-color: ${palette.primary(600)};
    padding: 0 2rem;
  }
`;