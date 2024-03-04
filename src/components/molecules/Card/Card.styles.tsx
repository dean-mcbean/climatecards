import { css, keyframes } from "@emotion/react";
import { palette } from "../../../theme/palette";

const fadein = keyframes`
  from {
    opacity: 0;
    top: 14px;
  }
  to {
    opacity: 1;
    top: 0;
  }
`;

export const cardContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  border-radius: 14px;
  width: 160px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  box-shadow: 0 0 4px 0px ${palette.primary(800, 0.2)}, inset 0 0 14px 7px ${palette.orange(550, 0.4)};
  background-color: ${palette.orange()};
  border-bottom: 1px solid ${palette.orange(600)};
  position: relative;
  animation: ${fadein} 0.4s ease-in-out;

  h2 {
    margin: 0;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    padding: 2px 28px 2px 14px;
    min-height: 28px;
    box-sizing: border-box;
  }
  p {
    margin: 0;
  }

  &:hover {
    background-color: ${palette.orange(520)};
    box-shadow: 0 0 14px 0px ${palette.orange(800, 0.4)}, inset 0 0 14px 7px ${palette.orange(600, 0.4)};
  }
`;

export const cardContent = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 14px 14px 14px 14px;
  font-size: 0.8rem;
  color: ${palette.orange(1000)};
`;

export const cardHeader = css`
  display: flex;
  flex-direction: row;
  background-color: ${palette.orange(400)};
  width: 100%;
  border-radius: 14px 14px 0 0;
  color: ${palette.orange(750)};
  justify-content: space-between;
`

export const costBubble = (cost: number) => css`
  background-color: ${palette.orange(550)};
  color: ${palette.orange(0)};
  padding: 0 7px 0 8px;
  border-radius: 0 14px 0 14px;
  letter-spacing: 1px;
  min-width: 28px;
  font-size: 0.8rem;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  box-sizing: border-box;
  display: ${cost === 0 ? 'none' : 'flex'};
`;