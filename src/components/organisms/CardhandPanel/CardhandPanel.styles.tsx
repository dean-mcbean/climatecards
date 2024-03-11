import { css } from "@emotion/react";
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
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 100%;
  width: 100%;
  overflow-x: auto;
  padding: 1rem;
  box-sizing: border-box;
  overflow-y: hidden;
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