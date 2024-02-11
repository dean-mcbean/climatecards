import { css } from "@emotion/react";

export const gamePanel = (time: number) => css`
  background-color: ${time < 0.5  ? "var(--day-blue)" : "var(--night-blue)"};
  flex-grow: 1;
  transition: background-color 2s;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const topUI = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem;
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
`