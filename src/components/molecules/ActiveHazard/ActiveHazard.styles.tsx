import { css } from "@emotion/react";
import { palette } from "../../../theme/palette";

export const activeHazardContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 83px;
  padding: 0rem 2rem 0rem 2rem;
`;

export const activeHazardHeader = (isHazard: boolean) => css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  color: ${isHazard ? palette.blue(700) : palette.blue(500)};
  transition: color 0.2s ease-in-out, opacity 0.2s ease-in-out;
  font-size: 2.7rem;
  font-family: "Baloo Bhaina 2", cursive;
  font-weight: 500;

  svg {
    transform: scale(1.2) translateY(-8px);
  }
`;

export const activeHazardContent = (isHazard: boolean) => css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${palette.blue(700)};
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 300;
  margin-top: -20px;
  text-align: center;
  opacity: ${isHazard ? 0.8 : 0};
  height: ${isHazard ? "1rem" : "0"};
  transition: opacity 0.2s ease-in-out, height 0.2s ease-in-out;
`;