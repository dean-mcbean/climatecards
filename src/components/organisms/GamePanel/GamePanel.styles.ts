import { css } from "@emotion/react";

export const gamePanel = (time: number) => css`
  background-color: ${time < 0.5  ? "var(--day-blue)" : "var(--night-blue)"};
  flex-grow: 1;
  transition: background-color 2s;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const topLeftUI = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  position: absolute;
  top: 0;
  left: 0;
`

export const topRightUI = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  position: absolute;
  top: 0;
  right: 0;
`