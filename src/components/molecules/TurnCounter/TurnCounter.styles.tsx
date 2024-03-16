import { css } from "@emotion/react";
import { palette } from "../../../theme/palette";
import Color from "colorjs.io";
import { HazardEvent } from "../../../types/events";


export const TurnStep = (turn:number, index:number, dayRange:number) => css`
  padding: 0;
  color: white;
  border-right: 2px solid var(--primary-color);
  visibility: ${turn <= 0 ? "hidden" : "visible"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 200;
  text-align: center;
  line-height: 1.2;
  margin-top: -3px;
  position: absolute;
  left: ${(index * 4)}rem;
  transition: left 0.4s ease-in-out, opacity 0.4s ease-in-out;
  opacity: ${index == 0 || Math.abs(index) == dayRange + 1 ? 0 : 1};
  gap: 8px;
  width: 0;
`;

export const turnContainer = css`
  display: flex;
  flex-direction: row;
  padding: 4px;
  border-radius: 5px;
`;

export const previousTurnContainer = css`
  display: flex;
  flex-direction: row;
  gap: 0;
  border-radius: 5px;
  background-color: var(--primary-color-light);
  border: 2px solid var(--primary-color);
  align-items: flex-start;
  z-index: 2;
  position: relative;
`;

export const upcomingTurnContainer = css`
  display: flex;
  flex-direction: row;
  gap: 0;
  border-radius: 5px;
  background-color: var(--primary-color-light);
  border: 2px solid var(--primary-color);
  align-items: flex-start;
  z-index: 2;
  position: relative;
`;

export const currentTurnContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 2rem 0.75rem 2rem;
  border-radius: 5px;
  background-color: ${palette.blue(500)};
  border: 2px solid ${palette.lightBlue(500)};
  font-family: "Baloo Bhaina 2", cursive;
  font-size: 1.6rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 2px 0px ${palette.blue(700)};
  box-shadow: 0 0 16px 8px ${palette.blue(480, 0.2)}, inset 0 0 14px 7px ${palette.blue(520, 1)};
  min-width: 5.1rem;
`;

export const subtitle = css`
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 0px ${palette.blue(600)};
  margin-top: -10px;
`;

export const eventStartPointer = (event: HazardEvent, turn: number) => {
  const myLocation = (turn - event.start_turn) / (event.end_turn - event.start_turn);
  //const distBetweenPointers = 1 / (event.end_turn - event.start_turn);
  const startColor = new Color(palette.blue(650));
  const endColor = new Color(palette.blue(540));
  const colorRange = startColor.range(endColor, { space: "lch" });
  const color = colorRange(myLocation).toString();

  const isStartOrEnd = (turn - event.start_turn) == 0 || (turn - event.end_turn) == 0;
  
  return css`
    color: ${color};
    padding: 0px;
    border-radius: 50px;
    font-size: 0.6rem;
    font-weight: 600;
    text-shadow: 0 1px 0px ${palette.blue(600)};
    z-index: 1;
    height: 36px;
    width: 36px;
    box-sizing: border-box;
    cursor: pointer;
    transition: transform 0.1s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    ${isStartOrEnd ? '': 'pointer-events: none;'}
    width: 4rem;

    svg {
      width: 100%;
      height: 100%;
      ${!isStartOrEnd ? 'transform: scale(0.7);' : ''}
    }

    &:hover {
      transform: scale(1.1);
      .event-context {
        opacity: 1;
      }
    }
  `;
}

export const turnNum = css`
  
`;


export const eventStartContext = css`
  font-size: 0.9rem;
  font-weight: 800;
  text-shadow: none;
  margin-top: -10px;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
  position: absolute;
  bottom: -54px;
  padding: 4px;
  border-radius: 5px;
  pointer-events: none;

  p {
    font-size: 0.7rem;
    font-weight: 600;
    text-shadow: none;
    margin-top: -1px;
    white-space: nowrap;
  }
`;