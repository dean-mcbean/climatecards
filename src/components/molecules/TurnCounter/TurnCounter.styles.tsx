import { css } from "@emotion/react";
import { palette } from "../../../theme/palette";
import Color from "colorjs.io";
import { HazardEvent } from "../../../types/events";



export const turnContainer = css`
  display: flex;
  flex-direction: row;
  padding: 4px;
  border-radius: 5px;
`;


export const currentTurnContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem 2rem 0rem 2rem;
  border-radius: 5px;
  font-family: "Baloo Bhaina 2", cursive;
  font-size: 3rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 2px 0px ${palette.blue(700)};
  min-width: 5.1rem;
`;

export const subtitle = css`
  font-size: 2rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 0px ${palette.blue(600)};
  margin-top: -30px;
`;
